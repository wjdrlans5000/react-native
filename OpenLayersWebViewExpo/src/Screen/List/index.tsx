import React, { useContext, useState, useEffect } from 'react';
import {
    FlatList,
    Image,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
  } from 'react-native';

import Styled from 'styled-components/native';

import IconButton from '../../Components/IconButton';
import Input from '../../Components/Input';

import EmptyList from './EmptyList';
import NotEmptyList from './NotEmptyList';

const SearchBar = Styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Container = Styled(FlatList)`
`;

interface Props {
  navigation: Object;
}

interface dataProps {
    station_id : String;
    station_name : String;
    x : String;
    y : String;
}

const List = ({ navigation }: Props) => {
  const [dataList, setDataList] = useState<dataProps>();
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <SearchBar>
          <Input
            style={{ flex: 1, marginLeft: 8, height: 40, width: Dimensions.get('window').width -50 }}
            placeholder="검색"
          />
        </SearchBar>
      ), 
    });

    fetch('http://192.168.0.5:8080/queryTest')
    .then(response => response.json())
    .then(json => {
      console.log(json);
      setDataList(json);
    })
    .catch(error => {
      console.log(error);
    });

  }, []);

  return (
    //FlatList 컴포넌트
    <Container
      //리스트 뷰에 표시할 데이터의 배열
      data={dataList}
      //key값을 설정하기 위한 Props
      keyExtractor={(item, index) => {
        return `todo-${index}`;
      }}
      //주어진 배열에 데이터가 없을 경우 표시될 컴포넌트
      ListEmptyComponent={<EmptyList />}
      //주어진 배열에 데이터를 사용하여 반복적으로 표시될 컴포넌트
      renderItem={({ item, index }) => (
        //Item 컴포넌트를 반복하여 표시
        <NotEmptyList
          text={item as string}
          navigation = {navigation}
        />
      )}
      //표시할 데이터가 없는 경우, ListEmptyComponent의 컴포넌트가 화면에 표시된다.
      //하지만, 이 컴포넌트도 하나의 리스트 아이템으로 표시되기 때문에 전체화면으로 표시되지 않는다.
      //이 컴포넌트를 전체화면으로 표시하기 위해 flex:1을 설정하였다.
      contentContainerStyle={dataList != undefined && (dataList.length === 0 && { flex: 1 })}
    />
  );
};


export default List;
