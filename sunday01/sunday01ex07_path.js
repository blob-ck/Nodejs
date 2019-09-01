//sunday01ex07_path.js
//path 구분자
//리눅스 계열 = ":"
//윈도우 계열 = ":"

//directory 구분자
//리눅스 계열 = "/"
//윈도우 계열 = "\"

var path = require('path');

//디렉토리 이름 합치기(변환하기)
var directories = ['users', 'newDir', 'newDocs'];
console.log('문서 경로 : ', directories.join(path.sep));

//디렉토리 이름과 파일명 합치기
var curPath = path.join('/Users/newDir', 'app.exe');
console.log('파일 경로 : %s', curPath);


//패스에서 디렉토리, 파일명, 확장자 구별하기
var filename = '';
