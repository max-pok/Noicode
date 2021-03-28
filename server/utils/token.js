const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const generateAuthToken = async (user) => {
  return jwt.sign({ user }, process.env.TOKEN_SECRET)
}

const verifyAuthToken = async (token) => {
  const payload = jwt.verify(token, process.env.TOKEN_SECRET)
  const user = await User.findOne(payload.user)
  return user
}

module.exports = { generateAuthToken, verifyAuthToken }
