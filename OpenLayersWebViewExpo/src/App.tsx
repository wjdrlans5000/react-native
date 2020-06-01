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
import MyMap from "./Screen/map";




interface Props {}

const App = ({  }: Props) => {
  return (
  <>
    <StatusBar barStyle="default" />
    <Navigator />
  </>
  );
};

export default App;
