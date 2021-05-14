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
      return Post.findById(postId)
    }
    return null
  }

  async updatePost(post) {
    if (mongoose.Types.ObjectId.isValid(post._id)) {
      return Post.updateOne({ _id: post._id }, { noice_ids: post.noice_ids })
    }
    return null
  }
}

module.exports = PostRepository
