import React,{useState, useEffect} from "react";
import { Dimensions,ScrollView } from 'react-native'
import { WebView,WebViewMessageEvent } from 'react-native-webview';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styled from 'styled-components/native';
import IconButton from '../../Components/IconButton';
import Input from '../../Components/Input';


const SearchBar = Styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;



interface geoLocationProps {
  latitude ?: number,
  longitude ?: number
}

interface errorMessageProps {
  errorMessage ?:string
}

const PublicMap = ({ navigation }) => {
  const [webViewState, setWebViewState] = useState({webViewHeight:Dimensions.get('window').height});
  const [geoLocationState, setGeoLocationProps] = useState<geoLocationProps>({
    latitude : undefined,
    longitude : undefined
  });
  const [errorMessageState, setErrorMessageProps] = useState<errorMessageProps>();


  const getCurrentLocation = async () => {
    console.log("getCurrentLocation")
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setErrorMessageProps({
        errorMessage: 'Permission to access location was denied',
      });
      console.log(errorMessageState)
    }

    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    const { latitude , longitude } = location.coords;
    setGeoLocationProps({latitude, longitude});
    // console.log(geoLocationState)
  };

  console.log(geoLocationState);
  let html = '' 
        html +=  '<html>' 
        html += '<head>'
        html += '<title>Simple Map</title>'
        html += '<link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">'
        html += '<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>'
        html += '<script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>' 
        html += '</head>' 
        html += '<body>' 
        html += '<div id="map" class="map" style="height:100%;"></div>' 
        html += '<script>' 
        html += 'var map = new ol.Map({' 
        html += 'layers: [new ol.layer.Tile({source: new ol.source.OSM()})],' 
        html += 'target: "map",' 
        html += 'view: new ol.View({center : ol.proj.transform([' +geoLocationState.longitude + ',' + geoLocationState.latitude + '], "EPSG:4326", "EPSG:3857"),zoom: 18})' 
        html += '});' 
        html += '</script>' 
        html += '</body>' 
        html += '</html>'

  const onWebViewMessage = (event: WebViewMessageEvent) => {
    console.log(Number(event.nativeEvent.data))
    setWebViewState({webViewHeight: Number(event.nativeEvent.data)})
    console.log(webViewState)
  }
  
  useEffect(() => {
    console.log('useeffect')
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <SearchBar>
          <Input
            style={{ flex: 1, marginLeft: 8, height: 40, width: Dimensions.get('window').width -50 }}
            placeholder="검색"
          />
        </SearchBar>
      ),
      headerRight: () => (
        <>
          {/* <CameraButton/> */}
          <IconButton iconName="camera" 
            onPress={() => {
              navigation.navigate('Camera');
            }}
          />
        </>
      ),
    });

    getCurrentLocation();
  },[]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView 
        // automaticallyAdjustContentInsets={false}
        scrollEnabled={false}
        // javaScriptEnabled={true}
        // originWhitelist={['*']}
        style={{ height : webViewState.webViewHeight }}
        source={{
          html: html
        }}
        onMessage={onWebViewMessage}
        injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'
        />
    </SafeAreaView>
    
  );
};

export default PublicMap;
