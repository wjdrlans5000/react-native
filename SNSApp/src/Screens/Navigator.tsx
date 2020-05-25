import React from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';;
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import CheckLogin from '~/Screens/CheckLogin';
import Login from '~/Screens/Login';
import PasswordReset from '~/Screens/PasswordReset';
import Signup from '~/Screens/Signup';

import MyFeed from '~/Screens/MyFeed';
import Feeds from '~/Screens/Feeds';
import FeedListOnly from '~/Screens/FeedListOnly';
import Upload from '~/Screens/Upload';
import Notification from '~/Screens/Notification';
import Profile from '~/Screens/Profile';
import Drawer from '~/Screens/Drawer';


//stack 내비게이터 생성
const Stack = createStackNavigator();
//Drawer 내비게이터 생성
const DrawNavi = createDrawerNavigator();
//BottomTab 내비게이터 생성
const BottomTab = createBottomTabNavigator();

const MyFeedTabStackNavi = createStackNavigator();
const FeedsTabStackNavi = createStackNavigator();
const UploadTabStackNavi = createStackNavigator();
const NotificationTabStackNavi = createStackNavigator();
const ProfileTabStackNavi = createStackNavigator();

const MyFeedTabStackNavigator = () => {
  return (
    <MyFeedTabStackNavi.Navigator>
      <MyFeedTabStackNavi.Screen
        name="MyFeed"
        component={MyFeed}
        />
    </MyFeedTabStackNavi.Navigator>

  )
}
const FeedsTabStackNavigator = () => {
  return (
    <FeedsTabStackNavi.Navigator>
      <FeedsTabStackNavi.Screen
        name="Feeds"
        component={Feeds}
        />
    </FeedsTabStackNavi.Navigator>

  )
}
const UploadTabStackNavigator = () => {
  return (
    <UploadTabStackNavi.Navigator>
      <UploadTabStackNavi.Screen
        name="Upload"
        component={Upload}
        options={{
          headerShown: false,
        }}/>
    </UploadTabStackNavi.Navigator>

  )
}
const NotificationTabStackNavigator = () => {
  return (
    <NotificationTabStackNavi.Navigator>
      <NotificationTabStackNavi.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
        }}/>
    </NotificationTabStackNavi.Navigator>

  )
}
const ProfileTabStackNavigator = () => {
  return (
    <ProfileTabStackNavi.Navigator>
      <ProfileTabStackNavi.Screen
        name="Profile"
        component={Profile}/>
    </ProfileTabStackNavi.Navigator>

  )
}

const MainNavigator = () =>{
  return (
    <DrawNavi.Navigator
      drawerContent={Drawer}
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
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      <BottomTab.Screen
        name="MyFeedTabStack"
        component={MyFeedTabStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/ic_home.png')
                  : require('~/Assets/Images/Tabs/ic_home_outline.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="FeedsTabStack"
        component={FeedsTabStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/ic_search.png')
                  : require('~/Assets/Images/Tabs/ic_search_outline.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
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
      />
      <BottomTab.Screen
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
      />
      <BottomTab.Screen
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
      />
    </BottomTab.Navigator>
  )

};




export default () => {
  console.log("33");
  //로그인 체크
  return (
    <NavigationContainer>
        <Stack.Navigator
          initialRouteName="CheckLogin"
        >
        <Stack.Screen
          name="CheckLogin"
          component={CheckLogin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginNavigator"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PasswordReset}
        />
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};