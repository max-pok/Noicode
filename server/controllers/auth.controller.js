const AuthRepository = require("../repositories/auth.repository")
const { generateAuthToken } = require("../utils/token")
const authRepository = new AuthRepository()

/**
 * @Post
 */
const login = async (req, res) => {
  const user = await authRepository.findUser(req.body.email, req.body.password)
  if (!user) {
    res.status(400).send("No such user.")
  } else {
    const token = await generateAuthToken(user)
    res.send({ token })
  }
}

module.exports = { login }
