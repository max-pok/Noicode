const express = require("express")
const userController = require("../controllers/user.controller")
const router = express.Router()

router.route("/:userId").get(userController.getUserInformation) // get user information.
router.route("/upload-avatar/:userId").post(userController.uploadAvatar)

module.exports = router
