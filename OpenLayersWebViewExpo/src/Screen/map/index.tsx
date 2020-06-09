import React,{useState, useEffect, useContext } from "react";
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
import { SelectListContext } from '../../Context';

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

const PublicMap = ({ navigation, route }) => {
  const [webViewState, setWebViewState] = useState({webViewHeight:Dimensions.get('window').height});
  const [geoLocationState, setGeoLocationProps] = useState<geoLocationProps>({
    latitude : undefined,
    longitude : undefined
  });
  const [errorMessageState, setErrorMessageProps] = useState<errorMessageProps>();
  const [webViewRef, setWebViewRef] = useState(null);
  const [webviewContent, setWebviewContent] = useState<String>();

  const {selectList} = useContext<selectListContext>(SelectListContext);

  //현재위치가져오기
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

  //html파일 로드
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
  
  const injectJavaScriptInHtml = () => {
    console.log('onload')
    // createMap('${geoLocationState.longitude}','${geoLocationState.latitude}')
    const jsFileName = "../../assets/js/ol.js";
    webViewRef != null && webViewRef.injectJavaScript(
      `
      window.longitude = '${geoLocationState.longitude}';
      window.latitude = '${geoLocationState.latitude}';
      // window.ReactNativeWebView.postMessage('${geoLocationState.longitude}')
      `
    )
  }

  //리스트클릭시 해당 xy로 지도 이동
  const injectXY = () => {
    console.log('injectXY')
    //useContext값이 다르면 set
    const selectItem = selectList;
    webViewRef != null && webViewRef.injectJavaScript(
      `
      var point = ['${selectItem.x}'*1 , '${selectItem.y}'*1];
      var selectMarker = new ol.Feature({
        type: 'icon',
        geometry: new ol.geom.Point(point)
      });

      vectorLayer.setSource(new ol.source.Vector({
        features: [selectMarker],
        projection: ol.proj.get('EPSG:5174')
        })
      )

      //연속지적 레이어 삭제
      map.getLayers().forEach(function(layer){
        var layerId =  layer.get('layerId') + '';
        if(layerId == 'cbnd'){
          map.removeLayer(layer);
        }
      });
      
      //geoserver 요청
      var vectorSource = new ol.source.Vector();
      var vector = new ol.layer.Vector({
        layerId: 'cbnd',
        source: vectorSource,
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'rgba(230, 67, 51, 1.0)',
            width: 2
          }),
          fill : new ol.style.Fill({
            color: 'rgba(230, 67, 51, 0.05)'
          })
        })
      });
      
     var url = "http://192.168.0.5:8081/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite:cla_lppacbnd_kl_20180801&outputFormat=application%2Fjson&CQL_FILTER=pnu=${selectItem.station_id}"
     fetch(url)
     .then(response => response.json())
     .then(json => {
       var features = (new ol.format.GeoJSON()).readFeatures(json);
       vectorSource.addFeatures(features);
        map.addLayer(vector);;
        map.getView().fit(vectorSource.getExtent());
     })
     .catch(error => {
       console.log(error);
     });

      `
    )
  }

  //최초, 리스트 클릭하여 selectList 값이 변경될 경우
  useEffect(() => {
    console.log('selectList',selectList)
    //최초 로딩시 injectXY 실행 X, selectList 컨텍스트 값이 바뀔때마다 injectXT 수행
    selectList != undefined && (selectList.station_id != '' && injectXY());
  },[selectList])

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
