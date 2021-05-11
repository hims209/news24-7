//Imports
const User = require('./user.model');
const bcrypt = require('bcryptjs');

//get All users for Authuntication
exports.getAllUsers = (req, res, next) => {
    User.find({}, (err, users)=>{
        if (err) return res.status(500).send("Can not fetch users");
        res.status(200).send({users});
    });
}

//User Registration to the website.
exports.addUser = (req, res, next) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);    
    User.create({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name
    },(err, user)=>{
        if (err) {
            if (err.name === 'ValidationError'){
                return res.status(201).send({errorMsg: 'Email is already registered, please log in or register a different email address.', successMsg: null});
            } else {
                return res.status(201).send({errorMsg: err, successMsg: null});
            } 
        };
        res.status(201).send({errorMsg: null, successMsg: 'User successfully registered, please log in', user: user});
    });

}
    
