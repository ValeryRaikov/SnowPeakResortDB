# SnowPeak Resort MongoDB Project

## Description

SnowPeak Resort is a MongoDB-based database system designed to simulate the management of a modern ski resort.  
The system stores and processes information about tourists, ski passes, ski lifts, slopes, ski lessons, and maintenance activities.

The project demonstrates the use of **MongoDB as a non-relational database** for managing complex and semi-structured data in a real-world business scenario.

The goal of the system is to support typical resort operations such as:

- managing resort visitors and staff
- selling and tracking ski passes
- scheduling ski lessons with instructors
- monitoring ski lifts and maintenance activities
- analyzing resort activity using aggregation queries

The project was developed as part of a **Non-Relational Databases course assignment**.

---

# Technologies Used

- **MongoDB**
- **MongoDB Shell (mongosh)**
- **MongoDB Compass**
- **VS Code**
- **JavaScript (MongoDB scripts)**

---

# Database Structure

The system contains **6 main collections**:

| Collection | Description |
|-------------|-------------|
| `users` | Tourists, instructors and technicians |
| `skiPasses` | Ski passes assigned to users |
| `lifts` | Ski lifts operating in the resort |
| `slopes` | Ski slopes with different difficulty levels |
| `reservations` | Ski lesson reservations |
| `maintenanceReports` | Technical maintenance records for lifts |

The database contains **30+ realistic documents** generated through initialization scripts.

---

# Key Features

The project demonstrates the following MongoDB concepts:

### Data Modeling
- Document-oriented data structure
- References between collections
- Flexible schema design

### CRUD Operations
Examples of:

- `insertOne`
- `insertMany`
- `find`
- `updateOne`
- `updateMany`
- `deleteOne`
- `deleteMany`

Including operators such as:

- `$gte`
- `$lte`
- `$in`
- `$regex`
- `$or`
- `$exists`
- `$push`
- `$pull`

### Aggregation Pipeline

Advanced queries using:

- `$match`
- `$group`
- `$sort`
- `$lookup`
- `$unwind`
- `$limit`

These queries allow extraction of **business insights**, such as:

- total ski pass revenue
- instructor workload
- most popular slopes
- tourist skill distribution
- lift capacity ranking

### Schema Validation

Schema validators are implemented for several collections to ensure:

- correct data types
- required fields
- allowed values

This helps maintain **data consistency in a flexible NoSQL environment**.

### Security

#### Password Hashing

User passwords are stored using **SHA-256 hashing**, ensuring that plain text passwords are never stored in the database.

Password validation rules require:

- minimum 8 characters
- at least one uppercase letter
- at least one lowercase letter
- at least one special character

#### Role-Based Access Control (RBAC)

MongoDB RBAC is used to restrict access to data depending on user roles:

| Role | Permissions |
|------|-------------|
| Admin | Full database access |
| Instructor | Access to lesson reservations |
| Technician | Access to lift maintenance |
| Tourist | Limited read access |

---

# Project Structure

<img width="580" height="277" alt="image" src="https://github.com/user-attachments/assets/c4aa209f-6b86-4b83-9179-6640e46582ce" />

---

# How to Run the Project

1. Start MongoDB service.

2. Open terminal or mongosh.

3. Run the initialization script:
   
`mongosh database/init.js`

This will:

- create the **SnowPeakResortDB**
- generate all collections
- populate the database with sample data

4. Run CRUD operations:

`mongosh database/crud.js`

5. Run aggregation queries:

`mongosh database/aggregation.js`

6. Run analytics queries:

`mongosh database/analyticQueries.js`

7. Configure and test RBAC:

`mongosh database/rbac.js`

# Documentation

For more information and detailed documentation of the project, including:

- system design
- database modeling
- schema descriptions
- explanation of queries
- RBAC implementation

please refer to the accompanying **project documentation file (NBD_project_Valeri.docx)** included in the repository.

---

# Author

Project developed as part of the **Non-Relational Databases course** Technical University of Sofia.
