var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var clubRouter = require("./routes/club.js")

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/favicon.ico', (req, res) => res.status(204));


app.use('/', indexRouter);
app.use('/club', clubRouter)


app.get('*', function (req, res) {
    res.send('Joey: How YOU doin?? ', 404);
});
module.exports = app;
