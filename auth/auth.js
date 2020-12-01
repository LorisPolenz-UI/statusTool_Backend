const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token);
        const decoded = jwt.verify(token, process.env.AUTH_KEY);
        req.userData = decoded;
        console.log('Auth successfull')
        next();

    } catch (err) {
        console.log('Auth Failed');
        return res.status(401).json({
            message: 'Auth Failed',
            error: err
        });
    }
};