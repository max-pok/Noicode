const express = require("express")
const cors = require("cors")
const multer = require("multer")
const GridFsStorage = require("multer-gridfs-storage")
const stream_routes = require("./routes/user.route").stream_router
const config = require("./config/mongoose.config")

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// create storage engine
const storage = new GridFsStorage({
  url: config,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString("hex") + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        }
        resolve(fileInfo)
      })
    })
  },
})

const upload = multer({ storage })

// routes
app.use("/api/users", stream_routes)

module.exports = app
