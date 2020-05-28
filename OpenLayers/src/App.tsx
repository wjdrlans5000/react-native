/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect, useRef } from 'react';
import Styled from 'styled-components/native';
import MyMap from "./Screen/map";




interface Props {}

const App = ({  }: Props) => {
  return (
  <>
    <MyMap />
  </>
  );
};

export default App;
