const user = require('../models/user.js');
const stat = require('../models/statuses');
const Sequelize = require('sequelize');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        console.log("Valid E-Mail entered");
        return true;
    } else {
        console.log("Not valid E-Mail entered");
        return false;
    }
}

function ValidatePassword(password) {

}

function ValidateInput (mail, password) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        console.log(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
        return true;
    } else if (password.length > 10) {
        return true;
    } else {
        return false;
    }
}




module.exports.signup = (req, res) => {
    if (ValidateInput(req.body.mail, req.body.password) != true) {
            res.status(300).send({
                message: "E-Mail or password are invalid"
            })
        }else {
            user.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then(element => {
                    if (element !== null) {
                        console.log('Email already exists');
                        return res.status(409).send({
                            message: 'Email already exists'
                        })
                    } else {
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if (err) {
                                return res.status(500);
                                console.log(err);
                            } else {
                                user.create({
                                    email: req.body.email,
                                    password: hash,
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                })
                                    .then(crstatus => {
                                        res.status(200).send({
                                            message: 'You are now sign up'
                                        })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        return res.status(400).json({
                                            message: 'An error occured!',
                                            error: err
                                        })
                                    })
                            }
                        });
                    }
                })
                .catch(err => {
                    console.log(err)
                    return res.status(400).json({
                        message: 'An error occured!',
                        error: err
                    })
                });

        }
    }






module.exports.signin = (req, res) =>
    user.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user.length < 1) {
                console.log('Auth failed' + user);
                return res.status(401).json({
                    message: 'Auth failed',
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {

                    if (err) {
                        console.log('Auth failed');
                        return res.status(401).json({
                            message: 'Auth failed',
                            error: err
                        })
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user.email,
                                id: user.id
                            },
                            process.env.AUTH_KEY,
                            {
                                expiresIn: "1h"
                            })
                        console.log('Auth successfull');
                        return res.status(200).json({
                            message: 'Auth Successfull',
                            token: token
                        });

                    }
                    console.log('Auth failed');
                    return res.status(401).json({
                        message: 'Auth failed',
                    })
                })
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                message: 'An error occured!',
                error: err
            })
        })
