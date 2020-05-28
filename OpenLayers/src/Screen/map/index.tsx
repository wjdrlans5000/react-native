import React,{useState} from "react";
import { Dimensions } from 'react-native'
import { WebView,WebViewMessageEvent } from 'react-native-webview';
import { View ,ScrollView} from 'react-native';

const PublicMap = ({  }) => {
  // console.log(Dimensions.get('window').width)
  // console.log(Dimensions.get('window').height)
  const [webViewState, setWebViewState] = useState({webViewHeight:Dimensions.get('window').height});

  let html = '<!DOCTYPE html style="height:100%;">' 
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
        html += 'view: new ol.View({center : ol.proj.transform([ 127.72, 38.04 ], "EPSG:4326", "EPSG:3857"),zoom: 8})' 
        html += '});' 
        html += '</script>' 
        html += '</body>' 
        html += '</html>'

  const onWebViewMessage = (event: WebViewMessageEvent) => {
    console.log(Number(event.nativeEvent.data))
    setWebViewState({webViewHeight: Number(event.nativeEvent.data)})
    console.log(webViewState)
  }
  return (
    // <ScrollView>
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
    // </ScrollView>
  );
};

export default PublicMap;
