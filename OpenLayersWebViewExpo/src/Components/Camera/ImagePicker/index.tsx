import React, {useState, useEffect} from 'react';
import { Button, Image, View } from 'react-native';
import Styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const Icon = Styled.Image`
`;


  const ImagePickerApp = ({}) =>  {
    console.log('imagePicker')
    const [imageState, setImageUri] = useState<String>();

    useEffect(() => {
        console.log('imagePicker useEffect')
        getPermissionAsync();
        _pickImage();
      }, []);


  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const _pickImage = async () => {
    try {
        console.log('pick_image')
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
         });
      if (!result.cancelled) {
        setImageUri(result.uri);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  let image = imageState;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );

  
}

export default ImagePickerApp;