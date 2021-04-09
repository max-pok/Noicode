const User = require("../models/user.model")

class UserRepository {
  constructor() {}
  async getUserInformation(userId) {
    const user = await User.findOne({ _id: userId })
    return user
  }
}

module.exports = UserRepository
