//sunday02ex01_express.js
const http = require('http');
const express = require('express');
const app = express();


app.set('port', 3000);

//router 미들웨어 등록, 사용하기
const router = express.Router();

//routing path 설정 - URL 요청을 router를 사용하여 분기한다.
router.route('/').get(function(req, res) {
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf8;"})
    res.write('/ 요청 들어옴');
    res.end();
});

router.route('/home').get(function(req, res) {
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf8;"})
    res.write('/home 요청 들어옴');
    res.end();
});



//router 미들웨어 등록하는 시점 - path 설정 이후 ~ server 실행 전
app.use('/', router);


const server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('http://127.0.0.1:%d', app.get('port'));
})