const express = require("express")
const userController = require("../controllers/user.controller")
const router = express.Router()
const stream_router = express.Router()

router.route("/:userId").get(userController.getUserInformation) // get user information.
router.route("/upload-avatar/:userId").post(userController.uploadAvatar)

stream_router.route("/profile-img/:userId").get(userController.getUserProfileImage) // get user profile image.
stream_router.route("/cover-img/:userId").get(userController.getUserCoverImage) // get user cover image.

module.exports = { router, stream_router }
