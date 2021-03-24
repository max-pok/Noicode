const User = require("../models/user.model")
const { decrypt } = require("../utils/crypto")

class AuthRepository {
  constructor() {}

  async findUser(email, password) {
    const user = await User.findOne({ email: decrypt(email) })
    if (!user || !(await user.isPasswordMatch(password))) {
      return null
    }
    return user
  }
}

module.exports = AuthRepository
