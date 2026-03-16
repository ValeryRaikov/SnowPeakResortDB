// Connect to admin database
db = db.getSiblingDB("admin")

// Remove existing users if script is re-run
try { db.dropUser("resortAdmin") } catch(e) {}
try { db.dropUser("resortOperator") } catch(e) {}
try { db.dropUser("resortViewer") } catch(e) {}

// Create ADMIN user
db.createUser({
  user: "resortAdmin",
  pwd: "Admin@123",
  roles: [
    {
      role: "dbOwner",
      db: "SnowPeakResortDB"
    }
  ]
})

// Create OPERATOR user
db.createUser({
  user: "resortOperator",
  pwd: "Operator@123",
  roles: [
    {
      role: "readWrite",
      db: "SnowPeakResortDB"
    }
  ]
})

// Create VIEWER user
db.createUser({
  user: "resortViewer",
  pwd: "Viewer@123",
  roles: [
    {
      role: "read",
      db: "SnowPeakResortDB"
    }
  ]
})

print("RBAC users created successfully")