import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Label = Styled.Text``;
interface Props {}

const EmptyItem = ({  }: Props) => {
  return (
    <Container>
      <Label>조회된 목록이 없습니다.</Label>
    </Container>
  );
};
export default EmptyItem;