const express = require("express")
const userController = require("../controllers/user.controller")

const router = express.Router()

router.route("/:userId").get(userController.getUserInformation) // get user information.

module.exports = router
