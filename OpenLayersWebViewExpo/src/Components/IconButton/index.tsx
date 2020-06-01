import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.TouchableOpacity`
  padding: 8px;
`;
const Icon = Styled.Image`
`;

interface Props {
  iconName:
    | 'camera'
    | 'live'
    | 'send'
    | 'dotMenu'
    | 'favorite'
    | 'comment'
    | 'bookmark'
    | 'menu';
  style?: object;
  onPress?: () => void;
}

const IconButton = ({ iconName, style, onPress }: Props) => {
  const imageSource = {
    camera: require('../../assets/ic_camera.png'),
    live: require('../../assets/ic_live.png'),
    send: require('../../assets/ic_send.png'),
    dotMenu: require('../../assets/ic_dot_menu.png'),
    favorite: require('../../assets/Tabs/ic_favorite_outline.png'),
    comment: require('../../assets/ic_comment.png'),
    bookmark: require('../../assets/ic_bookmark.png'),
    menu: require('../../assets/ic_menu.png'),
  };

  return (
    <Container
      style={style}
      onPress={() => {
        if (onPress && typeof onPress === 'function') {
          onPress();
        }
      }}>
      <Icon source={imageSource[iconName]} />
    </Container>
  );
};

export default IconButton;
