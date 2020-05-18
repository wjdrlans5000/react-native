import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

//@types/index.d.ts 파일에 정의한 타입을 사용하여 Context의 데이터 타입 지정
const TodoListContext = createContext<ITodoListContext>({
  todoList: [], 
  addTodoList: (todo: string): void => {}, //todoList에 데이터를 추가하기 위한 함수
  removeTodoList: (index: number): void => {}, //데이터를 삭제하기 위한 함수
});

//Context의 프로바이더 컴포넌트
//TodoListContext에 todoList, addTodoList, removeTodoList 값을 셋팅 
const TodoListContextProvider = ({ children }: Props) => {
  console.log(children); //<Container><Todo /><Todo /></Container>
  const [todoList, setTodoList] = useState<Array<string>>([]);

  const addTodoList = (todo: string): void => {
    // totoList는 useState로 만들었기에 직접 변경이 불가능 
    // 새로운 list 변수를 생성하여 todoList의 모든 데이터(...)를 넣고 매개변수로 전달받은 새로운 데이터(todo)추가
    const list = [...todoList, todo];
    // setter 함수를 사용하여 State값을 변경
    setTodoList(list);
    //데이터 물리적 저장 , setItem은 키값 형태로 데이터를 관리하며 키값은 문자열이어야 함
    AsyncStorage.setItem('todoList', JSON.stringify(list));
  };

  const removeTodoList = (index: number): void => {
    let list = [...todoList];
    list.splice(index, 1);
    setTodoList(list);
    //비동기
    AsyncStorage.setItem('todoList', JSON.stringify(list));
  };

  //앱이 시작될때, AsyncStorage에 저장된 데이터를 불러와 Context값을 초기화
  const initData = async () => {
    try {
      console.log('2.initData')
      //setItem, getItem은 모두 promise 함수
      //아무옵션도 주지않으면 기본적으로 비동기로 처리되고 여기서는 값을 바로 초기화 하기 위해 async-await를 사용하여 동기화 처리
      const list = await AsyncStorage.getItem('todoList');
      if (list !== null) {
        setTodoList(JSON.parse(list));
      }
    } catch (e) {
      console.log(e);
    }
  };
  //useEffect라는 Hooks은 컴포넌트가 마운트됐을때, 언마운트됐을때, 업데이트될때 특정 작업을 처리
  //배열이 비어있기때문에 컴포넌트가 처음 화면에 표시된 후에만 등록된 함수가 호출됨.
  //배열이 비어있지않으면 처음 마운트될때도 호출되고, 지정한 값이 바뀔때도 호출
  //배열파라미터가 아에 없을때는 컴포넌트가 리렌더링 될 때마다 호출
  useEffect(() => {
    console.log('1.useEffect')
    initData();
  }, []);

  return (
    //context의 값을 지정 (todoList 변수, add함수, remove함수)
    <TodoListContext.Provider
      value={{
        todoList,
        addTodoList,
        removeTodoList,
      }}>
      {/* App에서 리턴한 TodoListContextProvider의 자식 <Container><Todo /><Todo /></Container> */}
      {children} 
    </TodoListContext.Provider>
  );
};

export { TodoListContextProvider, TodoListContext };