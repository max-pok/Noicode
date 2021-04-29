const User = require('../models/user.model');
const UserFile = require('../models/user-file.model');
const mongoose = require('mongoose');

class UserRepository {
  constructor() {}

  async getUserInformation(userId) {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);
      return user;
    }
    return null;
  }

  async setUserInformation(userId, information) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw 'Invalid User ID.';
    }
    console.log(userId, information);
    const user = await User.findByIdAndUpdate(userId, information);
    if (!user) {
      throw 'User not found';
    }
  }
}

module.exports = UserRepository;
