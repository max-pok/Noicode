const express = require("express")
const cors = require("cors")
const stream_user_routes = require("./routes/user.route").stream_router
const stream_post_routes = require("./routes/post.route").stream_router

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
app.use("/api/users", stream_user_routes)
app.use("/api/posts", stream_post_routes)

module.exports = app
