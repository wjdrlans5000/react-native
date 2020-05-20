import React from 'react';
import { Dimensions } from 'react-native';
import Styled from 'styled-components/native';

const Container = Styled.TouchableOpacity``;
const CatalogImage = Styled.Image``;
const InfoContainer = Styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: flex-start;
`;
const LabelYear = Styled.Text`
  background-color: #E70915;
  color: #FFFFFF;
  padding: 4px 8px;
  margin-left: 4px;
  margin-bottom: 4px;
  font-weight: bold;
  border-radius: 4px;
`;
const SubInfoContainer = Styled.View`
`;
const Background = Styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #141414;
  opacity: 0.9;
`;
const LabelTitle = Styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #FFFFFF;
  padding: 8px 16px 4px 16px;
`;
const LabelGenres = Styled.Text`
  font-size: 12px;
  color: #FFFFFF;
  padding: 4px 16px 8px 16px;
`;

interface Props {
  id: number;
  image: string;
  year: number;
  title: string;
  genres: Array<string>;
  onPress?: (id: number) => void;
}

const BigCatalog = ({ id, image, year, title, genres, onPress }: Props) => {
  // 부모 컴포넌트로 부터 받은 Props를 화면에 표시
  return (
    <Container
    activeOpacity={1}
    onPress={() => {
      if (onPress && typeof onPress === 'function') {
          console.log('movieId:'+id)
          onPress(id);
        }
      }}>
      <CatalogImage
        source={{ uri: image }}
        style={{ width: Dimensions.get('window').width, height: 300 }} //style을 이용하여 이미지 사이즈설정 필수
      />
      <InfoContainer>
        <LabelYear>{year}년 개봉</LabelYear>
        <SubInfoContainer>
          <Background />
          <LabelTitle>{title}</LabelTitle>
          <LabelGenres>{genres.join(', ')}</LabelGenres>
        </SubInfoContainer>
      </InfoContainer>
    </Container>
  );
};

export default BigCatalog;