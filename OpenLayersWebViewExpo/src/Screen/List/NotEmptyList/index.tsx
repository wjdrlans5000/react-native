import React,{useContext} from 'react';
import Styled from 'styled-components/native';
import { SelectListContext } from '../../../Context';

const Container = Styled.View`
  flex-direction: row;
  background-color: #FFF;
  margin:4px 16px;
  padding: 8px 16px;
  border-radius: 8px;
  align-items: center;
`;
const Label = Styled.Text`
  flex: 1;
`;
const Touch = Styled.TouchableOpacity``;
const Icon = Styled.Image`
  width: 24px;
  height: 24px;
`;

interface Props {
  text: {
    station_id : String;
    station_name : String;
    x : String;
    y : String;
  };
  navigation?: Object;
}

const TodoItem = ({ text, navigation }: Props) => {
  const { addSelectList } = useContext<selectListContext>(SelectListContext);
  return (
    <Container>
      <Touch onPress = {() => {
            console.log('addSelectList',addSelectList);
            //useContext 변경
            addSelectList(text);
            navigation.navigate('MyMap');
          }}>
        <Label>{text.station_id}</Label>
        <Label>{text.station_name}</Label>
        <Label>{text.x}</Label>
        <Label>{text.y}</Label>
      </Touch>
    </Container>
  );
};
export default TodoItem;