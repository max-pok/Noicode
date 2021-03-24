const mongoose = require("mongoose")
const { decrypt } = require("../utils/crypto")

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 8,
  },
})

const User = mongoose.model("Users", userSchema)
module.exports = User
