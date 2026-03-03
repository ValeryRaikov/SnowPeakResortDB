db = db.getSiblingDB("SnowPeakResortDB")

// GROUP
db.skiPasses.aggregate([
  { $group: { _id: "$type", totalRevenue: { $sum: "$price" } } }
])

// SORT
db.users.find().sort({ registeredAt: -1 })

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