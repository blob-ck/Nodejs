//sunday02ex01_views.js + ejs 모듈
//npm install ejs --save
const http = require('http');
const express = require('express');
const app = express();


app.set('port', 3000);

//router 미들웨어 등록, 사용하기
const router = express.Router();
const path = require('path');

//ejs 모듈
//폴더명, 폴더경로   ==> .ejs 파일의 접두어가 된다 ==> 파일명만 있으면 사용 가능하도록
app.set('views', path.join(__dirname, 'views')); //접두어
app.set('view engine', 'ejs'); //접미어


//routing path 설정 - URL 요청을 router를 사용하여 분기한다.
router.route('/').get(function(req, res) {
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf8;"})
    console.log('/ 요청 들어옴');
    res.end();
});

router.route('/home').get(function(req, res) {
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf8;"})
    console.log('/home 요청 들어옴');
    
    let data = {
        "title" :   "홈페이지",
        "name"  :   "기리기리"
    }
    
    //ejs렌더링 후 결과html을 res.end()에 사용
    //ejs파일명, 전달할 데이터, 콜백
    res.app.render('home', {'data':data}, function(err, html) {
        if(err) throw err;
        res.end(html);
    });
});



//router 미들웨어 등록하는 시점 - path 설정 이후 ~ server 실행 전
app.use('/', router);


const server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('http://127.0.0.1:%d', app.get('port'));
})