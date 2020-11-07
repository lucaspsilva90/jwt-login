var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://usuario_admin:nbwx6nqY0Pr1E0sp@cluster0.huse4.mongodb.net/desafio_sky?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });  

var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json({ type:"*/json"}));
app.use( (err,req,res,next) =>{
    if(SyntaxError){
        res.send({message:"É nessário enviar um json válido no corpo da requisição."})
        next();
    }
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.all('*', (req, res) => {
    res.status(404).send({ message: "Endpoint não encontrado." });
})

module.exports = app;
