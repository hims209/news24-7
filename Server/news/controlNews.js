//Imports
const News = require('../news/news.model');
const nodemailer = require("nodemailer");

//Get all news.
exports.getAllNews = (req, res, next) => {
    News.find({},null, {sort: {publishDate: -1}}, (err, newsData)=>{
        if (err) return res.status(500).send("Can not fetch news");
        res.status(200).send({newsData});
    });
}
//Filtering the sports news by type sports
exports.getAllSportsNews = (req, res, next) => {
    News.find({"type" : "Sports"},null, {sort: {publishDate: -1}}, (err, newsData)=>{
        if (err) return res.status(500).send("Can not fetch news");
        res.status(200).send({newsData});
    });
}

exports.sendEmail =  (req, res) => {
    console.log(req.body, 'data of form');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'darshan26kumar@gmail.com',
      secure: 'true',
      port: '465',
      auth: {
        user: 'darshan26kumar@gmail.com', // must be Gmail
        pass: 'test786@'
      }
    });
  
    var mailOptions = {
      from: 'darsan26kumar@gmail.com',
      to: req.body.email, // must be Gmail
      subject: 'Sending Email using Node.js',
      html: `
              <table style="width: 100%; border: none">
                <thead>
                  <tr style="background-color: #000; color: #fff;">
                    <th style="padding: 10px 0">Name</th>
                    <th style="padding: 10px 0">E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style="text-align: center">${req.body.name}</th>
                    <td style="text-align: center">${req.body.message}</td>
                  </tr>
                  <p>We will get back to you in 24 hours with your query</p>
                </tbody>
              </table>
            `
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({
          message: 'successfuly sent!'
        })
      }
    });
  
  }
  

//Add news To the database by News.create
exports.addNews = (req, res, next) => {  
    News.create({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        imageUrl: req.body.imageUrl,
        type:req.body.type,
        publishDate: req.body.publishDate
    },(err, newsItem)=>{
        if (err) return res.status(500).send({errorMsg: err, successMsg: null});
        let testDate = new Date(newsItem.publishDate);
        res.status(201).send({ message: "News item created successfully", data: newsItem});
    });
}

//Delete news by Id From database by News.deleteOne
exports.deleteNewsById = (req, res, next) => {
    try {
        News.deleteOne({_id: req.params.newsId}, (err, result)=>{
            if (err) return res.status(500).send({error:"Server Error, Can not delete news"});
            if (result.deletedCount === 1) {
                res.status(200).send({message:"Successfully deleted news"});
            } else {
                res.status(500).send({error:"Can not delete requested news _id"});
            }
        });
    } catch (error) {
        console.log(error);
    }
};

//Get news by Id from the database by News.findById
exports.getNewsById = (req, res, next) => {
    try {
        News.findById(req.params.newsId, (err, result) => {
            if (err) return res.status(500).send("Can not fetch news");
            res.status(200).send(result);
        });
    } catch (error) {
        console.log(error);
    }
};

//Update news from database by News.updateOne
exports.updateNews = (req, res, next) => {
    if (req.params.newsId.match(/^[0-9a-fA-F]{24}$/)) {
        try {
            News.updateOne({ _id: req.params.newsId}, {$set: req.body}).then(result => {
                if (result.n > 0) {
                  res.status(200).send({message: "Changes have been saved"});
                } else {
                  res.status(401).send({message: "Changes could not be saved"});
                }
            });    
        } catch (err) {
            res.status(500).send({message: "Changes could not be saved due to a server error.", serverError: err});
        } 
    } else {
        res.status(401).send({message: 'Not a valid news id'});
    }    
};