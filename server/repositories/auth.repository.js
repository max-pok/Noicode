const User = require("../models/user.model")
const { decrypt } = require("../utils/crypto")

class AuthRepository {
  constructor() {}

  async findUser(email, password) {
    const user = await User.findOne({ email }).select("+password") 
    console.log(user)
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
    const newUser = {email, password, fname, lname, dob}
    user = await new User(newUser).save()
    return user
  }
}

module.exports = AuthRepository
