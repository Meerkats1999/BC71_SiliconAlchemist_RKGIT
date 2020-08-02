import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import CustomMarker from '../Marker/Marker';

import {customStyle} from './customStyle';

const Map = (props) => {
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
        // showsUserLocation={true}
        rotateEnabled={false}
        initialRegion={props.region}
        customMapStyle={customStyle}>
        {props.markers.length > 0 &&
          props.markers.map((marker) => (
            <CustomMarker key={marker.id} marker={marker} />
          ))}
        <Marker
          image={props.currentPos}
          coordinate={{
            latitude: props.region.latitude,
            longitude: props.region.longitude,
          }}
        />
      </MapView>
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

export default React.memo(Map);