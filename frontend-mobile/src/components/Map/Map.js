import React, {useEffect, useState, useCallback} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import {customStyle} from './customStyle';

const Map = (props) => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(({coords}) => {
      setRegion({
        ...region,
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
    });
  }, []);

  const onRegionChange = useCallback(
    (region) => {
      setRegion(region);
    },
    [region],
  );

  return (
    <View style={styles.container}>
      <MapView
        onMapReady={() => {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
        }}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation={true}
        showsCompass={true}
        region={region}
        onRegionChangeComplete={onRegionChange}
        customMapStyle={customStyle}
      />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    height: '100%',
    zIndex: 1,
  },
});

export default Map;
