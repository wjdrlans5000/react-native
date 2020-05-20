import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Styled from 'styled-components/native';

import BigCatalog from '~/Components/BigCatalog';
import CastList from './CastList';
import ScreenShotList from './ScreenShotList';

const Container = Styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;
const LoadingContainer = Styled.View`
  flex: 1;
  background-color: #141414;
  align-items: center;
  justify-content: center;
`;

const ContainerTitle = Styled.Text`
  font-size: 16px;
  color: #FFFFFF;
  font-weight: bold;
  padding: 24px 16px 8px 16px;
`;
const DescriptionContainer = Styled.View``;
const Description = Styled.Text`
  padding: 0 16px;
  color: #FFFFFF;
`;
const SubInfoContainer = Styled.View``;
const InfoContainer = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
`;
const LabelInfo = Styled.Text`
  color: #FFFFFF;
`;

interface Props {
//   navigation: NavigationScreenProp<NavigationState>;
}

const MovieDetail = ({ route, navigation }) => {
  console.log('movieDetail')
  const [data, setData] = useState<IMovieDetail>();

  useEffect(() => {
    //v5 부터는 getParam을 지원하지 않음
    //route 인자를 통해 param 가져옴
    const id = route.params.id;
    console.log(id)
    fetch(
      `https://yts.lt/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setData(json.data.movie);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return data ? (
    <Container>
      <BigCatalog
        id={data.id}
        image={data.large_cover_image}
        year={data.year}
        title={data.title}
        genres={data.genres}
      />
      <SubInfoContainer>
        <ContainerTitle>영화 정보</ContainerTitle>
        <InfoContainer>
          <LabelInfo>{data.runtime}분</LabelInfo>
          <LabelInfo>평점: {data.rating}</LabelInfo>
          <LabelInfo>좋아요: {data.like_count}</LabelInfo>
        </InfoContainer>
      </SubInfoContainer>
      <DescriptionContainer>
        <ContainerTitle>줄거리</ContainerTitle>
        <Description>{data.description_full}</Description>
      </DescriptionContainer>
      {/* 배우 컴포넌트 */}
      {data.cast && <CastList cast={data.cast} />}
      {/* 스크린샷 컴포넌트 */}
      <ScreenShotList
        images={[
          data.large_screenshot_image1,
          data.large_screenshot_image2,
          data.large_screenshot_image3,
        ]}
      />
    </Container>
  ) : (
    <LoadingContainer>
      <ActivityIndicator size="large" color="#E70915" />
    </LoadingContainer>
  );
};

// MovieDetail.navigationOptions = {
//   title: 'MOVIEAPP',
//   headerTintColor: '#E70915',
//   headerStyle: {
//     backgroundColor: '#141414',
//     borderBottomWidth: 0,
//   },
//   headerTitleStyle: {
//     fontWeight: 'bold',
//   },
// };
export default MovieDetail;