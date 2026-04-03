load("utils.js")

db = db.getSiblingDB("SnowPeakResortDB")

// CREATE (look in init.js for all the insertions)
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
db.users.find({ role: "tourist" }) // all tourists
db.users.find({ role: "instructor" }, { _id: 0,name: 1, email: 1, skillLevel: 1 }) // only name, email and skill level of instructors
db.users.find({ role: "technician", active: true }, { registeredAt: 0 }) // active technicians without registration date
db.users.find({ skillLevel: { $in: ["beginner", "intermediate"] } }) // tourists with beginner or intermediate level
db.users.find({ name: { $regex: "Ivan", $options: "i" } }) // users with name containing Ivan
db.users.find({ role: "instructor", active: true }) // find active instructors
// OR query example
db.users.find({
  $or: [
    { role: "technician" },
    { skillLevel: "expert" }
  ]
})

db.lifts.find({ status: "inactive" }) // all inactive lifts
db.lifts.find({ capacityPerHr: { $gt: 1000 } }) // lifts with capacity greater than 1000
db.lifts.find({ name: { $regex: "Express", $options: "i" } }) // lifts with name containing Express
db.lifts.find({ maintenance: { $exists: true, $not: { $size: 0 } } }, { name: 1, maintenance: 1 }) // lifts with maintenance records

db.slopes.find({ difficulty: "advanced" }) // all advanced slopes
db.slopes.find({ lengthKm: { $gt: 2 } }) // slopes longer than 2 kilometers
db.slopes.find({ name: { $regex: "Glacier", $options: "i" } }) // slopes with name containing Glacier
db.slopes.find({ incidents: { $exists: true, $not: { $size: 0 } } }, { name: 1, incidents: 1 }) // slopes with incident records


db.skiPasses.find({ price: { $gte: 40, $lt: 50 } }) // ski passes in specific price range
db.skiPasses.find({ type: { $in: ["morning", "daily"] }, scans: { $in: ["Peak energy bar", "SnowPeak Gondola"] } }) // morning or daily ski passes that have been scanned at Peak energy bar or SnowPeak Gondola
db.skiPasses.find({ type: "seasonal", scans: { $size: 0 } }) // season ski passes that have not been scanned 

db.reservations.find({ date: { $gte: new Date("2025-12-01"), $lte: new Date("2026-04-31") } }) // reservations in December and April
db.reservations.find({ durationHours: { $gt: 1 } }) // reservations longer than 1 hour
db.reservations.find({ status: "confirmed" }) // reservations with confirmed status
db.reservations.find({ price: { $gt: 100 } }) // reservations with price greater than 100

db.maintenanceReports.find({ severity: "high" }) // high severity maintenance reports
db.maintenanceReports.find({ issueType: "mechanical", resolved: true }) // mechanical issues

// UPDATE
// update skill level
db.users.updateOne(
  { name: "Test User" },
  { $set: { skillLevel: "expert" } }
)

// update tourists skill level to intermediate
db.users.updateMany(
  { role: "tourist" },
  { $set: { skillLevel: "intermediate" } }
)

// update lift capacity
db.lifts.updateOne(
  { name: "Eagle Express" },
  { $set: { capacityPerHr: 2200 } }
)

// update lift status
db.lifts.updateOne(
  { name: "Glacier Lift" },
  { $set: { status: "active" } }
)

// clear maintenance records for all lifts
db.lifts.updateMany(
  { maintenance: { $exists: true } },
  { $set: { maintenance: [] } }
)

// update slope status and add incident
db.slopes.updateOne(
  { name : "Alpine Run" },
  { $set: { difficulty: "red" } },
  { status: "closed" },
  { $push: { incidents: "Small avalanche near mid-mountain" } }
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
      scans: { lift: "Valley Gondola" }
    }
  }
)

// change pending status to confirmed for all reservations
db.reservations.updateMany(
  { status: "pending" },
  { $set: { status: "confirmed" } }
)

// update reservation price
db.reservations.updateOne(
  { price: { $eq: 100 } },
  { $set: { price: 80 } }
)

// DELETE
db.users.deleteMany({ role: "tourist" }) // delete tourists
db.slopes.deleteOne({ name: "Alpine Run" }) // delete specific slope
db.skiPasses.deleteOne({ type: "night" }) // delete test ski pass
db.maintenanceReports.deleteMany({}) // delete all maintenance reports

print("CRUD operations executed successfully")