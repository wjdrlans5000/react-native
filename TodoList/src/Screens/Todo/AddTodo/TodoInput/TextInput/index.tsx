import React, { useContext } from 'react';
import Styled from 'styled-components/native';

import { TodoListContext } from '~/Context/TodoListContext';

const Input = Styled.TextInput`
  width: 100%;
  height: 40px;
  background-color: #FFF;
  padding: 0px 8px;
`;

interface Props {
  hideTodoInput: () => void;
}

const TextInput = ({ hideTodoInput }: Props) => {
  //TodoListContext의 addTodoList 사용
  const { addTodoList } = useContext<ITodoListContext>(TodoListContext);
  return (
    <Input
      autoFocus={true}
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="할일을 입력하세요!"
      returnKeyType="done"
      onSubmitEditing={({ nativeEvent }) => {
        //onSubmitEditing 함수는 키보드의 완료 버튼을 눌렀을시 호출되는 TextInput 함수
        //Context의 addTodoList 함수 수행하여 todoList state 값 설정하고 AsyncStorage에 저장
        addTodoList(nativeEvent.text);
        //setShowInput(false) 수행
        hideTodoInput();
      }}
    />
  );
};
export default TextInput;