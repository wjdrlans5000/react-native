import React from 'react';
import Styled from 'styled-components/native';

import Background from './Background';
import TextInput from './TextInput';

const Container = Styled.KeyboardAvoidingView`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: flex-end;
`;

interface Props {
  hideTodoInput: () => void;
}

const TodoInput = ({ hideTodoInput }: Props) => {
  return (
    <Container behavior="padding">
      {/* 배경 컴포넌트로 단순 검은색 투명도 설정하는 컴포넌트, 배경 클릭시 setShowInput(false) 수행하도록 인자 전달 */}
      <Background onPress={hideTodoInput} />
      {/* 할일 텍스트를 입력받을 컴포넌트 hideTodoInput에 setShowInput(false) */}
      <TextInput hideTodoInput={hideTodoInput} />
    </Container>
  );
};
export default TodoInput;