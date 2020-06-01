import React, {useEffect, useState} from 'react';
import {Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const geoLocation = ({  }) => {
  const [currentPosition, setPosition] = useState({});
  const getCurrentLocation = () => {
    //현재우치의 위도 경도 가져오기
    Geolocation.getCurrentPosition(
      position => {
        setPosition(position.coords);
        console.log(position.coords);
      },
      error => {
        showError('위치 정보를 가져오는데 실패하였습니다.');
      }
    );
  };

  const showError = (message: string): void => {
    setTimeout(() => {
      Alert.alert(message);
    }, 500);
  };

  //두번째 매개변수 빈 배열로써 화면이 업데이트 될때는 호출하지 않음
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (currentPosition);

};

export default geoLocation;