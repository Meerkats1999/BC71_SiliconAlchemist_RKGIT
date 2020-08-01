let app = require('express')();
const express = require('express')
let server = require('http').Server(app);
let io = require('socket.io')(server);
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3002;


const fs = require('fs');
app.use(bodyParser.json())


var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
var cors = require('cors');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'matrim',
  api_key: '183547949416228',
  api_secret: 'XIdpSQr52PYMmkBR-lSbBVec20o'
});

app.use(fileUpload({
  limits: {fileSize: 50 * 1024 * 1024},
  abortOnLimit: true,
  useTempFiles: true,
  tempFileDir: './uploads'
}));
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var indexRouter = require('./routes/index');
var feedbackRouter = require('./routes/feedback');

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

server.listen(PORT, () => console.log("server started at ", PORT));
module.exports = app;
