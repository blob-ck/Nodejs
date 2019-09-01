//sunday01ex06_os.js
//os 내장모듈 사용하기
//https://nodejs.org/en/docs 에서 Node 버전에 맞는 API 문서를 참조하여 사용한다.
var os = require('os');

console.log('os의 host name = %s', os.hostname());
console.log('os의 homedir = %s', os.homedir());
console.log('os의 가용 system memory = %d/%d', os.freemem(), os.totalmem());
console.log('os의 cpu 정보 = %j', os.cpus());
console.log('os의 네트워크 정보 = %j', os.networkInterfaces());