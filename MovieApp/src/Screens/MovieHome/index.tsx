import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import Styled from 'styled-components/native';

import BigCatalogList from './BigCatalogList';
import SubCatalogList from './SubCatalogList';

const Container = Styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;

const StyleButton = Styled.TouchableOpacity`
  padding: 8px;
`;
const Icon = Styled.Image`
`;

// interface Props {}

const MovieHome = ({ navigation }) => {
  //로그아웃시 AsyncStorage에 저장된 키 제거 후 Login 화면으로 이동
  const _logout = () => {
    AsyncStorage.removeItem('key');
    navigation.navigate('Login');
  };

  useEffect(() => {
    console.log("MovieHome useEffect")
    //navigation header 설정 (Stack.Screen의 options 설정)
    navigation.setOptions({
      headerRight: () => (
        <StyleButton
        onPress={() => {
          //로그아웃
          _logout();
        }}>
      <Icon source={require('~/Assets/Images/ic_logout.png')} />
     </StyleButton>
      ),
    });
  }, []);
  //YTS라는 서비스에서 제공하는 api를 사용하여 실제 영화정보를 앱에 표시
  return (
    <Container>
      {/* url과 onPress function을 매개변수로 전달 */}
      <BigCatalogList
        url="https://yts.lt/api/v2/list_movies.json?sort_by=like_count&order_by=desc&limit=5"
        onPress={(id: number) => {
          navigation.navigate('MovieDetail', {
            id,
          });
        }}
      />
      <SubCatalogList
        title="최신 등록순"
        url="https://yts.lt/api/v2/list_movies.json?sort_by=date_added&order_by=desc&limit=10"
        onPress={(id: number) => {
          navigation.navigate('MovieDetail', {
            id,
          });
        }}
      />
      <SubCatalogList
        title="평점순"
        url="https://yts.lt/api/v2/list_movies.json?sort_by=rating&order_by=desc&limit=10"
        onPress={(id: number) => {
          navigation.navigate('MovieDetail', {
            id,
          });
        }}
      />
      <SubCatalogList
        title="다운로드순"
        url="https://yts.lt/api/v2/list_movies.json?sort_by=download_count&order_by=desc&limit=10"
        onPress={(id: number) => {
          navigation.navigate('MovieDetail', {
            id,
          });
        }}
      />
    </Container>
  );
};

// interface INaviProps {
  // navigation: NavigationScreenProp<NavigationState>;
// }

// MovieHome.navigationOptions = ({ navigation }) => {
//   const logout = navigation.getParam('logout');
//   return {
//     title: 'MOVIEAPP',
//     headerTintColor: '#E70915',
//     headerStyle: {
//       backgroundColor: '#141414',
//       borderBottomWidth: 0,
//     },
//     headerTitleStyle: {
//       fontWeight: 'bold',
//     },
//     headerBackTitle: null,
//     headerRight: (
//       <StyleButton
//         onPress={() => {
//           if (logout && typeof logout === 'function') {
//             logout();
//           }
//         }}>
//         <Icon source={require('~/Assets/Images/ic_logout.png')} />
//       </StyleButton>
//     ),
//   };
// };

export default MovieHome;