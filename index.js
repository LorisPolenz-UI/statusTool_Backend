const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const secureRoute = express();
const Sequelize = require('sequelize');
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const user = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(secureRoute);

const checkAuth = require('./auth/auth.js');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Routes
let routeStatus = require('./routes/routStatus.js');
let routeUser = require('./routes/user.js');
let routeValidate = require('./config/validate.js');
//let checkMail = routeValidate.checkMail;


//config status
app.get('/neweststatus', checkAuth, routeStatus.newEntr);
app.get('/statuses', checkAuth, routeStatus.allStatuses);
app.get('/status/:id', checkAuth, routeStatus.status);
app.post('/statuspost', checkAuth, routeStatus.crstatus);



//user / auth
app.post('/auth/register', [
  check('email').isEmail().normalizeEmail().escape().custom(value => {
    return routeValidate.checkMail(value).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use !!!');
      }
    });
  }),
  check('password').isLength({min: 13}).escape()
], routeUser.register);


app.post('/auth/signin', [
  check('email').isEmail().normalizeEmail().escape(),
  check('password').isLength({min: 13}).escape()
], routeUser.signin);





//EXPRESS
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://${HOST}:${PORT}`)
})


// Database
let db = require('./config/database.js');
db.authenticate()
  .then(() => console.log('Connected to databse'))
  .catch(err => console.log('Error: ' + err))