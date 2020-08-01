import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Map from '../../components/Map/Map.js';
import {getLocationData} from '../../API/index';
import CurrentPos from '../../../assets/img/current_marker.png';
// import GyroMonitor from '../../components/GyroMonitor';

const height = Dimensions.get('window').height;

export default React.memo(() => {
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState({
    latitude: 12.9729553,
    longitude: 77.6104474,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // const onRegionChange = (region) => {
  //   setRegion(region);
  // };

  useEffect(() => {
    getLocationData((data) => data && setMarkers(data.vehicles));
  }, []);

  return (
    <View style={styles.container}>
      <Map
        markers={markers}
        region={region}
        currentPos={CurrentPos}
        // onRegionChange={onRegionChange}
      >
        <TouchableOpacity style={styles.locationInput}>
          <Image
            source={CurrentPos}
            style={{height: 25, width: 20, margin: '1%'}}
          />
          <Text style={{margin: '3%', fontFamily: 'Roboto', fontSize: 14}}>
            Your Current Location
          </Text>
        </TouchableOpacity>
      </Map>
      <View style={{position: 'absolute', zIndex: 1, bottom: 0}}>
        {/* <GyroMonitor/> */}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  locationInput: {
    top: 25,
    alignSelf: 'center',
    height: height / 20,
    width: '90%',
    backgroundColor: '#e8e8e8',
    borderRadius: 50,
    position: 'absolute',
    zIndex: 9,
    alignItems: 'center',
    flexDirection: 'row',
    // background color must be set
  },
});
