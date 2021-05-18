const express = require('express');
const userController = require('../controllers/user.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();
const stream_router = express.Router();

router.route('/:userId').get(userController.getUserInformation); // get user information.
router.route('/update/info/:userId').post(userController.updateDetails);
// router.route('/update/pictures/:userId').post(userController.updatePictures);

stream_router.route('/profile-img/:userId').get(userController.getUserProfileImage); // get user profile image.
stream_router.route('/cover-img/:userId').get(userController.getUserCoverImage); // get user cover image.

stream_router.route('/update/profilePictures/:userId').post(upload.array('avatar'), userController.uploadProfilePicture); // post user profile image.
stream_router.route('/update/coverPictures/:userId').post(upload.array('cover'), userController.uploadCoverPicture);

module.exports = { router, stream_router };
