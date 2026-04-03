load("utils.js")

// use SnowPeakResortDB

// This line is necessary for mongosh scripts to avoid issues with `use` command
// It allows the script to run without needing to switch databases manually
db = db.getSiblingDB("SnowPeakResortDB")

db.dropDatabase() // clear existing data if any

// SCHEAM VALIDATORS
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "role", "active"],
      properties: {
        name: {
          bsonType: "string",
          description: "User name must be a string"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\\..+$",
          description: "Must be a valid email"
        },
        password: {
          bsonType: "string",
          minLength: 64,
          maxLength: 64,
          description: "Password must be stored as SHA256 hash"
        },
        role: {
          enum: ["tourist", "instructor", "technician"],
          description: "Allowed roles"
        },
        skillLevel: {
          enum: ["beginner", "intermediate", "advanced", "expert", null]
        },
        registeredAt: {
          bsonType: "date"
        },
        active: {
          bsonType: "bool"
        }
      }
    }
  }
});

db.createCollection("lifts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "type", "status"],
      properties: {

        name: {
          bsonType: "string",
          description: "Lift name must be a string"
        },

        type: {
          enum: ["chairlift", "gondola", "ski tow"],
          description: "Lift type must be chairlift, gondola, or ski tow"
        },

        capacityPerHr: {
          bsonType: ["int", "double", "null"],
          minimum: 100,
          description: "Capacity must be a positive number"
        },

        status: {
          enum: ["active", "inactive", "maintenance"],
          description: "Lift must have a valid operational status"
        },

        maintenance: {
          bsonType: "array",
          items: {
            bsonType: "string"
          },
          description: "Maintenance history must be an array"
        }
      }
    }
  }
});

db.createCollection("slopes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "difficulty", "status"],
      properties: {

        name: {
          bsonType: "string",
          description: "Slope name must be a string"
        },

        difficulty: {
          enum: ["green", "blue", "red", "black"],
          description: "Difficulty must be green, blue, red or black"
        },

        lengthKm: {
          bsonType: ["double", "int", "null"],
          minimum: 0.1,
          description: "Slope length must be positive"
        },

        status: {
          enum: ["open", "closed"],
          description: "Slope status must be open or closed"
        },

        incidents: {
          bsonType: "array",
          items: {
            bsonType: "string"
          },
          description: "Incidents must be stored as an array of strings"
        }
      }
    }
  }
});

// USERS

// insert one user only
db.users.insertOne({
    name: "Valeri Raykov",
    email: "valeryraikov@gmail.com",
    password: hashPassword("Valeri@123"),
    role: "tourist",
    skillLevel: "advanced",
    registeredAt: new Date("2024-01-01"),
    active: true
});

db.users.insertOne({
    name: "Magdalena Philipova",
    email: "maggy.h.f@gmail.com",
    password: hashPassword("Meggie!Fil"),
    role: "tourist",
    skillLevel: "beginner",
    registeredAt: new Date("2023-02-15"),
    active: false
});

db.users.insertOne({
    name: "Angel Motovski",
    role: "instructor",
    skillLevel: "advanced",
    registeredAt: new Date("2020-12-25"),
    active: true
});

