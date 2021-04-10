const mongoose = require("mongoose")
const mongoose_config = require("./config/mongoose.config")
const app = require("./app")
const stream_app = require("./stream_app")

const PORT = process.env.PORT || 8080
const STREAM_PORT = process.env.STREAM_PORT || 8081

let server, stream_server, gfs
mongoose.connect(mongoose_config.url, mongoose_config.options).then(() => {
  console.log("Connected to database.")
  server = app.listen(PORT, () => {
    console.log(`Main server is listening on port ${PORT}.`)
  })

  stream_server = stream_app.listen(STREAM_PORT, () => {
    console.log(`Stream server is listening on port ${STREAM_PORT}.`)
  })
})

const exitHandler = async () => {
  await mongoose.connection.close()
  console.log("Disconnected from database.")
  if (server) {
    server.close(() => console.log("Server closed."))
  }
}

const exceptionHandler = (error) => {
  console.error(error)
  exitHandler()
}

process.on("uncaughtException", exceptionHandler)
process.on("unhandledRejection", exceptionHandler)
process.on("SIGINT", exitHandler)
