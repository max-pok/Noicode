const User = require('../models/user.model');
const { UserFile } = require('../models/file.model');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
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
      throw 'User not found';
  }

  async setUserInformation(userId, information) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw 'Invalid User ID.';
    }
    const user = await User.findByIdAndUpdate(userId, information);
    if (!user) {
      throw 'User not found';
    }
  }

  async updateProfilePictures(files, userId) {
    const fileStream = fs.createReadStream(path.join(__dirname, '/../uploads/', files[0].filename));
    const userFile = new UserFile();
    userFile.filename = files[0].filename;
    const result = await userFile.upload(fileStream);
    fileStream.close();
    if (result) {
      const user = await User.findByIdAndUpdate(userId, { avatar_img: result._id });
      return user ? result._id : null;
    }
    return null;
  }

  async updateCoverPictures(files, userId) {
    const fileStream = fs.createReadStream(path.join(__dirname, '/../uploads/', files[0].filename));
    console.log(fileStream);
    const userFile = new UserFile();
    userFile.filename = files[0].filename;
    const result = await userFile.upload(fileStream);
    fileStream.close();
    if (result) {
      const user = await User.findByIdAndUpdate(userId, { cover_img: result._id });
      return user ? result._id : null;
    }
    return null;
  }
}

module.exports = UserRepository;
