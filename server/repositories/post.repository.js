const Post = require("../models/post.model");
const mongoose = require("mongoose");

class PostRepository {
  constructor() {}

  async getPostsById(user_id) {
    let posts = await Post.find({ user_id });
    return posts || [];
  }

  async getPosts() {
    let posts = await Post.find().sort({ date: -1 });
    return posts || [];
  }

  async getPostInformation(postId) {
    if (mongoose.Types.ObjectId.isValid(postId)) {
      const post = await Post.findById(postId);
      return post;
    }
    return null;
  }

  async savePost(
    user_id,
    title,
    content,
    date,
    comment_ids,
    noice_ids,
    tags,
    img,
    link
  ) {
    console.log("save post");
    const newPost = {
      user_id,
      title,
      content,
      date,
      comment_ids,
      noice_ids,
      tags,
      img,
      link,
    };
    console.log(newPost);

    const post = await new Post(newPost).save();
    if (!post) {
      throw "Couldn't Post";
    }
    return post;
  }
}

module.exports = PostRepository;
