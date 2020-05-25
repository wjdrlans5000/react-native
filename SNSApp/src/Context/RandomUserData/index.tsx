import React, { createContext, useState, useEffect } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import Styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

const Loading = Styled.View`
  flex: 1;
  background-color: #FEFFFF;
  align-items: center;
  justify-content: center;
`;

interface Props {
  cache?: boolean;
  children: JSX.Element | Array<JSX.Element>;
}

interface IRnadomUserData {
  getMyFeed: (number?: number) => Array<IFeed>;
}

const RandomUserDataContext = createContext<IRnadomUserData>({
  getMyFeed: (number: number = 10) => {
    return [];
  },
});

const RandomUserDataProvider = ({ cache, children }: Props) => {
  const [userList, setUserList] = useState<Array<IUserProfile>>([]);
  const [descriptionList, setDescriptionList] = useState<Array<string>>([]);
  const [imageList, setImageList] = useState<Array<string>>([]);

  const getCacheData = async (key: string) => {
    const cacheData = await AsyncStorage.getItem(key);
    if (cache === false || cacheData === null) {
      return undefined;
    }

    const cacheList = JSON.parse(cacheData);

    if (cacheList.length !== 25) {
      return undefined;
    }

    return cacheList;
  };
  const setCachedData = (key: string, data: Array<any>) => {
    AsyncStorage.setItem(key, JSON.stringify(data));
  };

  const setUsers = async () => {
    const cachedData = await getCacheData('UserList');
    if (cachedData) {
      setUserList(cachedData);
      return;
    }

    try {
      //유저리스트 가져오는 api가 없어져서 작동x
      // const response = await fetch('https://uinames.com/api/?amount=25&ext');
      // const data = await response.json();
      const data = [
        {
          name : '정기문',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문2',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문3',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문4',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문5',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문6',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문7',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문8',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문9',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문10',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문11',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문12',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문13',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문14',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문15',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문16',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문17',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문18',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문19',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문20',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문21',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문22',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문23',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문24',
          photo : 'https://source.unsplash.com/random/'
        },
        {
          name : '정기문25',
          photo : 'https://source.unsplash.com/random/'
        },
      
      ]
      setUserList(data);
      setCachedData('UserList', data);
    } catch (error) {
      console.log(error);
    }
  };

  const setDescriptions = async () => {
    const cachedData = await getCacheData('DescriptionList');
    console.log(cachedData);
    if (cachedData) {
      setDescriptionList(cachedData);
      return;
    }

    try {
      const response = await fetch(
        'https://opinionated-quotes-api.gigalixirapp.com/v1/quotes?rand=t&n=25'
      );
      const data = await response.json();

      let text = [];
      for (const index in data.quotes) {
        text.push(data.quotes[index].quote);
      }

      setDescriptionList(text);
      setCachedData('DescriptionList', text);
    } catch (error) {
      console.log(error);
    }
  };

  const setImages = async () => {
    const cachedData = await getCacheData('ImageList');
    if (cachedData) {
      if (Image.queryCache) {
        Image.queryCache(cachedData);
        cachedData.map((data: string) => {
          Image.prefetch(data);
        });
      }
      setImageList(cachedData);
      return;
    }

    setTimeout(async () => {
      try {
        const response = await fetch('https://source.unsplash.com/random/');
        const data = response.url;
        if (imageList.indexOf(data) >= 0) {
          setImages();
          return;
        }
        setImageList([...imageList, data]);
      } catch (error) {
        console.log(error);
      }
    }, 400);
  };

  useEffect(() => {
    console.log('setUser Effect / setDescriptions Effect');
    setUsers();
    setDescriptions();
  }, []);
  
  useEffect(() => {
    console.log('setImage Effect');
    if (imageList.length !== 25) {
      setImages();
    } else {
      setCachedData('ImageList', imageList);
    }
  }, [imageList]);

  const getImages = (): Array<string> => {
    let images: Array<string> = [];
    const count = Math.floor(Math.random() * 4);

    for (let i = 0; i <= count; i++) {
      images.push(imageList[Math.floor(Math.random() * 24)]);
    }

    return images;
  };
  const getMyFeed = (number: number = 10): Array<IFeed> => {
    let feeds: Array<IFeed> = [];
    for (let i = 0; i < number; i++) {
      const user = userList[Math.floor(Math.random() * 24)];
      feeds.push({
        name: user.name,
        photo: user.photo,
        description: descriptionList[Math.floor(Math.random() * 24)],
        images: getImages(),
      });
    }
    return feeds;
  };

  console.log(
    `${userList.length} / ${descriptionList.length} / ${imageList.length}`
  );
  return (
    <RandomUserDataContext.Provider
      value={{
        getMyFeed,
      }}>
        {/*  데이터가 없으면 ActivityIndicator로 화면에 로딩중 표시 */}
      {userList.length === 25 &&
      descriptionList.length === 25 &&
      imageList.length === 25 ? (
        children
      ) : (
        <Loading>
          <ActivityIndicator color="#D3D3D3" size="large" />
        </Loading>
      )}
    </RandomUserDataContext.Provider>
  );
};

export { RandomUserDataProvider, RandomUserDataContext };
