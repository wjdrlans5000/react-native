/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, {useEffect} from 'react';
import { StatusBar } from 'react-native';
import Navigator from '~/Screens/Navigator';
import SplashScreen from 'react-native-splash-screen'
import 'react-native-gesture-handler';

interface Props {}


const App = ({  }: Props) => {
  console.log('11')
  // 전체 컴포넌트 로드 후 Splash 스크린 hide
  useEffect(() => {
    console.log('useEffect::Splash Hide')
    SplashScreen.hide();
  },[]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Navigator />
    </>
  );
};

export default App;
