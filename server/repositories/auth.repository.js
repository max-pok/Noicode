const User = require("../models/user.model")
const { decrypt } = require("../utils/crypto")

class AuthRepository {
  constructor() {}

  async findUser(email, password) {
    const user = await User.findOne({ email: decrypt(email) })
    if (user && this.isValid(password, user.password)) {
      return true
    }

    return false
  }

  isValid(inputPassword, savedPassword) {
    return decrypt(inputPassword) == decrypt(savedPassword)
  }
}

module.exports = AuthRepository
