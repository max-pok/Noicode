const UserRepository = require("../repositories/user.repository")
const userRepository = new UserRepository()

/**
 * @Get
 */
const getUserInformation = async (req, res) => {
  const user = await userRepository.getUserInformation(req.params.userId)
  if (!user) {
    res.status(400).send("No posts found.")
  } else {
    res.send({ user })
  }
}

/**
 * @Post
 */
const uploadAvatar = async (req, res) => {
  res.status(200).send("Image uploaded successfully.")
  // ...
}

module.exports = { getUserInformation, uploadAvatar }
