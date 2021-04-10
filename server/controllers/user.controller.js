const mongoose = require("mongoose")
const config = require("../config/mongoose.config")
const UserRepository = require("../repositories/user.repository")
const userRepository = new UserRepository()

const connect = mongoose.createConnection(config.url, config.options)
let gfs

connect.on("open", () => {
  console.log("Connected to GridFS.")
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "users",
  })
})

/**
 * @Get
 */
const getUserInformation = async (req, res) => {
  const user = await userRepository.getUserInformation(req.params.userId)
  if (!user) {
    res.status(400).send("No posts found.")
  } else {
    res.send({ user })
  }
}

/**
 * @Get
 */
const getUserProfileImage = async (req, res) => {
  const user = await userRepository.getUserProfileImage(req.params.userId)
  if (user) {
    await gfs.find({ _id: user.avatar_img }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        })
      }
      // render image to browser
      gfs.openDownloadStream(user.avatar_img).pipe(res)
    })
  } else {
    res.status(400).send("No such user.")
  }
}

/**
 * @Get
 */
const getUserCoverImage = async (req, res) => {
  const user = await userRepository.getUserProfileImage(req.params.userId)
  if (user) {
    await gfs.find({ _id: user.cover_img }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        })
      }
      // render image to browser
      gfs.openDownloadStream(user.cover_img).pipe(res)
    })
  } else {
    res.status(400).send("No such user.")
  }
}

/**
 * @Post
 */
const uploadAvatar = async (req, res) => {
  res.status(200).send("Image uploaded successfully.")
  // ...
}

module.exports = { getUserInformation, uploadAvatar, getUserProfileImage, getUserCoverImage }
