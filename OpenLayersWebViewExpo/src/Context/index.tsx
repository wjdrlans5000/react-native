import React, { createContext, useState, useEffect } from 'react';

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

//@types/index.d.ts 파일에 정의한 타입을 사용하여 Context의 데이터 타입 지정
const SelectListContext = createContext<selectListContext>({
    selectList: {
        station_id : '',
        station_name : '',
        x : '',
        y : ''
      },
    addSelectList: (selectList: Object): void => {}, //selectList 데이터를 추가하기 위한 함수
});

//Context의 프로바이더 컴포넌트
//SelectListContext selectList, addSelectList 값을 셋팅 
const SelectListContextProvider = ({ children }: Props) => {
  console.log(children); //<Container><Todo /><Todo /></Container>
  const [selectList, setSelectList] = useState();

  const addSelectList = (selectList: Object): void => {
    // setter 함수를 사용하여 State값을 변경
    setSelectList(selectList);
  };


  return (
    //context의 값을 지정 ( 변수, add함수)
    <SelectListContext.Provider
      value={{
        selectList,
        addSelectList,
      }}>
      {/* App에서 리턴한 SelectListContextProvider 자식     <StatusBar barStyle="default" /><Navigator /> */}
      {children} 
    </SelectListContext.Provider>
  );
};

export { SelectListContextProvider, SelectListContext };