
//Imports 
const User = require('../user/user.model');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const config = require('../config');


//Login Authuntication
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({errorMsg: 'Server error fetching user'});
        if(!user) {
            return res.status(200).send({errorMsg: 'Invalid authentication credentials!'});
        } else {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(200).send({errorMsg: 'Invalid authentication credentials!'});
            } else {
                var token = jwt.sign({ id: user._id, email: req.body.email, name: user.name, type: user.type}, config.secretOrKey, {expiresIn: 1200 });
                res.status(200).json({id: user._id, email: user.email, name: user.name, token: token});
            }
        }
    })
}