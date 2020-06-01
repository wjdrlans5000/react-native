import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

const CameraApp = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  
  
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}
          ref={ref => {
            setCameraRef(ref);
          }}
          >
        <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
            <TouchableOpacity
                style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',                  
                }}
                onPress={async () => {
                    navigation.navigate('ImagePicker')
                    // let result = await ImagePicker.launchImageLibraryAsync({
                    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    // });
                    // console.log(result);
                }}
                >
                <Ionicons
                    name="ios-photos"
                    style={{ color: "#fff", fontSize: 40}}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                }}
                onPress={async() => {
                    if(cameraRef){
                      let photo = await cameraRef.takePictureAsync().then(data => {
                          MediaLibrary.saveToLibraryAsync(data.uri);
                          console.log('photo', photo);
                        //   console.log('savePhoto', savePhoto);
                      })
                    //   let asset = await MediaLibrary.createAssetAsync(photo);
                    //   console.log('asset', asset);

                    }
                }}
                >
                <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: 40}}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                }}
                onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                }}
                >
                <MaterialCommunityIcons
                    name="camera-switch"
                    style={{ color: "#fff", fontSize: 40}}
                />
            </TouchableOpacity>
        </View>

      </Camera>
      
    </View>
    
  );
}

export default CameraApp;

