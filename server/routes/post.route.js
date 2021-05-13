const express = require("express")
const postController = require("../controllers/post.controller")

const router = express.Router()
const stream_router = express.Router()

router.route("/").get(postController.getPosts) // get all posts.
router.route("/:userId").get(postController.getUserPosts) // get user posts.

stream_router.route("/:postImageId").get(postController.getPostImage)

module.exports = { router, stream_router }
