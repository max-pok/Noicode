const jwt = require("jsonwebtoken")

const generateAuthToken = async (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "1800s" })
}

module.exports = generateAuthToken
