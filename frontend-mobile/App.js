import * as React from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainPage from './src/screens/MainPage/MainPage';
import Login from './src/screens/Login/Login';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={MainPage}
        />
      </Stack.Navigator>
      <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="black"
        //Background color of statusBar
        translucent={false}
        //allowing light, but not detailed shapes
        networkActivityIndicatorVisible={true}
      />
    </NavigationContainer>
  );
}

export default App;
