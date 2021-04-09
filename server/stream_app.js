const express = require("express")
const cors = require("cors")
const post_routes = require("./routes/post.route")

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
app.use("/api", post_routes)

module.exports = app
