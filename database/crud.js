db = db.getSiblingDB("SnowPeakResortDB")

// CREATE (look in init.js for more)
db.users.insertOne({
  name: "Test User",
  email: "test@mail.com",
  password: hashPassword("Test@123"),
  role: "tourist",
  skillLevel: "advanced",
  registeredAt: new Date(),
  active: true
})

// READ
// all tourists
db.users.find({ role: "tourist" })

// tourists with beginner or intermediate level
db.users.find({ skillLevel: { $in: ["beginner", "intermediate"] } })

// users with name containing Ivan
db.users.find({ name: { $regex: "Ivan", $options: "i" } })

// ski passes in specific price range
db.skiPasses.find({ price: { $gte: 40, $lte: 150 } })

// find active instructors
db.users.find({
  role: "instructor",
  active: true
})

// users that have lessonCredits field
db.users.find({
  lessonCredits: { $exists: true }
})

// OR query example
db.users.find({
  $or: [
    { role: "technician" },
    { skillLevel: "expert" }
  ]
})

// UPDATE
// update skill level
db.users.updateOne(
  { name: "Test User" },
  { $set: { skillLevel: "expert" } }
)

// add scan record to ski pass
db.skiPasses.updateOne(
  { type: "daily" },
  {
    $push: {
      scans: {
        lift: "SnowPeak Gondola",
        time: new Date()
      }
    }
  }
)

// remove scan record example
db.skiPasses.updateOne(
  { type: "daily" },
  {
    $pull: {
      scans: { lift: "Old Lift" }
    }
  }
)

// update lift status
db.lifts.updateOne(
  { name: "Glacier Lift" },
  { $set: { status: "active" } }
)

// DELETE
// delete test ski pass
db.skiPasses.deleteOne({ type: "night" })

// delete test user
db.users.deleteOne({ name: "Test User" })

print("CRUD operations executed successfully")