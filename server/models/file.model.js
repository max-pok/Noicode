const mongoose = require("mongoose")
const schema = require("gridfile")

const UserFile = mongoose.model("UserFile", schema, "users.files")
const PostFile = mongoose.model("PostFile", schema, "posts.files")

module.exports = { UserFile, PostFile }
