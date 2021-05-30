const express = require("express");
const postController = require("../controllers/post.controller");

const router = express.Router();
const stream_router = express.Router();


router.route("/").get(postController.getPosts) // get all posts.
router.route("/:userId").get(postController.getUserPosts) // get user posts.
router.route("/update").post(postController.updatePost) // get all posts.


//posting user post
router.route("/upload-post/:userId").post(postController.uploadPost);

stream_router.route("/:postImageId").get(postController.getPostImage);

module.exports = { router, stream_router };
