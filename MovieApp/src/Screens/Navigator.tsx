import React,{useRef } from 'react';
import {NavigationContainer} from '@react-navigation/native';;
import {createStackNavigator} from '@react-navigation/stack';
//createStackNavigator : 영화 리스트 화면에서 영화를 선택하면 영화의 상세 페이지를 보여주기 위해 사용할 예정, 화면을 쌓아서(stack) 표시
//NavigationContainer : 내비게이션을 다루기 위한 State, 링크 등을 관리한다. 마지막에 NavigationContainer로 내비게이션을 감싸서 제공
import CheckLogin from '~/Screens/CheckLogin';
import Login from '~/Screens/Login';
import MovieHome from '~/Screens/MovieHome';
import MovieDetail from '~/Screens/MovieDetail';  


//stack 내비게이터 생성
const Stack = createStackNavigator();

const StackNavi = () => {
  return (
    <Stack.Navigator
    initialRouteName="CheckLogin"
    screenOptions={{
      title : 'MOVIEAPP',
      headerStyle: {
        backgroundColor: '#141414',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen
        name="CheckLogin"
        component={CheckLogin}
      />
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="MovieHome"
        component={MovieHome}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
      />
    </Stack.Navigator>
  );
};

  
  export default () => {
    console.log("33");
    //로그인 체크
    return (
      <NavigationContainer>
          <StackNavi/>
      </NavigationContainer>

    );
  };