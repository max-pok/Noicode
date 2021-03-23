const express = require("express")
const cors = require("cors")
const auth_routes = require("./routes/auth.route")

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
app.use("/auth", auth_routes)

module.exports = app
