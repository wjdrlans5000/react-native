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
//State 타입 미리정의
interface State {
  count: number;
  error: boolean;
}

//class 컴포넌트
class Counter extends React.Component<Props, State> {
  //생성자 함수로 State 초기값 설정
  //컴포넌트가 만들어지면 가장 먼저 실행되는 메서드
  constructor(props: Props) {
    //생성자함수 사용시 항상 부모컴포넌트의 생성자 함수를 호출해야 함.
    //Why?? ==> super를 선언해야 this가 초기화 됨, 선언하지 않으면 this 키워드를 사용할수 없음. 
    super(props);
    console.log('constructor');

    this.state = {
      count: props.initValue,
      error: false,
    };
  }

  //화면에 컴포넌트를 렌더링할때 호출
  render() {
    console.log('render');
    //Props, State에 접근하기 위해 this 사용
    const { title } = this.props;
    const { count, error } = this.state;
    return (
      <Container>
        {!error && (
          <>
            {title && (
              <TitleContainer>
                <TitleLabel>{title}</TitleLabel>
              </TitleContainer>
            )}
            <CountContainer>
              <CountLabel>{count}</CountLabel>
            </CountContainer>
            <ButtonContainer>
              <Button
                iconName="plus"
                onPress={() => this.setState({ count: count + 1 })}
              />
              <Button
                iconName="minus"
                onPress={() => this.setState({ count: count - 1 })}
              />
            </ButtonContainer>
          </>
        )}
      </Container>
    );
  }

  //클래스 컴포넌트의 라이프사이클 함수들
  
  //마운트될때 발생 props로 받아온 것을 state에 넣어주고 싶을때 사용
  //props나 state가 바뀌었을때도 호출
  //static 필요, this롤 조회X, null반환시 아무일도 발생하지X
  //컴포넌트가 렌더링 되기 전에 매번 실행
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    console.log('getDerivedStateFromProps');

    return null;
  }
  //컴포넌트의 첫번째 렌더링이 마치고 호출되는 메서드, 호출되는 시점에는 컴포넌트가 화면에 나타난상태
  //D3, masonry 처럼 DOM을 사용하는 외부 라이브러리 연동이나 데이터 요청을 위한 AXIOS,FETCH,AJAX 요청을 하거나, dom의 속성을 변경하는 작업수행 
  componentDidMount() {
    console.log('componentDidMount');
  }
  //컴포넌트가 리렌더링 할지말지를 결정
  //주로 최적화 할 때 사용하는 메서드
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    console.log('shouldComponentUpdate');
    return true;
  }
  //컴포넌트에 변화가 일어나기 직전의 DOM 상태를 가져와서 특정값을 반환하면 그 다음에 발생하는 componentDidUpdate 함수에서
  //해당 반환값을 받아와 사용할수 있도록 함
  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    console.log('getSnapshotBeforeUpdate');

    return null;
  }
  // 리렌더링이 마치고, 화면에 모든 변화가 반영된 뒤 호출되는 메서드로 snapshot 파라미터로 getSnapshotBeforeUpdate 에서 반환한 값을 조회
  componentDidUpdate(prevProps: Props, prevState: State, snapshot: null) {
    console.log('componentDidUpdate');
  }
  //컴포넌트가 화면에서 사라지기 직전에 호출
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  //에플리케이션에서 발생하는 에러 처리
  //error : error의 내용, info : 에러가 발생한 위치
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({
      error: true,
    });
  }
}
export default Counter;