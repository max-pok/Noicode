const mongoose = require('mongoose');
const { decrypt } = require('../utils/crypto');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false //hides the password. if you want the document with the password
                  // add User.findOne(....).select('+password')
    // minlength: 8,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
});

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return decrypt(password) === decrypt(user.password);
};

const User = mongoose.model('Users', userSchema);
module.exports = User;
