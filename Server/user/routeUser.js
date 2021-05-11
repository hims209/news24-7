//Imports
const express = require('express');

const UserController = require('./controlUser');

const checkAuth = require('../auth/check-auth');

const router = express.Router();

router.get('/',  UserController.getAllUsers);
router.post('/', UserController.addUser);

module.exports = router;