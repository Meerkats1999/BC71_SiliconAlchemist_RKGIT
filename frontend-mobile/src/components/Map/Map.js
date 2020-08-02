import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
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
        <Polyline
          coordinates={[
            {latitude: 12.9728469, longitude: 77.6127155},
            {latitude: 12.9738174, longitude: 77.612936},
            {latitude: 12.9752977, longitude: 77.60748},
            {latitude: 12.9765402, longitude: 77.5996753},
          ]}
          // strokeColor="rgba(255,0,0,0.5)" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
          ]}
          strokeWidth={6}
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
