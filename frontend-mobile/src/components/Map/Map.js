import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import CustomMarker from '../Marker/Marker';

import {customStyle} from './customStyle';

const Map = (props) => {
  const {dest} = useSelector((state) => state.dest);

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
          style={{height: 100}}
          coordinate={{
            latitude: props.region.latitude,
            longitude: props.region.longitude,
          }}
        />
        {dest === 'vfs' && (
          <Marker
            pinColor="green"
            style={{height: 100}}
            coordinate={{
              latitude: 12.979259,
              longitude: 77.602497,
            }}
          />
        )}
        {dest === 'vfs' && (
          <Polyline
            coordinates={[
              {longitude: 77.612797, latitude: 12.973132},
              {longitude: 77.612996, latitude: 12.973979},
              {longitude: 77.607948, latitude: 12.975275},
              {longitude: 77.608699, latitude: 12.97723},
              {longitude: 77.602497, latitude: 12.979259},
            ]}
            strokeColor="#94fc03" // fallback for when `strokeColors` is not supported by the map-provider
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
        )}
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