// insert many users
db.users.insertMany([
  {
    name: "Ivan Petrov",
    email: "ivanpetrov@mail.com",
    password: hashPassword("vankataP."),
    role: "tourist",
    skillLevel: "intermediate",
    registeredAt: new Date("2024-01-15"),
    active: true
  },
  {
    name: "Maria Ivanova",
    email: "maria_ivanova@gmail.com",
    password: hashPassword("MiMiI00#"),
    role: "tourist",
    skillLevel: "beginner",
    registeredAt: new Date("2024-02-01"),
    active: true
  },
  {
    name: "Georgi Dimitrov",
    email: "georgi123@gmail.com",
    password: hashPassword("GOGO_d_!123"),
    role: "instructor",
    skillLevel: "expert",
    registeredAt: new Date("2023-11-01"),
    active: true
  },
  {
    name: "Petar Nikolov",
    email: "petar_x_nikolov@mail.com",
    password: hashPassword("Pecata@NKLV"),
    role: "technician",
    skillLevel: null,
    registeredAt: new Date("2023-10-20"),
    active: true
  },
  {
    name: "Ivaylo Stoyanov",
    email: "ivo_stoyanov@abv.bg",
    password: hashPassword("IVCHO!stoyanov"),
    role: "instructor",
    skillLevel: "expert",
    registeredAt: new Date("2021-03-03"),
    active: true
  },
  {
    name: "Viktoria Vasileva",
    email: "viktoriavasileva@yahoo.com",
    password: hashPassword("Viki?VSLV"),
    role: "tourist",
    skillLevel: "intermediate",
    registeredAt: new Date(),
    active: false
  },
  {
    name: "Boris Leonidov",
    email: "boretoleonidov@mail.com",
    password: hashPassword("Bore?LNDV"),
    role: "technician",
    active: false
  },
  {
    name: "Mihail Kolev",
    email: "MishoKolev@abv.bg",
    password: hashPassword("Misho@K_123"),
    role: "technician",
    skillLevel: null,
    active: true
  },
  {
    name: "Tsvetelina Petrova",
    email: "tsveti_p@mail.com",
    password: hashPassword("Ceca.Petrova."),
    role: "tourist",
    skillLevel: "beginner",
    registeredAt: new Date(),
    active: false
  },
  {
    name: "Dimitar Stoyanov",
    email: "mitko_stoyanov@tu-sofia.bg",
    password: hashPassword("Mitko?Mitko"),
    role: "tourist",
    skillLevel: "advanced",
    active: true
  }
]);

// insert multiple users using a loop
for (let i = 1; i <= 8; i++) {
  db.users.insertOne({
    name: "Tourist " + i,
    role: "tourist",
    skillLevel: "beginner",
    registeredAt: new Date(),
    active: true
  })
}

// LIFTS

// insert one lift only
db.lifts.insertOne({
    name: "Alpine Express",
    type: "chairlift",
    capacityPerHr: 2000,
    status: "active",
    maintenance: []
});

db.lifts.insertOne({
    name: "Peak energy bar",
    type: "ski tow",
    capacityPerHr: 800,
    status: "active",
    maintenance: []
});

// insert many lifts
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
    maintenance: ["2025-01-15: Routine check - resolved on 2025-01-16, cost $500"]
  },
  {
    name: "Summit T-Bar",
    type: "ski tow",
    capacityPerHr: 600,
    status: "active",
    maintenance: ["2025-01-03: Mechanical issue - resolved on 2025-01-10, cost $1500"]
  },
  {
    name: "Glacier Lift",
    type: "chairlift",
    capacityPerHr: 2200,
    status: "inactive",
    maintenance: ["2025-01-20: Electrical issue - unresolved, estimated cost $3000"]
  },
  {
    name: "Valley Gondola",
    type: "gondola",
    status: "inactive"
  },
  {
    name: "Pine Tree T-Bar",
    type: "ski tow",
    capacityPerHr: 500,
    status: "active",
  }
]);

// SLOPES

// insert one slope only
db.slopes.insertOne({
    name: "Alpine Run",
    difficulty: "blue",
    lengthKm: 2.5,
    status: "open",
    incidents: []
});

db.slopes.insertOne({
    name: "Peak Trail",
    difficulty: "red",
    lengthKm: 3.5,
    status: "open",
    incidents: ["ski accident on 2025-01-10 - resolved, no injuries", "ski accident on 2025-01-15 - resolved, minor injuries"]
});

db.slopes.insertOne({
    name: "Summit Slope",
    difficulty: "black",
    lengthKm: 2,
    status: "closed",
    incidents: ["avalanche on 2025-01-12 - resolved, no injuries"]
});

// insert many slopes
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
    status: "open",
    incidents: []
  },
  {
    name: "Black Storm",
    difficulty: "black",
    lengthKm: 3.8,
    status: "closed"
  },
  {
    name: "Pine Tree Trail",
    difficulty: "blue",
    lengthKm: 2.2,
    status: "open",
    incidents: ["ski accident on 2025-01-18 - resolved, minor injuries"]
  },
  {
    name: "Eagle Peak",
    difficulty: "red",
    lengthKm: 1.5,
    status: "closed"
  }
]);

// SKI PASSES

// set ski passes to all tourists with different types and prices based on index
let tourists = db.users.find({ role: "tourist" }).toArray()

