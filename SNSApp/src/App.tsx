import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { StatusBar } from 'react-native';

import Navigator from '~/Screens/Navigator';
import { RandomUserDataProvider } from '~/Context/RandomUserData';
import SplashScreen from 'react-native-splash-screen'

interface Props {}

const App = ({  }: Props) => {
  useEffect(() => { SplashScreen.hide(); }, []);
  return (
    <RandomUserDataProvider cache={true}>
      <StatusBar barStyle="default" />
      <Navigator />
    </RandomUserDataProvider>
  );
};
export default App;
