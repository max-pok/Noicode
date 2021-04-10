const User = require("../models/user.model")
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
}

module.exports = UserRepository
