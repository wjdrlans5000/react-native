import React, { useState } from 'react';

import AddButton from './AddButton';
import TodoInput from './TodoInput';

interface Props {}

const AddTodo = ({  }: Props) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  return (
    <>
      {/* showInput을 true로 설정 */}
      <AddButton onPress={() => setShowInput(true)} /> 
      {/* 조건 && expression 조건이 true일 경우 && 이후에 위치한 expression 반환 false면 무시 */}
      {showInput && <TodoInput hideTodoInput={() => setShowInput(false)} />}  
    </>
  );
};
export default AddTodo;