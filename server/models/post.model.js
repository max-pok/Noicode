const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  comment_ids: {
    type: Array,
    required: true,
  },
  noice_ids: {
    type: Array,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
})

const Post = mongoose.model("Posts", postSchema)
module.exports = Post
