import io from 'socket.io-client';
import axios from 'axios';
// const url = 'http://localhost:3002';
const url = 'https://speedwagon-service.herokuapp.com'
let socket = io.connect(url);
// let socket=io.connect(url);

export const getClientLocationData = cb => {
  socket.on('CLIENT_LOCATION', function (data) {
    console.log('Received CLIENT_LOCATION', data);
    cb(data);
  });
};

export const getMultiLocationData = cb => {
  socket.on('LOCATIONS', function (data) {
    // console.log('Received Vehicle LOCATIONS', data);
    cb(data);
  });
};

export const getSignalData = cb => {
  socket.on('SIGNALS', function (data) {
    // console.log('Received Signal LOCATIONS', data);
    cb(data);
  })
}

export const sendSignal = async (signal = 'start') => {
  try {

    socket.emit('CONTROL', signal);
  } catch (eror) {
    console.log("Eror in signal", eror);
  }
}

export const listFeedback = async () => {
  try {
    let response = await axios.get(`${url}/feedback/all`);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default socket;
