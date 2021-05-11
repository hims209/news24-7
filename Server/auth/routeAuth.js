//Imports
const express = require('express');

const AuthController = require('./controlAuth');

//Define router from express
const router = express.Router();

//route to login Authuntication
router.post('/login', AuthController.login);

module.exports = router;