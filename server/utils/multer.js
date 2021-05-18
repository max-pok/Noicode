const mo = require("method-override");
const multer = require("multer");
const GridFSStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");

const storage = new GridFSStorage({
  url: process.env.DB_DEVELOPMENT_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: req.headers.bucketName,
        };
      });
    });
  },
});

module.exports = multer({ storage });
