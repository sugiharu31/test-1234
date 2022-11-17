const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require("cookie-session");
const secret = "secretCuisine123";

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: [secret],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/', require('./routes/index'));
app.use('/signup', require('./routes/signup'));
app.use('/map', require('./routes/map'));
app.use('/signin', require('./routes/signin'));
app.use('/logout', require('./routes/logout'));
app.use('/postposition', require('./routes/postposition'));
app.use('/helpform', require('./routes/helpform'));
app.use('/helpuser', require('./routes/helpuser'));
app.use('/needhelpuser', require('./routes/needhelpuser'));
app.use('/mypage', require('./routes/mypage'));
app.use('/solvedform', require('./routes/solvedform'));
app.use('/deleteform', require('./routes/deleteform'));
app.use('/sh', require('./routes/sh'));
app.use('/test', require('./routes/test'));
app.use('/cancelform', require('./routes/cancelform'));
app.use('/sendmessage', require('./routes/sendmessage'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;