tourists.forEach((user, index) => {
  let cardType;
  let price = 60;
  let startDate = new Date();
  startDate.setHours(6, 30, 0, 0); // opens 8:30 (GMT+2)
  let endDate = new Date();
  endDate.setHours(15, 0, 0, 0); // closes 17:00 (GMT+2)

  if (index % 3 === 0) {
    cardType = "daily";
    scans = ["Pine Tree T-Bar", "Peak energy bar"];
  } 
  else if (index % 3 === 1) {
    cardType = "morning";
    price = 45;
    endDate.setHours(10, 30, 0, 0);
  } 
  else {
    cardType = "afternoon";
    price = 40;
    startDate.setHours(10, 30, 0, 0);
    endDate.setHours(15, 0, 0, 0);
    scans = ["Glacier Lift"];
  }

  if (index === 1) {
    cardType = "seasonal";
    price = 800;
    startDate = new Date("2025-12-15");
    endDate = new Date("2026-03-31");
    scans = ["Pine Tree T-Bar", "Eagle Express", "Valley Gondola"];
  }

  if (index === 9) {
    cardType = "night";
    price = 40;
    startDate.setHours(16, 0, 0, 0);
    endDate.setHours(20, 0, 0, 0);
    scans = ["SnowPeak Gondola"];
  }

  db.skiPasses.insertOne({
    userId: user._id,
    type: cardType,
    price: price,
    validFrom: startDate,
    validTo: endDate,
    scans
  });
});

// set ski passes to all instructors
let instructors = db.users.find({ role: "instructor" }).toArray()

instructors.forEach(user => {
  db.skiPasses.insertOne({
    userId: user._id,
    type: "seasonal",
    price: 400,
    validFrom: new Date("2025-12-15"),
    validTo: new Date("2026-03-31"),
    scans: []
  });
});

// RESERVATIONS
tourists.slice(0, 5).forEach((user, index) => {
  let instructor = db.users.findOne({ role: "instructor" })
  let slope = db.slopes.findOne({ difficulty: "green" })
  let status = "confirmed"
  let duration = 2
  let price = 100

  if (index === 1) {
    instructor = db.users.findOne({ name: "Georgi Dimitrov" })
    slope = db.slopes.findOne({ difficulty: "red" })
    duration = 3
    price = 140
  }

  if (index === 2) {
    instructor = db.users.findOne({ name: "Ivaylo Stoyanov" })
    slope = db.slopes.findOne({ name: "Alpine Run" })
    status = "pending"
  }

  if (index === 3) {
    instructor = db.users.findOne({ name: "Ivaylo Stoyanov" })
    slope = db.slopes.findOne({ difficulty: "blue" })
    duration = 1
    price = 70
  }

  if (index === 4) {
    instructor = db.users.findOne({ name: "Georgi Dimitrov" })
    slope = db.slopes.findOne({ difficulty: "black" })
    status = "cancelled"
  }

  db.reservations.insertOne({
    touristId: user._id,
    instructorId: instructor._id,
    slopeId: slope._id,
    lessonDate: new Date(),
    durationHours: duration,
    price: price,
    status: status
  })
});

// MAINTENANCE REPORTS
let technician = db.users.findOne({ role: "technician" })

let lift1 = db.lifts.findOne({ name: "Alpine Express" })
let lift2 = db.lifts.findOne({ name: "SnowPeak Gondola" })
let lift3 = db.lifts.findOne({ name: "Summit T-Bar" })

db.maintenanceReports.insertMany([
  {
    liftId: lift1._id,
    technicianId: technician._id,
    date: new Date(),
    issueType: "mechanical",
    severity: "high",
    resolved: true,
    resolutionCost: 2500
  },
  {
    liftId: lift2._id,
    technicianId: technician._id,
    date: new Date(),
    issueType: "electrical",
    severity: "medium",
    resolved: true,
    resolutionCost: 1200
  },
  {
    liftId: lift3._id,
    technicianId: technician._id,
    date: new Date(),
    issueType: "cable tension problem",
    severity: "low",
    resolved: false,
    resolutionCost: 0
  }
]);

// add indexs for better performance on common queries
db.reservations.createIndex({ instructorId: 1 })
db.reservations.createIndex({ slopeId: 1 })
db.reservations.createIndex({ lessonDate: 1 })

print("Database initialized successfully.")