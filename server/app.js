const express = require("express")
const cors = require("cors")
const auth_routes = require("./routes/auth.route")
const post_routes = require("./routes/post.route")
const user_routes = require("./routes/user.route").router

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
app.use("/auth", auth_routes)
app.use("/api/posts", post_routes)
app.use("/api/users", user_routes)

module.exports = app
