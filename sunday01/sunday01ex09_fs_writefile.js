//sunday01ex09_fs_writefile.js

//비동기 io
var fs = require('fs');

var msg = 'Hello World';

fs.writeFile('./output.txt', msg, function(err) {
    if(err) {
        console.log('ERROR : ', err);
        return;
    }
    
    console.log('output.txt 에 파일 쓰기 완료!!');
});