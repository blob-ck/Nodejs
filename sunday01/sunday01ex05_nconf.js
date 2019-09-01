//sunday01ex05_nconf.js
//환경변수 확인하는 모듈
//nconf 가 의존하고 있는 모듈도 같이 설치된다.
//node_modules 에 설치된 모듈을 불러올 땐 상대경로 입력 안해도 된다.
//경로가 입력되어 있지 않으면 우선 node_modules 부터 탐색하기 때문.

var nconf = require('nconf');

nconf.env();

console.log('os 환경 변수의 값 : %s', nconf.get('OS'));