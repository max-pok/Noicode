const PostRepository = require("../repositories/post.repository")
const postRepository = new PostRepository()
const config = require("../config/mongoose.config")
const mongoose = require("mongoose")

const connect = mongoose.createConnection(config.url, config.options)
let gfs

connect.on("open", () => {
  // initialize GridFS
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "posts",
  })
})

/**
 * @Get
 */
const getUserPosts = async (req, res) => {
  const posts = await postRepository.getPostsById(req.params.userId)
  if (!posts) {
    res.status(400).send("No posts found.")
  } else {
    res.send({ posts })
  }
}

/**
 * @Get
 */
const getPosts = async (req, res) => {
  const posts = await postRepository.getPosts()
  if (!posts) {
    res.status(400).send("No posts found.")
  } else {
    res.send(posts)
  }
}

/**
 * @Get
 */
const getPostImage = async (req, res) => {
  await gfs.find({ _id: mongoose.Types.ObjectId(req.params.postImageId) }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No post files available",
      })
    }
    // render image to browser
    gfs.openDownloadStream(mongoose.Types.ObjectId(req.params.postImageId)).pipe(res)
  })
}

module.exports = { getUserPosts, getPosts, getPostImage }
