import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import City from '../../../assets/img/city.jpg';

export default (props) => {
  const {navigation} = props;

  return (
    <View style={styles.loginContainer}>
      <ImageBackground style={styles.loginImage} source={City}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{color: 'white', fontSize: 20}}>LOGIN</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: 'black',
    bottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    height: '5%',
    width: '40%',
    borderRadius: 50,
    shadowOffset: {height: 100, width: 50},
    shadowColor: 'white',
    shadowOpacity: 1,
    elevation: 5,
  },
  loginImage: {
    height: '100%',
    width: '100%',
  },
  loginContainer: {
    height: '100%',
    width: '100%',
  },
});
