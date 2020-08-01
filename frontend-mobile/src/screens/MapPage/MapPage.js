import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Map from '../../components/Map/Map.js';

import CurrentPos from '../../../assets/img/current_marker.png';

const height = Dimensions.get('window').height;

export default () => {
  return (
    <View style={styles.container}>
      <Map>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  locationInput: {
    top: 70,
    alignSelf: 'center',
    height: height / 20,
    width: '90%',
    backgroundColor: '#e8e8e8',
    borderRadius: 2,
    position: 'absolute',
    zIndex: 9,
    alignItems: 'center',
    flexDirection: 'row',
    // background color must be set
  },
});
