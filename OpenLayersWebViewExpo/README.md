# OpenlayersWebViewExpo
* 오픈레이어스 활용을 위해 WebView를 사용하여 지도제어를 수행하고 react-native의 네비게이션, 지오로케이션, 카메라 등의 기능을 적용
* 디바이스에서 확인하기 위하여 expo 환경에서 개발
# 개발환경
* expo init OpenlayersWebViewExpo
* blank(typescript)로 프로젝트 생성
* tsconfig.json 파일 작성 (타입스크립트 사용예정)
* app.json파일에 "packagerOpts" 옵션 추가 
* node_modules > expo > AppEntry.js 파일 에 App 경로 변경

# 웹뷰 라이브러리 설치
* npm install react-native-webview

# 위치정보 가져오기위한 라이브러리 설치
* npm install expo install expo-location
* expo install expo-permissions
* 참고 URL
  * https://reactnativemaster.com/react-native-geolocation-example/

# 스타일드컴포넌트 라이브러리 설치
* npm install --save styled-components //스타일드-컴포넌트 라이브러리 설치
* npm install --save-dev @types/styled-components

# 네비게이터 라이브러리 설치 (V5)
* npm i @react-navigation/native --save
* npm install --save react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
* npm install --save @react-navigation/stack        스택 네비게이터
* npm install --save @react-navigation/drawer       드로우 네비게이터
* npm install --save @react-navigation/bottom-tabs  바텀-탭 네비게이터 
* expo의 경우 safeAreaView 관련 라이브러리 설치 후 네비게이션 감싸줘야함
  * expo install react-native-safe-area-view react-native-safe-area-context
  * https://github.com/react-navigation/react-native-safe-area-view
  
# expo 카메라 관련 라이브러리 설치
* expo install expo-camera
* expo install expo-image-picker
* expo install expo-media-library
* 참고 url
  * https://docs.expo.io/versions/latest/sdk/camera/#takepictureasync
  * https://medium.com/wesionary-team/camera-module-in-react-native-with-expo-camera-3b8c9f3cd076
  * https://reactnativemaster.com/react-native-camera-expo-example
  * https://docs.expo.io/versions/latest/sdk/imagepicker/
  * https://docs.expo.io/versions/latest/sdk/media-library/#expomedialibraryaddassetstoalbumasyncassets-album-copyassets
  * https://forums.expo.io/t/problem-to-save-picture-to-medialibrary-with-expo/36862/4
  
# 어싱크스토리지 라이브러리 설치
* npm install --save @react-native-community/async-storage

# expo-asset 라이브러리 설치
* expo install expo-asset
* npm install expo-asset-utils ??
    
