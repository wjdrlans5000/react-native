import React, { useState } from 'react';
import Styled from 'styled-components/native';
import Button from '~/Components/Button';

const Container = Styled.SafeAreaView`
    flex: 1;
`;

const TitleContainer = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TitleLabel = Styled.Text`
    font-size: 24px;
`;

const CountContainer = Styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
`;
const CountLabel = Styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

const ButtonContainer = Styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
`;

interface Props {
  title?: string;
  initValue: number;
}

const Counter = ({ title, initValue } : Props) => {
      //initValue를 초기값으로 State 생성 타입은 number
  //useState 함수를 호출하면 배열이 반환되는데, 여기서 첫번째 원소는 현재 상태, 두번째 원소는 Setter 함수
  //useState 함수 호출시 비구조화 할당을 통해 만들어진 state 값은 count 변수에 할당하고 Setter 함수는 setCount 변수에 할당
  //count 변수는 원래 상수이므로 변경이 불가능한 값이지만 state는 컴포넌트 안에서 수정이 가능.
  //따라서 useState은 해당 변수를 변경하기 위해 Setter 함수를 제공.
  //const [변수명, 변수를 변경할 setter 함수] = useState<State의 타입>(초기값);
  const [count, setCount] = useState<number>(initValue); 

  return (
    <Container>
      {title && (
        <TitleContainer>
          <TitleLabel>{title}</TitleLabel>
        </TitleContainer>
      )}
      <CountContainer>
        <CountLabel>{count}</CountLabel>
      </CountContainer>
      <ButtonContainer>
          {/* setCount 함수를 사용하여 State인 count값을 변경 */}
        <Button iconName="plus" onPress={() => setCount(count + 1)} /> 
        <Button iconName="minus" onPress={() => setCount(count - 1)} /> 
      </ButtonContainer>
    </Container>
  );
};

export default Counter;