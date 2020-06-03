import React,{useState, useEffect, useRef } from "react";
import { Dimensions} from 'react-native'
import { WebView,WebViewMessageEvent } from 'react-native-webview';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styled from 'styled-components/native';
import IconButton from '../../Components/IconButton';
import Input from '../../Components/Input';

import AssetUtils from "expo-asset-utils";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

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

const INDEX_FILE_PATH = require(`../../assets/html/index.html`);

const PublicMap = ({ navigation }) => {
  const [webViewState, setWebViewState] = useState({webViewHeight:Dimensions.get('window').height});
  const [geoLocationState, setGeoLocationProps] = useState<geoLocationProps>({
    latitude : undefined,
    longitude : undefined
  });
  const [errorMessageState, setErrorMessageProps] = useState<errorMessageProps>();
  const [webViewRef, setWebViewRef] = useState(null);
  const [webviewContent, setWebviewContent] = useState<String>();

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

  const loadHTMLFile = async () => {
    try {
      console.log('loadHTMLfILE')
      let asset: Asset = await AssetUtils.resolveAsync(INDEX_FILE_PATH);
      let fileString: string = await FileSystem.readAsStringAsync(
        asset.localUri
      );

      setWebviewContent(fileString);
    } catch (error) {
      console.warn(error);
      console.warn("Unable to resolve index file");
    }
  };

  let html = '<!doctype html>' 
        html +=  '<html style="height:100%;">' 
        html += '<head>'
        html += '<title>Simple Map</title>'
        html += '<link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">'
        html += '<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>'
        html += '<script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>' 
        html += '</head>' 
        html += '<body style="height:100%;">' 
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
    console.log('onMessage')
    // setWebViewState({webViewHeight: Number(event.nativeEvent.data)})
    // console.log(webViewState)
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
    loadHTMLFile();
  },[]);
  
  // const injectJSFileFromWeb = `
  //   document.body.style.backgroundColor = 'blue';
  //   true;
  // `;

  // Send message to webview
  // const sendMessage = (payload: object) => {

  //   webViewRef?.injectJavaScript(
  //     `window.postMessage(${JSON.stringify(payload)}, '*');`
  //   );
  // };
  const injectJavaScriptInHtml = () => {
    console.log('onload')
    // createMap('${geoLocationState.longitude}','${geoLocationState.latitude}')
    const jsFileName = "../../assets/js/ol.js";
    webViewRef != null && webViewRef.injectJavaScript(
      `
      window.longitude = '${geoLocationState.longitude}';
      window.latitude = '${geoLocationState.latitude}';
      // window.alert('${geoLocationState.longitude}')
      // window.alert('${geoLocationState.latitude}')
      // window.ReactNativeWebView.postMessage('${geoLocationState.longitude}');
      // var corescript = document.createElement('script');
      // corescript.type = 'text/javascript';
      // corescript.src = "${jsFileName}";
      // var parent = document.getElementsByTagName('head').item(0);
      // window.alert(parent)
      // parent.appendChild(corescript);
      // window.ReactNativeWebView.postMessage('${geoLocationState.longitude}')
      `
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {geoLocationState.latitude != undefined && <WebView 
        scrollEnabled={false}
        style={{ height : webViewState.webViewHeight }}
        ref={(ref: WebView) => {
          setWebViewRef(ref);
        }}
        // source={{html : html}}
        originWhitelist={['*']}
        source={{html : webviewContent}}
        onMessage={(event) => {
          // if (event && event.nativeEvent && event.nativeEvent.data) {
            // injectJavaScriptInHtml();
            // onWebViewMessage(event);
          // }
        }}
        onLoadStart={injectJavaScriptInHtml}
        onLoadEnd={injectJavaScriptInHtml}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        useWebKit={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        // onLoad={() => { injectJavaScriptInHtml(); }}
        // injectedJavaScript={injectJSFileFromWeb}
        // injectedJavaScript="window.ReactNativeWebView.postMessage('${geoLocationState.longitude}')"
        /> 
      }
    </SafeAreaView>
    
  );
};

export default PublicMap;
