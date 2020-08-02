/**
 * @format
 */
import React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './src/redux/store';

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));
