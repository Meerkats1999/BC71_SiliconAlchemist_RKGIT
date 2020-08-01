import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MainPage from '../MapPage/MapPage';
import Report from '../Report/Report';
import MapPage from '../MapPage/MapPage';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          }

          if (route.name === 'Report') {
            iconName = focused ? 'camera' : 'camera-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Map" component={MapPage} />
      <Tab.Screen
        name="Report"
        // options={{

        //   tabBarVisible: false,
        // }}
        component={Report}
      />
    </Tab.Navigator>
  );
};
