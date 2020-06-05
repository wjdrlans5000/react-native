/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import Navigator from './Screen/Navigator';
import {SelectListContextProvider} from  './Context'


const App = () => {
  return (
  <SelectListContextProvider>
    <StatusBar barStyle="default" />
    <Navigator />
  </SelectListContextProvider>
  );
};

export default App;
