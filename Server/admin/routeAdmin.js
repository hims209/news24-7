//All the routs for the admin is defined here...

//Express Framework import
const express = require('express');

//controlAdmin.js module import
const AdminController = require('./controlAdmin');

//authunticator module import
const checkAuth = require('../auth/check-auth');

//Router define.
const router = express.Router();

// on / route to the dashboard method in controlAdmin
router.get('/', checkAuth, AdminController.dashboard);

// on /news it will route to getNewslist method from where all the news list fetch.
router.get('/news', checkAuth, AdminController.getNewsList);

// on /news/add it will route to method NewsForm where admin can fill out the form to add new news!!
router.get('/news/add', checkAuth, AdminController.getNewsForm);

// on /news/edit it will route to method NewsEdit where admin can able to change the information of existing news!!
router.post('/news/edit', checkAuth, AdminController.getNewsEdit);

module.exports = router;