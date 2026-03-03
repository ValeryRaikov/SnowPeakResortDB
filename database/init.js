db.dropDatabase("SnowPeakResortDB") // clear existing data if any

// use SnowPeakResortDB

// This line is necessary for mongosh scripts to avoid issues with `use` command
// It allows the script to run without needing to switch databases manually
db = db.getSiblingDB("SnowPeakResortDB")

// USERS

// insert one user only
db.users.insertOne({
    name: "Valeri Raykov",
    email: "valeryraikov@gmail.com",
    role: "tourist",
    skillLevel: "advanced",
    registeredAt: new Date("2024-01-01"),
    active: true
})

db.users.insertOne({
    name: "Magdalena Philipova",
    email: "maggy.h.f@gmail.com",
    role: "tourist",
    skillLevel: "beginner",
    registeredAt: new Date("2023-02-15"),
    active: false
})

db.users.insertOne({
    name: "Angel Motovski",
    role: "instructor",
    skillLevel: "advanced",
    registeredAt: new Date("2020-12-25"),
    active: true
})

// insert many users
db.users.insertMany([
  {
    name: "Ivan Petrov",
    email: "ivanpetrov@mail.com",
    role: "tourist",
    skillLevel: "intermediate",
    registeredAt: new Date("2024-01-15"),
    active: true
  },
  {
    name: "Maria Ivanova",
    email: "maria_ivanova@gmail.com",
    role: "tourist",
    skillLevel: "beginner",
    registeredAt: new Date("2024-02-01"),
    active: true
  },
  {
    name: "Georgi Dimitrov",
    email: "georgi123@gmail.com",
    role: "instructor",
    skillLevel: "expert",
    registeredAt: new Date("2023-11-01"),
    active: true
  },
  {
    name: "Petar Nikolov",
    email: "petar_x_nikolov@mail.com",
    role: "technician",
    skillLevel: null,
    registeredAt: new Date("2023-10-20"),
    active: true
  },
  {
    name: "Ivaylo Stoyanov",
    email: "ivo_stoyanov@abv.bg",
    role: "instructor",
    skillLevel: "expert",
    registeredAt: new Date("2021-03-03"),
    active: true
  },
  {
    name: "Viktoria Vasileva",
    email: "viktoriavasileva@yahoo.com",
    role: "tourist",
    skillLevel: "intermediate",
    registeredAt: new Date(),
    active: false
  },
  {
    name: "Boris Leonidov",
    email: "boretoleonidov@mail.com",
    role: "technician",
    active: false
  },
  {
    name: "Mihail Kolev",
    email: "MishoKolev@abv.bg",
    role: "technician",
    skillLevel: null,
    active: true
  },
  {
    name: "Tsvetelina Petrova",
    email: "tsveti_p@mail.com",
    role: "tourist",
    skillLevel: "beginner",
    registeredAt: new Date(),
    active: false
  },
])

// insert multiple users using a loop
for (let i = 1; i <= 8; i++) {
  db.users.insertOne({
    name: "Tourist " + i,
    email: "tourist" + i + "@mail.com",
    role: "tourist",
    skillLevel: "beginner",
    registeredAt: new Date(),
    active: true
  })
}

// LIFTS
db.lifts.insertMany([
  {
    name: "SnowPeak Gondola",
    type: "gondola",
    capacityPerHr: 2800,
    status: "active",
    maintenance: []
  },
  {
    name: "Eagle Express",
    type: "chairlift",
    capacityPerHr: 1800,
    status: "active",
    maintenance: []
  }
])

// SLOPES
db.slopes.insertMany([
  {
    name: "Glacier Run",
    difficulty: "red",
    lengthKm: 4.2,
    status: "open",
    incidents: []
  },
  {
    name: "Beginner Valley",
    difficulty: "green",
    lengthKm: 2.1,
    status: "open",
    incidents: []
  },
  {
    name: "Black Storm",
    difficulty: "black",
    lengthKm: 3.8,
    status: "closed",
    incidents: []
  }
])

// SKIPASSES
let tourists = db.users.find({ role: "tourist" }).toArray()

tourists.forEach(user => {
  db.skiPasses.insertOne({
    userId: user._id,
    type: "daily",
    price: 120,
    validFrom: new Date("2025-01-10"),
    validTo: new Date("2025-01-10"),
    scans: []
  })
})

// RESERVATIONS
let instructor = db.users.findOne({ role: "instructor" })
let slope = db.slopes.findOne({ difficulty: "green" })

tourists.slice(0, 5).forEach(user => {
  db.reservations.insertOne({
    touristId: user._id,
    instructorId: instructor._id,
    slopeId: slope._id,
    lessonDate: new Date("2025-01-12"),
    durationHours: 2,
    price: 150,
    status: "confirmed"
  })
})

// MAINTENANCE REPORTS
let technician = db.users.findOne({ role: "technician" })
let lift = db.lifts.findOne()

db.maintenanceReports.insertMany([
  {
    liftId: lift._id,
    technicianId: technician._id,
    date: new Date("2025-01-05"),
    issueType: "mechanical",
    severity: "high",
    resolved: true,
    resolutionCost: 2500
  }
])

print("Database initialized successfully.")