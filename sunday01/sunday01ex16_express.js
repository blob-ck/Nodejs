//sunday01ex16_express.js
//require()메소드로 파일이나 폴더를 지정하면
//직접 만든 js파일도 모듈로 사용가능하다.
//폴더를 직접 지정할 경우 폴더 내에 index.js 파일이 존재해야 한다.

var express = require('express');
var http = require('http');
var app = express();

app.get('/home', function(req, res) {
   res.end('this is home page'); 
});

app.get('/profile', function(req, res) {
   res.end('this is profile page'); 
});

var server = http.createServer(app);

var port = 3000;
server.listen(port, function() {
    console.log('http://localhost:%d', port);
});


