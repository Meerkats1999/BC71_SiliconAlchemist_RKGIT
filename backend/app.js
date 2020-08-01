let app = require('express')();
const express = require('express')
let server = require('http').Server(app);
let io = require('socket.io')(server);
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3002;

const ioListeners = require('./ioListeners');

const fs = require('fs');

let vehicle_data =  JSON.parse(fs.readFileSync('fcd_output.json'));
let light_data =  JSON.parse(fs.readFileSync('signal_output.json'));
ioListeners.setSimData(vehicle_data, light_data);
app.use(bodyParser.json())

io.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);

  ioListeners.clientLocationBroadcaster(socket);
  ioListeners.multiLocationBroadcaster(socket);
  ioListeners.requestSimulationData(socket);
  ioListeners.setSimulationHandler(socket);

  socket.on('disconnect', function () {
    console.log('disconnected', this.id);
  });
});

var stdin = process.openStdin();


stdin.addListener("data", function (data) {
  const value = data.toString().trim()
  switch (value) {
    case "1":
        ioListeners.showState()
      break;
    case '2':
        ioListeners.resetSimulation()
      break;
    case '3':
        ioListeners.startSimulation()
        ioListeners.showState()
      break;
    case '4': 
      // ioListeners.fetchSimulationData();
      break;
    case '5':
        ioListeners.pauseSimulation();
        break;
  
    default:
        console.log("\n Enter proper state:");
        break;
  }
});

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
app.use('/', indexRouter);
app.use('/feedback', feedbackRouter);

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
