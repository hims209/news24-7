//Imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Defining Database Schema for the user
const UserSchema = new mongoose.Schema({  
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  type: {type: String, default: "customer"}
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema, 'users');