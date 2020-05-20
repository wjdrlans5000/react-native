import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
// import {StackNavigationProp } from '@react-navigation/stack';;

import { Linking } from 'react-native';
import Styled from 'styled-components/native';

import Input from '~/Components/Input';
import Button from '~/Components/Button';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #141414;
  align-items: center;
  justify-content: center;
`;
const FormContainer = Styled.View`
  width: 100%;
  padding: 40px;
`;

const PasswordReset = Styled.Text`
  width: 100%;
  font-size: 12px;
  color: #FFFFFF;
  text-align: center;r
`;

// interface Props {}

const Login = ({navigation} ) => {
    console.log(navigation);
  return (
    <Container>
      <FormContainer>
        <Input style={{ marginBottom: 16 }} placeholder="이메일" />
        <Input
          style={{ marginBottom: 16 }}
          placeholder="비밀번호"
          secureTextEntry={true}
        />
        <Button
          style={{ marginBottom: 24 }}
          label="로그인"
          onPress={() => {
            console.log('test');
            AsyncStorage.setItem('key', 'JWT_KEY');
            navigation.navigate('MovieHome');
          }}
        />
        <PasswordReset
          onPress={() => {
              //해당url을 웹 브라우저로 호출
            Linking.openURL('https://dev-yakuza.github.io/ko/');
          }}>
          비밀번호 재설정
        </PasswordReset>
      </FormContainer>
    </Container>
  );
};

//투명 내비게이션 헤더 but v5에서는 이 네비게이션옵션을 지원하지않고 navigator에서 직접 헤더생성하거나 navigation.setOptions 사용

// Login.navigationOptions = {
//   title: 'MOVIEAPP',
//   headerTransparent: true,
//   headerTintColor: '#E70915',
//   headerTitleStyle: {
//     fontWeight: 'bold',
//   },
// };

export default Login;