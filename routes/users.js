var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');

router.get('/', UserController.list);

router.post('/', UserController.storage);


module.exports = router;
