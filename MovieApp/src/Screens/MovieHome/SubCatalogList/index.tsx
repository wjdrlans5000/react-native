import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import Styled from 'styled-components/native';

const Container = Styled.View`
  margin: 8px 0px;
`;
const InfoContainer = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
`;
const Title = Styled.Text`
  font-size: 16px;
  color: #FFFFFF;
  font-weight: bold;
`;
const CatalogContainer = Styled.View`
  height: 201px;
`;
const CatalogImageContainer = Styled.TouchableOpacity`
  padding: 0px 4px;
`;
const CatalogImage = Styled.Image`
`;

interface Props {
  title: string;
  url: string;
  onPress: (id: number) => void;
}
//기본적인 구성은 BigCatalogList와 동일
const SubCatalogList = ({ title, url, onPress }: Props) => {
  //useState사용하여 data 정의
  const [data, setData] = useState<Array<IMovie>>([]);
  //사용할 data 가져오기
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
      <InfoContainer>
        <Title>{title}</Title>
      </InfoContainer>
      <CatalogContainer>
        <FlatList
        // paginig Enabled를 사용하지 않음
          horizontal={true}
          data={data}
          keyExtractor={(item, index) => {
            return `catalogList-${(item as IMovie).id}-${index}`;
          }}
          renderItem={({ item, index }) => (
            <CatalogImageContainer
              activeOpacity={1}
              onPress={() => {
                onPress((item as IMovie).id);
              }}>
              <CatalogImage
                source={{ uri: (item as IMovie).large_cover_image }}
                style={{ width: 136, height: 201 }}
              />
            </CatalogImageContainer>
          )}
        />
      </CatalogContainer>
    </Container>
  );
};

export default SubCatalogList;