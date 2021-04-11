const express = require("express")
const postController = require("../controllers/post.controller")

const router = express.Router()

router.route("/:userId").get(postController.getUserPosts) // get user posts.

module.exports = router
