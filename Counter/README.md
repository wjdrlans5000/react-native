react-native
Counter 앱

* 라이브러리 설치
react-native init Counter //리엑트 네이티브 프로젝트 생성

cd Counter
npm install --save styled-components //스타일드-컴포넌트 라이브러리 설치
npm install --save-dev typescript @types/react @types/react-native @types/styled-components babel-plugin-root-import
//typescript- 타입스크립트 라이브러리
//@types/react 리엑트 타입이 정의된 파일
//@types/react-native 리엑트 네이티브 타입이 정의된 파일
//@types/styled-components 스타일드 컴포넌트 타입이 정의된 파일
//babel-plugin-root-import 컴포넌트 추가시 절대경로 사용을 위한 라이브러리

* 설치한 라이브러리 관련 설정 추가
1. tsconfig.json 파일 생성 및 내용추가
2. babel.config.js 파일 수정
3. src폴더 생성 후 App.js 파일 이동 후 App.tsx로 파일 수정
4. index.js 파일 수정

