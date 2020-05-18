import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import Styled from 'styled-components/native';

import { TodoListContext } from '~/Context/TodoListContext';

import EmptyItem from './EmptyItem';
import TodoItem from './TodoItem';

const Container = Styled(FlatList)`
`;
interface Props {}

const TodoList = ({  }: Props) => {
  //context를 사용하기 위해 useContext 함수 사용
  //최상위 컴포넌트 TodoListContextProvider 에서 useEffect를 통해 initData가  호출되어 TodoListContext에 AsyncStorage에 저장된 todoList 값 셋팅
  const { todoList, removeTodoList } = useContext<ITodoListContext>(
    TodoListContext
  );
  return (
    //FlatList 컴포넌트
    <Container
      //리스트 뷰에 표시할 데이터의 배열
      data={todoList}
      //key값을 설정하기 위한 Props
      keyExtractor={(item, index) => {
        return `todo-${index}`;
      }}
      //주어진 배열에 데이터가 없을 경우 표시될 컴포넌트
      ListEmptyComponent={<EmptyItem />}
      //주어진 배열에 데이터를 사용하여 반복적으로 표시될 컴포넌트
      renderItem={({ item, index }) => (
        //TodoItem 컴포넌트를 반복하여 표시
        <TodoItem
          text={item as string}
          onDelete={() => removeTodoList(index)}
        />
      )}
      //표시할 데이터가 없는 경우, ListEmptyComponent의 컴포넌트가 화면에 표시된다.
      //하지만, 이 컴포넌트도 하나의 리스트 아이템으로 표시되기 때문에 전체화면으로 표시되지 않는다.
      //이 컴포넌트를 전체화면으로 표시하기 위해 flex:1을 설정하였다.
      contentContainerStyle={todoList.length === 0 && { flex: 1 }}
    />
  );
};
export default TodoList;