process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').load();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var resources = require('./resources');
var mailer = require('express-mailer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', {
  layout: false
});

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL
);

mailer.extend(app, {
  from: 'UBI Raffle <info@ubiraffle.org>', 
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'info@ubiraffle.org',
    pass: process.env.EMAIL_SECRET
  }
});

if (process.env.NODE_ENV === 'production') {
  app.locals.baseUrl = 'http://www.ubiraffle.org'
} else if (process.env.NODE_ENV === 'development') {
  app.locals.baseUrl = 'http://localhost:3000'
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', resources.index);
app.get('/templates/:name', resources.templates);

// require('./resources/users')(app);
require('./resources/entrants')(app);

app.get('/*', resources.index);

module.exports = app;
