import React from 'react';
import {
  PermissionsAndroid,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

export const cherryRed = '#fb5b5a';
export const lightPink = '#f35588';
export const boldBlue = '#9be3de';
export const lettuce = '#71a95a';
export const green = '#2dc937';
export const amber = '#e7b416';
export const red = '#cc3232';

let {width, height} = Dimensions.get('window');

export const ASPECT_RATIO = width / height;
export const LATITUDE = 0;
export const LONGITUDE = 0;
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const markerTypes = {
  car: 'car',
  truck: 'truck',
  bus: 'bus',
  bike: 'bike',
  trafficLightGreen: 'trafficLightGreen',
  trafficLightRed: 'trafficLightRed',
  trafficLightAmber: 'trafficLightAmber',
};

export const centerCoords = {
  lat: 12.973074,
  lng: 77.612366,
};
// export const url = 'http://10.99.7.214:3002';
export const url = 'http://rkserver.herokuapp.com';
const adder =
  'yarn add  git+https://git@github.com/react-native-community/react-native-maps.git\n';

export const channels = {
  LOCATION: 'LOCATIONS',
  GYRO_DATA:'GYRO_DATA',
  GYRO_RESULT:'GYRO_RESULT'
};

export async function Runtime_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'ReactNativeCode Location Permission',
        message: 'ReactNativeCode App needs access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
    }
  } catch (err) {
    console.warn(err);
  }
}
export const rootUrl = 'https://speedwagon-service.herokuapp.com';
