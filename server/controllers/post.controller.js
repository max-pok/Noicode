const PostRepository = require("../repositories/post.repository")
const postRepository = new PostRepository()

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

module.exports = { getUserPosts, getPosts }
