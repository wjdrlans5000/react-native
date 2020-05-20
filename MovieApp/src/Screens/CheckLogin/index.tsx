import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
// import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { ActivityIndicator } from 'react-native';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  background-color: #141414;
  justify-content: center;
  align-items: center;
`;

interface Props {
  navigation: Object;
}

//내비게이션에 직접 연결되는 컴포넌트들은 기본적으로 navigation 이라는 Props를 전달받는다.
const CheckLogin = ({ navigation } : Props) => {
    console.log("checkLogin");
  AsyncStorage.getItem('key')
    .then(value => {
        console.log(value);
      if (value) {
        navigation.navigate('MovieHome');
      } else {
        navigation.navigate('Login');
      }
    })
    .catch((error: Error) => {
      console.log(error);
    });

  return (
    <Container>
        <ActivityIndicator size="large" color="#E70915" />
    </Container>
  );
};

// CheckLogin.navigationOptions = {
//   header: null,
// };

export default CheckLogin;