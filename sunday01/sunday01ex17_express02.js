//sunday01ex17_express02.js
//require()메소드로 파일이나 폴더를 지정하면
//직접 만든 js파일도 모듈로 사용가능하다.
//폴더를 직접 지정할 경우 폴더 내에 index.js 파일이 존재해야 한다.

var express = require('express');
var http = require('http');
var app = express();
var cors = require('cors');

//cors 미들웨어 적용 - CORS 정책을 우회하기 위함
app.use(cors());

app.get('/', function(req, res) {
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8;"});
    res.end('<h1>웹 계산기</h1>');
});
app.get('/profile', function(req, res) {
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8;"});
    res.end('this is PROFILE!!!!!');
});
app.get('/plus/:a/:b', function(req, res) {
    res.write(JSON.stringify(Number(req.params.a) + Number(req.params.b)));
    res.end();
});app.get('/minus/:a/:b', function(req, res) {
    res.write(JSON.stringify(Number(req.params.a) - Number(req.params.b)));
    res.end();
});app.get('/multiply/:a/:b', function(req, res) {
    res.write(JSON.stringify(Number(req.params.a) * Number(req.params.b)));
    res.end();
});app.get('/divide/:a/:b', function(req, res) {
    res.write(JSON.stringify(Number(req.params.a) / Number(req.params.b)));
    res.end();
});


var server = http.createServer(app);

var port = 3000;
server.listen(port, function() {
    console.log('http://localhost:%d', port);
});