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

  async getUserProfileImage(userId) {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId)
      return user
    }
    return null
  }
}

module.exports = UserRepository
