interface selectListContext {
  selectList: {
    station_id ?: String,
    station_name ?: String,
    x ?: String,
    y ?: String
  };
  addSelectList: (selectList: object) => void, //todoList에 데이터를 추가하기 위한 함수
  // removeSelectList: (index: number): void => {}, //데이터를 삭제하기 위한 함수
}