//sunday01ex11_http.js

var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res) { //요청오면 실행되는 콜백
    console.log("요청 들어옴");
    
    //실제 프로젝트에서는 View engine을 사용함
    var instream = fs.createReadStream('./output.txt');
    instream.pipe(res);
    //res.end();

});

//포트번호
server.listen(3000, function() {
    console.log('http://localhost:%d', 3000);
});


/*
fs.exists('./docs', function(exists) {
    if(exists) {
        fs.rmdir('./docs', function(err) {
            if(err) throw err;
            console.log('docs 폴더를 삭제했습니다.');
        });
    }else {
        fs.mkdir('./docs', 0666, function(err) {
            if(err) throw err;
            console.log('새로운 docs 폴더를 생성했습니다.');
        });
    }
});*/