* SnsApp

* 환경설정의 경우 Counter 앱과 마찬가지로 스타일드컴포넌트, 타입스크립트 바벨플러그인 등을 설치한다.

* 앱 아아콘 설정
  * react-native-make 설치
    * npm install --save-dev @bam.tech/react-native-make
    * react-native-make를 통해 App 아이콘을 생성하려면 1024x1024 px 사이즈의 png 파일이 필요.
    * react-native set-icon --path [path-to-image] --background ["color"]
* 스플래시 스크린 이미지 설정
  * react-native-splash-screen 설치
    * npm i react-native-splash-screen --save
  * 라이브러리 연결
    * react-native link react-native-splash-screen 
  * 셋 스플래시
    * react-native set-splash --platform android --path [path-to-image] --resize [contain|cover|center] --background [background-color]
  * 스플래시 스크린 종료를 위한 코드 추가
    * App.tsx 파일열고 아래 코드 추가 
      * import SplashScreen from 'react-native-splash-screen'
      * useEffect(() => { SplashScreen.hide(); }, []);
  * 스플래시 이미지의 경우 3000x3000 px 사이즈 이상의 png 파일 필요.
* react-native-make 및 react-native-splash-screen 참고 url      
  * https://dev-yakuza.github.io/ko/react-native/react-native-make/
  * https://dev-yakuza.github.io/ko/react-native/react-native-splash-screen/
  * https://github.com/crazycodeboy/react-native-splash-screen     
* AsuncStroage 라이브러리 설치
  * npm install --save @react-native-community/async-storage
* 네비게이션 라이브러리 설치 (v5)
  * npm i @react-navigation/native --save
  * npm install --save react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
  * npm install --save @react-navigation/stack        스택 네비게이터
  * npm install --save @react-navigation/drawer       드로우 네비게이터
  * npm install --save @react-navigation/bottom-tabs  바텀-탭 네비게이터 
  * #cd ios  #pod install
* 네비게이션 참고 url
  * https://reactnavigation.org/docs/
  * https://dev-yakuza.github.io/ko/react-native/react-navigation/
  * https://github.com/dev-yakuza/react-navigation-v5-exercise/tree/master/src/Screen
  
