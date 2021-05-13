const Post = require("../models/post.model")
const mongoose = require("mongoose")

class PostRepository {
  constructor() {}

  async getPostsById(user_id) {
    let posts = await Post.find({ user_id })
    return posts || []
  }

  async getPosts() {
    let posts = await Post.find()
    return posts || []
  }

  async getPostInformation(postId) {
    if (mongoose.Types.ObjectId.isValid(postId)) {
      const post = await Post.findById(postId)
      return post
    }
    return null
  }
}

module.exports = PostRepository
