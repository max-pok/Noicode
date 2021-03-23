const login = async (req, res) => {
  console.log(req.body)

  res.send("received")
}

module.exports = { login }
