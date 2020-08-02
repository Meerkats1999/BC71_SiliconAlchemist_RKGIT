import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';
import Map from '../../components/Map/Map.js';
import {getLocationData} from '../../API/index';
import {reportEmergency} from '../../API/upload';
import CurrentPos from '../../../assets/img/current_marker.png';
import GyroMonitor from '../../components/GyroMonitor';
// import GyroMonitor from '../../components/GyroMonitor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import Modal from '../../components/Modal/Modal';
import RouteSelection from '../../Modals/RouteSelection';

const height = Dimensions.get('window').height;

export default React.memo(() => {
  const {dest} = useSelector((state) => state.dest);
  const slideUp = useRef(new Animated.Value(1)).current;
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState({
    latitude: 12.973132,
    longitude: 77.612797,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [visible, setVisible] = useState(false);

  const appearAnimation = () => {
    Animated.timing(slideUp, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    appearAnimation();
  }, []);

  const onRouteSelectionHandelr = () => {
    Animated.timing(slideUp, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setVisible(true));
  };

  // const onRegionChange = (region) => {
  //   setRegion(region);
  // };
  const onRequestClose = () => {
    setVisible(false);
    appearAnimation();
  };

  const sendEmergency = () => {
    Geolocation.getCurrentPosition(({coords}) => {
      reportEmergency(region.latitude, region.longitude);
    });
  };

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
        <Animated.View
          style={{
            ...styles.locationInput,
            translateY: slideUp.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -500],
            }),
          }}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => onRouteSelectionHandelr()}>
            <Image
              source={CurrentPos}
              style={{height: 25, width: 20, margin: '1%'}}
            />
            <Text style={{margin: '3%', fontFamily: 'Roboto', fontSize: 14}}>
              {dest === 'vfs'
                ? 'VFS Global Services, Bangalore'
                : 'Set Destination'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Map>
      <View style={styles.gyro}>
        <GyroMonitor />
      </View>
      <TouchableOpacity style={styles.report} onPress={() => sendEmergency()}>
        <Ionicons name="ios-warning-outline" size={height / 25} color="red" />
      </TouchableOpacity>
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <RouteSelection onRequestClose={onRequestClose} />
      </Modal>
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
  gyro: {
    zIndex: 1,
    bottom: 0,
    position: 'absolute',
    width: 50,
  },
  report: {
    zIndex: 99,
    position: 'absolute',
    top: '15%',
    padding: '2%',
    borderWidth: 3,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: 10,
  },
});
