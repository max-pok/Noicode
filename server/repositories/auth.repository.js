const User = require('../models/user.model');
const { UserFile } = require('../models/file.model');
const fs = require('fs');
const path = require('path');

class AuthRepository {
  constructor() {}

  async findUser(email, password) {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.isPasswordMatch(password))) {
      return null;
    }
    return user;
  }

  async saveUser(email, password, fname, lname, dob) {
    let user = await User.findOne({ email });
    if (user) {
      return null;
    }

    // get default avatar & cover image.
    const avatar_img = await UserFile.findOne({ filename: 'default_avatar.png' });
    const cover_img = await UserFile.findOne({ filename: 'default_cover.jpg' });

    const newUser = { email, password, fname, lname, dob, avatar_img, cover_img };
    user = await new User(newUser).save();
    return user;
  }

  async initializeDefaultImages() {
    // upload an image from a local file
    const fileStream = fs.createReadStream(path.join(__dirname, '../assets/cover.jpg'));
    const fileStream2 = fs.createReadStream(path.join(__dirname, '../assets/avatar.png'));
    const userFileCover = new UserFile();
    const userFileAvatar = new UserFile();
    userFileCover.filename = 'default_cover.jpg';
    await userFileCover.upload(fileStream);

    userFileAvatar.filename = 'default_avatar.png';
    await userFileAvatar.upload(fileStream2);
  }
}

module.exports = AuthRepository;
