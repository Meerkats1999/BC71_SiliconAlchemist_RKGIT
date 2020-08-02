import SocketIOClient from 'socket.io-client';
import {showMessage, hideMessage} from 'react-native-flash-message';
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
import {channels} from '../constants/index';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
``;
var alertSound = new Sound('alert.mp3', Sound.MAIN_BUNDLE);

let sensorData = [];
setUpdateIntervalForType(SensorTypes.accelerometer, 100); // defaults to 100ms
accelerometer.subscribe(({x, y, z, timestamp}) => {
  sensorData.push(Math.sqrt(x * x + y * y + z * z) - 9.8);
  if (sensorData.length >= 30) {
    sendGyroData(sensorData);
    sensorData = [];
  }
});

export const url = 'https://speedwagon-service.herokuapp.com';
// export const url = 'http://192.168.31.125:3002';

let socket = SocketIOClient(url);
socket.on('connect', (a) => {
  console.log('connected', a);
  socket.on(channels.GYRO_RESULT, (message) => {
    console.log('gyro feedback', message);
    showMessage(message);
    alertSound.play();
  });
});

export const getLocationData = (cb) => {
  socket.on(channels.LOCATION, function (data) {
    // console.log('Received');
    cb(data);
  });
};

export const sendGyroData = (data) => {
  socket.emit(channels.GYRO_DATA, data);
};

export default socket;
