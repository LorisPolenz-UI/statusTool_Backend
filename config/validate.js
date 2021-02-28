const { check, validationResult } = require('express-validator');
const user = require('../models/user');


module.exports.checkMail = (mail) => {
    user.findOne({
        where: {
            email: mail
        }
    }).then(element => {
        if (element !== null) {
            console.log('Email already exists');
            return 'Email already exists';
        } else {
            return 'Ok'
        }

    })
}




/*
    check('email').custom(value => {
        console.log("hi")
        return user.findUserByEmail(value).then(user => {
            if (user) {
                return Promise.reject('E-Mail already in use!');
            }
        });
    }),
    (req, res) => {
        next();
    }
 */



