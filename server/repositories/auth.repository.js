const User = require("../models/user.model")
const { decrypt } = require("../utils/crypto")

class AuthRepository {
  constructor() {}

  async findUser(email, password) {
    const user = await User.findOne({ email: decrypt(email) }).select("+password") 
    if (!user || !(await user.isPasswordMatch(password))) {
      return null
    }
    return user
  }

  async saveUser(email, password, fname, lname, dob){
    let user = await User.findOne({ email })
    if(user){
      return null
    }
    user = await new User({email, password, fname, lname, dob}).save()
    return user
  }
}

module.exports = AuthRepository
