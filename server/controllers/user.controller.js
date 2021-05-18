const mongoose = require("mongoose");
const config = require("../config/mongoose.config");
const UserRepository = require("../repositories/user.repository");
const multer = require("../utils/multer");

const userRepository = new UserRepository();

const connect = mongoose.createConnection(config.url, config.options);
let gfs;

connect.once("open", () => {
  // initialize GridFS
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "users",
  });
});

/**
 * @Get
 */
const getUserInformation = async (req, res) => {
  const user = await userRepository.getUserInformation(req.params.userId);
  if (!user) {
    res.status(400).send("No posts found.");
  } else {
    res.send({ user });
  }
};

/**
 * @Get
 */
const getUserProfileImage = async (req, res) => {
  const user = await userRepository.getUserInformation(req.params.userId);
  if (user) {
    await gfs.find({ _id: user.avatar_img }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }
      // render image to browser
      gfs.openDownloadStream(user.avatar_img).pipe(res);
    });
  } else {
    res.status(400).send("No such user.");
  }
};

/**
 * @Get
 */
const getUserCoverImage = async (req, res) => {
  const user = await userRepository.getUserInformation(req.params.userId);
  if (user) {
    await gfs.find({ _id: user.cover_img }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }
      // render image to browser
      gfs.openDownloadStream(user.cover_img).pipe(res);
    });
  } else {
    res.status(400).send("No such user.");
  }
};

const updatePictures = async (req, res) => {
  try {
    console.log(req);
    // await userRepository.setUserPictures(req.params.userId, req.body.avatar, req.body.cover);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/**
 * @Post
 */
const updateDetails = async (req, res, next) => {
  try {
    await userRepository.setUserInformation(req.params.userId, req.body.information);
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/**
 * @Get
 */
const getUserFullName = async (req, res) => {
  const user = await userRepository.getUserName(req.params.userId);
  if (!user) {
    res.status(400).send("No posts found.");
  } else {
    res.send(user);
  }
};

module.exports = { updateDetails, getUserInformation, getUserProfileImage, getUserCoverImage, getUserFullName };
