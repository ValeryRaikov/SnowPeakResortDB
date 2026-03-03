db = db.getSiblingDB("SnowPeakResortDB")

// CREATE
db.users.insertOne({
  name: "Test User",
  email: "test@mail.com",
  role: "tourist",
  skillLevel: "advanced",
  registeredAt: new Date(),
  active: true
})

// READ
db.users.find({ role: "tourist" })
db.users.find({ skillLevel: { $in: ["beginner", "intermediate"] } })
db.users.find({ name: { $regex: "Ivan" } })
db.skiPasses.find({ price: { $gte: 100, $lte: 150 } })

// UPDATE
db.users.updateOne(
  { name: "Test User" },
  { $set: { skillLevel: "expert" } }
)

db.users.updateMany(
  { role: "tourist" },
  { $inc: { lessonCredits: 1 } }
)

// DELETE
db.users.deleteOne({ name: "Test User" })