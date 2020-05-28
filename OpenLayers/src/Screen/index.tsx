import React, {useState} from 'react';
import { Dimensions } from 'react-native'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';

import AutoHeightWebView from 'react-native-autoheight-webview';

import {
  autoHeightHtml0,
  autoHeightHtml1,
  autoHeightScript,
  autoWidthHtml0,
  autoWidthHtml1,
  autoWidthScript,
  autoDetectLinkScript,
  style0,
  inlineBodyStyle,
} from '../Screen/config';

const onShouldStartLoadWithRequest = result => {
  console.log(result);
  return true;
};

const onError = ({nativeEvent}) =>
  console.error('WebView error: ', nativeEvent);

const onMessage = event => {
  const {data} = event.nativeEvent;
  let messageData;
  // maybe parse stringified JSON
  try {
    messageData = JSON.parse(data);
  } catch (e) {
    console.log(e.message);
  }
  if (typeof messageData === 'object') {
    const {url} = messageData;
    // check if this message concerns us
    if (url && url.startsWith('http')) {
      Linking.openURL(url).catch(error =>
        console.error('An error occurred', error),
      );
    }
  }
};

const onHeightLoadStart = () => console.log('height on load start');

const onHeightLoad = () => console.log('height on load');

const onHeightLoadEnd = () => console.log('height on load end');

const onWidthLoadStart = () => console.log('width on load start');

const onWidthLoad = () => console.log('width on load');

const onWidthLoadEnd = () => console.log('width on load end');

const Explorer = () => {
  let html = '<!DOCTYPE html>' 
      html +=  '<html>' 
      html += '<head>'
      html += '<title>Simple Map</title>'
      html += '<link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">'
      html += '<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>'
      html += '<script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>' 
      html += '</head>' 
      html += '<body>' 
      html += '<div id="map" class="map" style=""></div>' 
      html += '<script>' 
      html += 'var map = new ol.Map({' 
      html += 'layers: [new ol.layer.Tile({source: new ol.source.OSM()})],' 
      html += 'target: "map",' 
      html += 'view: new ol.View({center : ol.proj.transform([ 127.72, 38.04 ], "EPSG:4326", "EPSG:3857"),zoom: 8})' 
      html += '});' 
      html += '</script>' 
      html += '</body>' 
      html += '</html>'
  const [{widthHtml, heightHtml}, setHtml] = useState({
    widthHtml: autoWidthHtml0,
    heightHtml: autoHeightHtml0,
  });
  const changeSource = () =>
    setHtml({
      widthHtml: widthHtml === autoWidthHtml0 ? autoWidthHtml1 : autoWidthHtml0,
      heightHtml:
        heightHtml === autoHeightHtml0 ? autoHeightHtml1 : autoHeightHtml0,
    });

  const [{widthStyle, heightStyle}, setStyle] = useState({
    heightStyle: null,
    widthStyle: inlineBodyStyle,
  });
  const changeStyle = () =>
    setStyle({
      widthStyle:
        widthStyle === inlineBodyStyle
          ? style0 + inlineBodyStyle
          : inlineBodyStyle,
      heightStyle: heightStyle === null ? style0 : null,
    });

  const [{widthScript, heightScript}, setScript] = useState({
    heightScript: autoDetectLinkScript,
    widthScript: null,
  });
  const changeScript = () =>
    setScript({
      widthScript: widthScript == autoWidthScript ? autoWidthScript : null,
      heightScript:
        heightScript !== autoDetectLinkScript
          ? autoDetectLinkScript
          : autoHeightScript + autoDetectLinkScript,
    });

  const [heightSize, setHeightSize] = useState({height: 0, width: 0});
  const [widthSize, setWidthSize] = useState({height: 0, width: 0});

  return (
    <ScrollView
      style={{
        paddingTop: 45,
        backgroundColor: 'lightyellow',
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AutoHeightWebView
        customStyle={heightStyle}
        onError={onError}
        onLoad={onHeightLoad}
        onLoadStart={onHeightLoadStart}
        onLoadEnd={onHeightLoadEnd}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onSizeUpdated={setHeightSize}
        source={{html: heightHtml}}
        customScript={heightScript}
        onMessage={onMessage}
      />
      <Text style={{padding: 5}}>
        height: {heightSize.height}, width: {heightSize.width}
      </Text>
      <AutoHeightWebView
        style={{
          marginTop: 15,
          flex: 0,
          height: '100%',
          width: '100%'
        }}
        enableBaseUrl
        customStyle={widthStyle}
        onError={onError}
        onLoad={onWidthLoad}
        onLoadStart={onWidthLoadStart}
        onLoadEnd={onWidthLoadEnd}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onSizeUpdated={setWidthSize}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        source={{
          html: html,
          baseUrl:
            Platform.OS === 'android' ? 'file:///android_asset/' : 'web/',
        }}
        customScript={widthScript}
      />
      <Text style={{padding: 5}}>
        height: {widthSize.height}, width: {widthSize.width}
      </Text>
      <TouchableOpacity onPress={changeSource} style={styles.button}>
        <Text>change source</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={changeStyle} style={styles.button}>
        <Text>change style</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={changeScript}
        style={[styles.button, {marginBottom: 100}]}>
        <Text>change script</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    backgroundColor: 'aliceblue',
    borderRadius: 5,
    padding: 5,
  },
});

export default Explorer;