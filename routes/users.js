var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');
var authController = require('../controllers/AuthController');

router.get('/', userController.list);

router.post('/', userController.storage);
router.post('/signin', authController.login), 


module.exports = router;
