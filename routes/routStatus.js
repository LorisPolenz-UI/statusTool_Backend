const stat = require('../models/statuses');
const Sequelize = require('sequelize');
const checkAuth = require('../auth/auth.js');
//getting value in table
module.exports.newEntr = (req, res) =>
    stat.findAll({
        limit: 1,
        where: {
            //your where conditions, or without them if you need ANY entry
        },
        order: [['createdAt', 'DESC']]
    }).then(entr => {
        console.log('The newest item has the ID ' + entr[0].id + '.')           // console.log(entr[0].id)
        return res.status(200).json({
            eintrag: entr
        });                                                         // res.send('[' + entr[0].id + ']' )
    })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                message: 'An error occured!',
                error: err
            })
        });



// getting all satuses
module.exports.allStatuses = (req, res, next) =>
    stat.findAll()
        .then(statuses => {
            console.log(statuses[0].dataValues);
            return res.status(200).json({
                statuses: statuses
            });
        })
        .catch(err => {
            console.log('A error occured :(');
            return res.status(400).json({
                message: 'An error occured!',
                error: err
            })
        })



//getting status by id
module.exports.status = (req, res) =>
    stat.findAll({
        limit: 1,
        where: {
            id: req.params.id
        }
    })
        .then(status => {
            console.log('We got the status with the ID ' + req.params.id + ".");
            return res.status(200).json({
                status: status
            });
        })
        .catch(err => {
            console.log('A error occured!');
            return res.status(400).json({
                message: 'An error occured!',
                error: err
            })
        })


//posting a status
module.exports.crstatus = (req, res, next) => {
    if (req.body.startingAt < req.body.endingAt) {
        stat.create({
            liveStatus: req.body.liveStatus,
            statusColor: req.body.statusColor,
            background: req.body.background,
            startingAt: req.body.startingAt,
            endingAt: req.body.endingAt,
            createdAt: new Date(),
            updatedAt: new Date()
        })
            .then(crstatus => {
                return res.status(200).json({
                    message: 'Status created',
                    status: crstatus
                });
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({
                    message: 'An error occured!',
                    error: err
                })
            })
    } else {
        console.log('Event needs to start before it ends!')
        return res.status(400).json({
            message: 'Event needs to start before it ends!',
        })
    }
} 
