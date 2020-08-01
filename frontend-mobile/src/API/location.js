import Geolocation from '@react-native-community/geolocation';
import {channels} from '../constants/index';

export const getLocation = async (cb) => {
  try {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Current position', position);
        cb(position);
      },
      (error) => console.log('Error in getting location', error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 5,
        distanceFilter: 10,
      },
    );
  } catch (error) {
    console.log('Error in getting location', error);
  }
};

export const watchPosition = async (cb) => {
  Geolocation.watchPosition(
    cb,
    () => console.log('Error in watchiing position'),
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 5,
      distanceFilter: 10,
    },
  );
};

export const broadcastLocation = async (location, socket, clientID) => {
  const {latitude, longitude} = location.coords;
  let currentLocation = {
    coords: {lat: latitude, lng: longitude},
    id: clientID,
    type: 'client',
    timestamp: Math.floor(Date.now() / 1000),
  };
  console.log('Broadcasting ', currentLocation);
  socket.emit(channels.LOCATION, currentLocation);
};
