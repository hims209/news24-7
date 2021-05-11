//Imports
const express = require('express');

const NewsController = require('./controlNews');

const checkAuth = require('../auth/check-auth');

const router = express.Router();
const nodemailer = require("nodemailer");

//Defining routes to Add, Get, Delete, Update
router.get('/sports', NewsController.getAllSportsNews);
router.get('/', NewsController.getAllNews);
router.post('/', checkAuth, NewsController.addNews);
router.get('/:newsId', checkAuth, NewsController.getNewsById);
router.delete('/:newsId', checkAuth, NewsController.deleteNewsById);
router.patch('/:newsId', checkAuth, NewsController.updateNews);
router.post('/sendFormData', checkAuth, NewsController.sendEmail);

  module.exports = router;