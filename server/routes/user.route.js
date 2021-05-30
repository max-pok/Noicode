const express = require('express');
const userController = require('../controllers/user.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();
const stream_router = express.Router();
router.route("/:userId").get(userController.getUserInformation) // get user information.
router.route("/name/:userId").get(userController.getUserFullName) // get user full name.
router.route("/upload-avatar/:userId").post(userController.uploadAvatar)
router.route("/update/:userId").post(userController.updateDetails)

stream_router.route('/profile-img/:userId').get(userController.getUserProfileImage); // get user profile image.
stream_router.route('/cover-img/:userId').get(userController.getUserCoverImage); // get user cover image.

stream_router.route('/update/profilePictures/:userId').post(upload.array('avatar'), userController.uploadProfilePicture); // post user profile image.
stream_router.route('/update/coverPictures/:userId').post(upload.array('cover'), userController.uploadCoverPicture);

module.exports = { router, stream_router };
