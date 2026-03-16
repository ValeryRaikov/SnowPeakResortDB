db = db.getSiblingDB("SnowPeakResortDB")

print("Running analytics queries...")

// 1. Total revenue from ski passes
db.skiPasses.aggregate([
{
  $group: {
    _id: null,
    totalRevenue: { $sum: "$price" },
    totalPassesSold: { $sum: 1 }
  }
}
])

// 2. Revenue by ski pass type
db.skiPasses.aggregate([
{
  $group: {
    _id: "$type",
    totalRevenue: { $sum: "$price" },
    passesSold: { $sum: 1 }
  }
},
{
  $sort: { totalRevenue: -1 }
}
])

// 3. Average ski pass price by type
db.skiPasses.aggregate([
{
  $group: {
    _id: "$type",
    averagePrice: { $avg: "$price" }
  }
}
])

// 4. Most popular slopes for ski lessons
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

// 5. Instructor workload (how many lessons each instructor teaches)
db.reservations.aggregate([
{
  $group: {
    _id: "$instructorId",
    lessonsCount: { $sum: 1 }
  }
},
{
  $sort: { lessonsCount: -1 }
}
])

// 6. Join reservations with instructor information
db.reservations.aggregate([
{
  $lookup: {
    from: "users",
    localField: "instructorId",
    foreignField: "_id",
    as: "instructor"
  }
},
{ $unwind: "$instructor" },
{
  $group: {
    _id: "$instructor.name",
    lessonsCount: { $sum: 1 }
  }
},
{
  $sort: { lessonsCount: -1 }
}
])

// 7. Distribution of tourists by skill level
db.users.aggregate([
{
  $match: { role: "tourist" }
},
{
  $group: {
    _id: "$skillLevel",
    totalTourists: { $sum: 1 }
  }
},
{
  $sort: { totalTourists: -1 }
}
])

// 8. Active vs inactive users
db.users.aggregate([
{
  $group: {
    _id: "$active",
    totalUsers: { $sum: 1 }
  }
}
])

// 9. Lift capacity ranking
db.lifts.aggregate([
{
  $match: { status: "active" }
},
{
  $sort: { capacityPerHr: -1 }
}
])

// 10. Slopes grouped by difficulty
db.slopes.aggregate([
{
  $group: {
    _id: "$difficulty",
    totalSlopes: { $sum: 1 }
  }
},
{
  $sort: { totalSlopes: -1 }
}
])

print("Analytics queries executed successfully")