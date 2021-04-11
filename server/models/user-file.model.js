const mongoose = require("mongoose")
const schema = require("gridfile")

const UserFile = mongoose.model("UserFile", schema, "users.files")
module.exports = UserFile
