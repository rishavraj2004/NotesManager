const express = require('express');
const authController = require('../controller/authController');
const profileController = require('../controller/profileController');
const router = express.Router();
const isAuth = require('../middleware/isAuth')
router.get('/profile', isAuth, profileController.getProfile);
module.exports = router