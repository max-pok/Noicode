const mongoose = require("mongoose")
const mongoose_config = require("./config/mongoose.config")
const app = require("./app")

const PORT = process.env.PORT || 8080

let server
mongoose.connect(mongoose_config.url, mongoose_config.options).then(() => {
  console.log("Connected to database.")
  server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`)
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
