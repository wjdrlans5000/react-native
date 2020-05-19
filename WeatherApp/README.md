* Weather

* 기본 환경설정의 경우 Counter앱과 동일

* 날씨정보를 가져오는 API 필요
  * openweathermap.org/api 이동하여 키 발급

* 위치정보를 가져오는 라이브러리 설치
  * npm install -save react-native-geolocation-service

* ios의 경우 코코아포드를 사용하여 필요 라이브러리를 링크해야함
  * ./ios/Podfile 수정, cd ios pod install

* 위치정보를 사용하기위해선 사용자 권한 설정이 필요
  * ios는 ./ios/Weather/info.plist 파일을 수정
  * android는 ./android/app/src/main/AndroidManifest.xml 파일을 수정

* 만약 앱실행시 위치정보를 가져오는데 실패했다는 메시지가 나오면 디바이스의 위치권한을 허용해주어야 한다.
