//sunday01ex08_fs_readfile.js

//비동기 io
var fs = require('fs');

fs.readFile('./package.json', 'utf8', function(err, data){
    //읽어들인 데이터를 출력합니다.
    console.log(data);
});
