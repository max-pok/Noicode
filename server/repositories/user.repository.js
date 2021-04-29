const User = require("../models/user.model")
const UserFile = require("../models/user-file.model")
const mongoose = require("mongoose")

class UserRepository {
  constructor() {}

  async getUserInformation(userId) {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId)
      return user
    }
    return null
  }

  async getUserName(userId) {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId).select("fname lname")
      console.log(user)
      return user
    }
    return null
  }

  async setUserInformation(userId, information) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw "Invalid User ID."
    }
    const user = await User.findByIdAndUpdate(userId, information)
    if (!user) {
      throw "User not found"
    }
  }
}

module.exports = UserRepository
