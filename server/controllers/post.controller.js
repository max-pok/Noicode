const PostRepository = require("../repositories/post.repository");
const postRepository = new PostRepository();
const config = require("../config/mongoose.config");
const mongoose = require("mongoose");

const connect = mongoose.createConnection(config.url, config.options);
let gfs;

connect.on("open", () => {
  // initialize GridFS
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "posts",
  });
});

/**
 * @Get
 */
const getUserPosts = async (req, res) => {
  const posts = await postRepository.getPostsById(req.params.userId);
  if (!posts) {
    res.status(400).send("No posts found.");
  } else {
    res.send({ posts });
  }
};

/**
 * @Get
 */
const getPosts = async (req, res) => {
  const posts = await postRepository.getPosts();
  if (!posts) {
    res.status(400).send("No posts found.");
  } else {
    res.send(posts);
  }
};

/**
 * @Get
 */
const updatePost = async (req, res, next) => {
  let update = await postRepository.updatePost(req.body)
}

/**
 * @Get
 */
const getPostImage = async (req, res) => {
  await gfs
    .find({ _id: mongoose.Types.ObjectId(req.params.postImageId) })
    .toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No post files available",
        });
      }
      // render image to browser
      gfs
        .openDownloadStream(mongoose.Types.ObjectId(req.params.postImageId))
        .pipe(res);
    });
};

/**
 * @Post
 */
const uploadPost = async (req, res) => {
  console.log("got to upload post");
  const user_id = req.params.userId;
  let { title, content, date, comment_ids, noice_ids, tags, img, link } =
    req.body;
  if (!title) title = "Some title";
  if (!date) date = Date.now();
  if (!comment_ids) comment_ids = [];
  if (!noice_ids) noice_ids = [];
  if (!tags) tags = [];
  if (!img) img = [];
  console.log(req.body);
  try {
    const post = await postRepository.savePost(
      user_id,
      title,
      content,
      date,
      comment_ids,
      noice_ids,
      tags,
      img,
      link
    );
    if (post) res.status(200).send({ post });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getUserPosts, getPosts, getPostImage, uploadPost, updatePost};
