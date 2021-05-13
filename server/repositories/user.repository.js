const User = require("../models/user.model");
const { UserFile } = require("../models/file.model");
const mongoose = require("mongoose");

class UserRepository {
  constructor() {}

  async getUserInformation(userId) {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);
      return user;
    }
    return null;
  }

  async setUserPictures(userId, avatar, cover) {
    const pictures = {};
    if (avatar) {
      pictures.avatar_img = avatar;
    }
    if (cover) {
      pictures.cover_img = cover;
    }
    const user = await User.findByIdAndUpdate(userId, pictures);
    if (!user) {
      throw "User not found";
    }
  }

  async setUserInformation(userId, information) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw "Invalid User ID.";
    }
    const user = await User.findByIdAndUpdate(userId, information);
    if (!user) {
      throw "User not found";
    }
  }
  async getUserName(userId) {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId).select("fname lname");
      console.log(user);
      return user;
    }
    return null;
  }

  async setUserInformation(userId, information) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw "Invalid User ID.";
    }
    const user = await User.findByIdAndUpdate(userId, information);
    if (!user) {
      throw "User not found";
    }
  }
}

module.exports = UserRepository;
