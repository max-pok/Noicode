const AuthRepository = require("../repositories/auth.repository")

const authRepository = new AuthRepository()

const login = async (req, res) => {
  const exist = await authRepository.findUser(req.body.email, req.body.password)
  res.send(exist)
}

module.exports = { login }
