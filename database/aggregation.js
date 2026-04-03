db = db.getSiblingDB("SnowPeakResortDB")

// GROUP - number of users by role
db.users.aggregate([
{
  $group: {
    _id: "$role",
    totalUsers: { $sum: 1 }
  }
}
])

// GROUP - number of lifts by status
db.lifts.aggregate([
{
  $group: {
    _id: "$status",
    totalLifts: { $sum: 1 }
  }
}
])

// GROUP - average slope length by difficulty
db.slopes.aggregate([
{
  $group: {
    _id: "$difficulty",
    avgLength: { $avg: "$lengthKm" }
  }
}
])

// GROUP - total incidents by slope type
db.slopes.aggregate([
{
  $group: {
    _id: "$difficulty",
    incidentsCount: { $sum: { $size: { $ifNull: ["$incidents", []] } } } }
}
])

// GROUP - total revenue by ski pass type
db.skiPasses.aggregate([
{
  $group: {
    _id: "$type",
    totalRevenue: { $sum: "$price" },
    passesSold: { $sum: 1 }
  }
}
])

// GROUP - average price per ski pass type
db.skiPasses.aggregate([
{
  $group: {
    _id: "$type",
    avgPrice: { $avg: "$price" }
  }
}
])

// SORT - newest registered users
db.users.find().sort({ registeredAt: -1 })

// SORT lifts by capacity
db.lifts.find().sort({ capacityPerHr: -1, type: 1})

// SORT - slopes by length
db.slopes.find().sort({ lengthKm: 1 })

// SORT - most expensive ski passes
db.skiPasses.find().sort({ price: -1 }).limit(10)

// MATCH - find all tourists with skill level beginner and registered email
db.users.aggregate([
{
  $match: {  role: "tourist", skillLevel: "beginner", email: { $exists: true, $ne: "" } }
}
])

// MATCH + SORT - open slopes ordered by length
db.slopes.aggregate([
{
  $match: { status: "open" }
},
{
  $sort: { lengthKm: 1 }
}
])

// MATCH + SORT - active lifts ordered by capacity
db.lifts.aggregate([
{
  $match: { status: "active" }
},
{
  $sort: { capacityPerHr: -1 }
}
])

// MATCH + LIMIT - find 2 reservations longer than 1 hour
db.reservations.aggregate([
{
  $match: { durationHours: { $gt: 1 }, status: "confirmed" }
},
{
  $limit: 2
},
])

// LOOKUP - join ski passes with users to get tourist info for each pass
db.skiPasses.aggregate([
{ $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "touristInfo"
  }
},
{ $unwind: "$touristInfo" }
])

// LOOKUP (JOIN reservations + users)
db.reservations.aggregate([
{
  $lookup: {
    from: "users",
    localField: "touristId",
    foreignField: "_id",
    as: "touristInfo"
  }
},
{ $unwind: "$touristInfo" }
])

// LOOKUP instructors in reservations
db.reservations.aggregate([
{
  $lookup: {
    from: "users",
    localField: "instructorId",
    foreignField: "_id",
    as: "instructorInfo"
  }
},
{ $unwind: "$instructorInfo" }
])

// JOIN reservations with slopes
db.reservations.aggregate([
{
  $lookup: {
    from: "slopes",
    localField: "slopeId",
    foreignField: "_id",
    as: "slopeInfo"
  }
},
{
  $limit: 3
}
])

// MOST popular slope for lessons
db.reservations.aggregate([
{
  $group: {
    _id: "$slopeId",
    totalLessons: { $sum: 1 }
  }
},
{
  $sort: { totalLessons: -1 }
}
])

// LIMIT example - show first 5 users
db.users.find().limit(5)

print("Aggregation operations executed successfully")