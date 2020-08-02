import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Animated,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Dest from '../../assets/img/dest_pin.png';
import DropDownPicker from 'react-native-dropdown-picker';
import {selectDestination} from '../redux/Destination/destination.actions';
import {connect, useSelector} from 'react-redux';

const height = Dimensions.get('window').height;

const RouteSelection = (props) => {
  const {dest} = useSelector((state) => state.dest);
  const slideUp = useRef(new Animated.Value(1)).current;
  const [desti, setDesti] = useState('');

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

  const submitHandler = () => {
    props.selectDestination(desti.toLowerCase());
    props.onRequestClose();
  };

  return (
    <View style={styles.directionOption}>
      <Animated.View
        style={{
          ...styles.locationInput,
          translateY: slideUp.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -500],
          }),
        }}>
        <Image source={Dest} style={{height: 25, width: 20, margin: '1%'}} />
        <TextInput
          placeholder="Enter Destination"
          value={desti}
          onChangeText={(e) => setDesti(e)}
        />
      </Animated.View>
      {dest === 'vfs' && (
        <TouchableOpacity
          style={styles.option}
          onPress={() => props.selectDestination('')}>
          <Text style={{color: 'white', fontSize: 25}}>Clear Selection</Text>
        </TouchableOpacity>
      )}
      {desti.toLowerCase() === 'vfs' && (
        <TouchableOpacity style={styles.option} onPress={submitHandler}>
          <Text style={{color: 'white', fontSize: 25}}>
            VFS Global Services, Bangalore
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  directionOption: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  locationInput: {
    top: 25,
    alignSelf: 'center',
    height: height / 20,
    width: '90%',
    backgroundColor: '#e8e8e8',
    borderRadius: 50,
    zIndex: 9,
    alignItems: 'center',
    flexDirection: 'row',
    // background color must be set
  },
  destInput: {
    width: '70%',
    padding: '10%',
  },
  option: {
    top: '10%',
    padding: '3%',
    width: '95%',
    backgroundColor: '#303030',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
});

const mapDispatchToProps = (dispatch) => ({
  selectDestination: (value) => dispatch(selectDestination(value)),
});

export default connect(null, mapDispatchToProps)(RouteSelection);
