const crypto = require("crypto")

// validate users password (8 characters, at least one uppercase, one lowercase and one special character)
function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/

  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain uppercase, lowercase and special character"
    )
  }
}

// hash function for the users password using SHA256
function hashPassword(password) {
  validatePassword(password)

  return crypto
    .createHash("sha256")
    .update(password)
    .digest("hex")
}