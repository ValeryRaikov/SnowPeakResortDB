db = db.getSiblingDB("SnowPeakResortDB")

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

// GROUP - number of users by role
db.users.aggregate([
{
  $group: {
    _id: "$role",
    totalUsers: { $sum: 1 }
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

// SORT - most expensive ski passes
db.skiPasses.find().sort({ price: -1 })

// MATCH + SORT - active lifts ordered by capacity
db.lifts.aggregate([
{
  $match: { status: "active" }
},
{
  $sort: { capacityPerHr: -1 }
}
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
{ $unwind: "$slopeInfo" }
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