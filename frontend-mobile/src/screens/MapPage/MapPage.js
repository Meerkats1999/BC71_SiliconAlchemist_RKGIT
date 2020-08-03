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

const speed = [
  {
    current: 40,
    suggested: 31,
  },
  {
    current: 47,
    suggested: 31,
  },
  {
    current: 39,
    suggested: 31,
  },
  {
    current: 36,
    suggested: 33,
  },
  {
    current: 34,
    suggested: 34,
  },
  {
    current: 35,
    suggested: 37,
  },
  {
    current: 32,
    suggested: 42,
  },
  {
    current: 35,
    suggested: 41,
  },
  {
    current: 40,
    suggested: 31,
  },
];

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
  const [speedMeter, setSpeedmeter] = useState({
    current: 0,
    suggested: 0,
    overSpeed: false,
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
    let i = 0;
    getLocationData((data) => data && setMarkers(data.vehicles));
    setInterval(() => {
      setSpeedmeter((prev) => {
        if (speed[i].current > speed[i].suggested) {
          return {
            ...prev,
            current: speed[i].current,
            suggested: speed[i].suggested,
            overSpeed: true,
          };
        }
        return {
          ...prev,
          current: speed[i].current,
          suggested: speed[i].suggested,
          overSpeed: false,
        };
      });
      i++;
      if (i === speed.length - 1) i = 0;
    }, 3000);
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
      <TouchableOpacity
        style={{
          ...styles.speed,
          borderColor: speedMeter.overSpeed ? '#ff2b41' : '#14ff54',
          backgroundColor: speedMeter.overSpeed ? '#ff707f' : '#91ffaf',
        }}>
        <Text style={{fontSize: 35, fontWeight: 'bold'}}>
          {speedMeter.current}
        </Text>
        <Text style={{fontWeight: 'bold'}}>Kmph</Text>
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
  speed: {
    backgroundColor: 'white',
    zIndex: 3,
    height: 70,
    width: 80,
    top: '25%',
    position: 'absolute',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderWidth: 4,
    borderColor: '#14ff54',
    backgroundColor: '#91ffaf',
    borderLeftWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
