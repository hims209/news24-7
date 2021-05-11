//Imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Define Databse Schema
const NewsSchema = new mongoose.Schema({  
  title: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  url: {type: String, required: true},
  type:{type:String,required:true},
  imageUrl: {type: String, required: true},
  publishDate: {type: String, required: true}
});


NewsSchema.plugin(uniqueValidator);

module.exports = mongoose.model('News', NewsSchema, 'news');