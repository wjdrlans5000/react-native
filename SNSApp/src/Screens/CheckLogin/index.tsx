import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
// import { NavigationScreenProp, NavigationState } from 'react-navigation';

import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  background-color: #FEFFFF;
`;

interface Props {
  navigation: Object;
}

const CheckLogin = ({ navigation }: Props) => {
  AsyncStorage.getItem('key')
    .then(value => {
      if (value) {
        navigation.navigate('MainNavigator');
      } else {
        console.log('login')
        navigation.navigate('LoginNavigator');
      }
    })
    .catch((error: Error) => {
      console.log(error);
    });

  return <Container />;
};

// CheckLogin.navigationOptions = {
//   header: null,
// };

export default CheckLogin;
