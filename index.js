import { AppRegistry } from 'react-native';
import React from 'react';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/store/configStore';
import App from './App.js';

AppRegistry.registerComponent(appName, () => App);