db = db.getSiblingDB("SnowPeakResortDB")

db.createUser({
  user: "resortAdmin",
  pwd: "admin123",
  roles: [
    { role: "readWrite", db: "snowpeakResortDB" }
  ]
})

db.createUser({
  user: "resortViewer",
  pwd: "viewer123",
  roles: [
    { role: "read", db: "snowpeakResortDB" }
  ]
})