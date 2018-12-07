# NUGU_Streaming_Directive_AWS_Lambda
For NUGU Play Kit, Streaming code for AWS Lambda  

## 1. 이게 뭔데?
어차피 NUGU는 코드는 한국분들이 사용하시겠죠?  
"아리아, 신나는 노래 틀어줘"의 그 아리아를 이제 앱처럼 개발할 수 있습니다.  
[NUGU Developers](https://developers.nugu.co.kr/) << 여기를 참조하세요.  
여튼, 저 NUGU 디바이스 앱을 개발할 때 스트리밍 서비스가 필요할 때가 있는데 그 관련한 것입니다.  
생략한 설명이 많으니 NUGU Developers Guide를 읽어주세요.  

## 2. 뭐 써서 하는데?
스트리밍 서비스를 하려면 기본적으로 서버가 있어야겠죠?  
하지만 서버는 작은 서비스를 하기엔 좀 부담이 될 수 있습니다.  
그래서 아마존 웹서비스 람다와 API Gateway, S3 서비스를 활용하여 스트리밍을 할 겁니다.  
아마존 웹서비스 계정이 있으셔야 합니다.  
그리고 ffmpeg를 이용해서 mp3와 같은 오디오 파일을 m3u8이라고하는 스트리밍 포맷으로 변경해주셔야합니다.  
ffmpeg는 검색해서 설치하시면 되고, 아래 명령어로 m3u8과 ts파일을 만들어주세요.  
ffmpeg -i "gogo.mp3" -map 0 -f segment -segment_list "gogo.m3u8" -segment_time 10 "gogo%03d.ts"

## 3. 시작하자.
S3에 버킷을 만들어주시고, 위에서 만든 m3u8과 ts파일을 넣어주세요. ts파일은 많을테니 폴더로 묶어서 넣는게 관리에 좋겠죠?  
Node js 8.10버전 람다함수를 하나 생성해주시고 이 깃에 포함된 index.js 파일 코드를 복사해서 붙여넣어 주세요.  
S3와 연결된 부분이나 커스텀하셔야하는 부분은 수정 해주세요.  
물론 람다함수 권한도 잘 주셔야합니다.  
다음은 API Gateway로 가서 새로운 리소스를 만들어 주시고(액션이름과 같게) 메소드를 post로 만드신 다음 방금 생성한 람다 함수와 프록시 연결을 해주세요.  
그 다음 API Gateway 배포해주시고 해당 URL을 NUGU Developer에 외부연동 서버 URL에 복붙해주세요.  
물론 포스트맨 같은 프로그램으로 테스트해보는게 좋겠죠?

## 4. 마무리.
HLS 방식 스트리밍을 사용하는 스트리밍입니다.  
사실 별건 없고 저 응답 형태를 잘 안따르면 NUGU 디바이스가 응답을 잘 안해서 저 처럼 시행착오 겪으시는 분 계실까봐 업로드합니다.  
서비스에 맞춰서 바꿔야하는거 아시죠?? 거의 의사코드입니다.
빌트인 액션들이 정의 되어있습니다. 토큰 기반해서 정지했던데부터 재생하는 거나 멈추는거나 그런거요.
