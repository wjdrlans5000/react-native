import React from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';;
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MyMap from './map/';
import List from './List/';
import Camera from '../Components/Camera';
import ImagePicker from '../Components/Camera/ImagePicker';


//stack 내비게이터 생성
const Stack = createStackNavigator();
//Drawer 내비게이터 생성
const DrawNavi = createDrawerNavigator();
//BottomTab 내비게이터 생성
const BottomTab = createBottomTabNavigator();

const MyFeedTabStackNavi = createStackNavigator();
const ListTabStackNavi = createStackNavigator();
const UploadTabStackNavi = createStackNavigator();
const NotificationTabStackNavi = createStackNavigator();
const ProfileTabStackNavi = createStackNavigator();

const MyMapTabStackNavigator = () => {
  console.log('myMapStackNavigator')
  return (
    // <SafeAreaProvider>
      <MyFeedTabStackNavi.Navigator>
        <MyFeedTabStackNavi.Screen
          name="MyMap"
          component={MyMap}
          />
        <MyFeedTabStackNavi.Screen
          name="Camera"
          component={Camera}
          />
        <MyFeedTabStackNavi.Screen
          name="ImagePicker"
          component={ImagePicker}
          />
      </MyFeedTabStackNavi.Navigator>
    // </SafeAreaProvider>

  )
}
const ListTabStackNavigator = () => {
  return (
    <ListTabStackNavi.Navigator>
      <ListTabStackNavi.Screen
        name="List"
        component={List}
        />
    </ListTabStackNavi.Navigator>

  )
}
// const UploadTabStackNavigator = () => {
//   return (
//     <UploadTabStackNavi.Navigator>
//       <UploadTabStackNavi.Screen
//         name="Upload"
//         component={Upload}
//         options={{
//           headerShown: false,
//         }}/>
//     </UploadTabStackNavi.Navigator>

//   )
// }
// const NotificationTabStackNavigator = () => {
//   return (
//     <NotificationTabStackNavi.Navigator>
//       <NotificationTabStackNavi.Screen
//         name="Notification"
//         component={Notification}
//         options={{
//           headerShown: false,
//         }}/>
//     </NotificationTabStackNavi.Navigator>

//   )
// }
// const ProfileTabStackNavigator = () => {
//   return (
//     <ProfileTabStackNavi.Navigator>
//       <ProfileTabStackNavi.Screen
//         name="Profile"
//         component={Profile}/>
//     </ProfileTabStackNavi.Navigator>

//   )
// }

const MainNavigator = () =>{
  return (
    <DrawNavi.Navigator
      // drawerContent={Drawer}
      drawerType='slide'
      drawerPosition='right'
      >
    <DrawNavi.Screen
      name="BottomTabNavi"
      component={BottomTabNavi}
      />
    </DrawNavi.Navigator>
    )
}



const BottomTabNavi = () =>{
  console.log('bottomTab')
  return (
    <BottomTab.Navigator
      initialRouteName="MyMapTabStack"
    >
      <BottomTab.Screen
        name="MyMapTabStack"
        component={MyMapTabStackNavigator}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Image
              source={
                focused
                  ? require('../assets/Tabs/ic_home.png')
                  : require('../assets/Tabs/ic_home_outline.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ListTabStack"
        component={ListTabStackNavigator}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Image
              source={
                focused
                  ? require('../assets/Tabs/ic_search.png')
                  : require('../assets/Tabs/ic_search_outline.png')
              }
            />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="UploadTabStack"
        component={UploadTabStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/ic_add.png')
                  : require('~/Assets/Images/Tabs/ic_add_outline.png')
              }
            />
          ),
        }}
      /> */}
      {/* <BottomTab.Screen
        name="NotificationTabStack"
        component={NotificationTabStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/ic_favorite.png')
                  : require('~/Assets/Images/Tabs/ic_favorite_outline.png')
              }
            />
          ),
        }}
      /> */}
      {/* <BottomTab.Screen
        name="ProfileTabStack"
        component={ProfileTabStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/ic_profile.png')
                  : require('~/Assets/Images/Tabs/ic_profile_outline.png')
              }
            />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  )

};




export default () => {
  console.log("33");
  //로그인 체크
  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MainNavigator"
            >
          <Stack.Screen
            name="MainNavigator"
            component={MainNavigator}
            options={{
              headerShown: false,
            }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
};