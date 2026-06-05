const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

router.get('/login', authController.getLogin)
router.get('/register', authController.getSignup)
router.post('/signup', authController.postSignup)
router.post('/login', authController.postLogin);


module.exports = router;