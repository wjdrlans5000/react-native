import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import Styled from 'styled-components/native';

import BigCatalog from '~/Components/BigCatalog';

const Container = Styled.View`
    height: 300px;
    margin-bottom: 8px;
`;

interface Props {
  url: string;
  onPress: (id: number) => void;
}

const BigCatalogList = ({ url, onPress }: Props) => {
  //useState로 data 상태값 관리
  //IMovie 타입지정
  const [data, setData] = useState<Array<IMovie>>([]);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setData(json.data.movies);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <FlatList
        horizontal={true} //가로스크롤 허용
        pagingEnabled={true} //한화면에 보이도록 설정(이미지 하나만 보임)
        data={data}
        keyExtractor={(item, index) => {
          return `bigScreen-${index}`;
        }}
        renderItem={({ item, index }) => (
          //영화리스트 데이터 하나하나를 화면에 표시하기위한 컴포넌트
          <BigCatalog
            id={(item as IMovie).id}
            image={(item as IMovie).large_cover_image}
            year={(item as IMovie).year}
            title={(item as IMovie).title}
            genres={(item as IMovie).genres}
            onPress={onPress}
          />
        )}
      />
    </Container>
  );
};

export default BigCatalogList;