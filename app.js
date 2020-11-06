var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
  
mongoose.connect('mongodb+srv://usuario_admin:nbwx6nqY0Pr1E0sp@cluster0.huse4.mongodb.net/desafio_sky?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });  

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json({ type:"*/json"}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
