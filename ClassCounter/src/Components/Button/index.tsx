import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.TouchableOpacity``; //onPress의 Props(속성값)을 가지고 있음.
const Icon = Styled.Image``;

//타입스크립트로 컴포넌트 Props의 타입을 지정함으로써 타입에 대한 버그와 에러를 줄임
interface Props {
  iconName: 'plus' | 'minus'; // 필수항목 (":") 설정하지 않으면 에러발생
  onPress?: () => void; // 선택항목 ("?:") 반환값이 없는 함수
}

const Button = ({ iconName, onPress }: Props) => {
  return (
    <Container onPress={onPress}>
      <Icon
        source={
          iconName === 'plus'
            ? require('~/Assets/Images/add.png')
            : require('~/Assets/Images/remove.png')
        }
      />
    </Container>
  );
};
export default Button;