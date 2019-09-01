//sunday02ex05_params_post.js
//res.end(문자열)
//res.send(객체)

const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const server = http.createServer(app);

//serve-static 모듈 설치
//npm install serve-static --save
const static = require('serve-static');
//외부에서 오는 요청 경로, 실제로 대응할 파일의 경로
//http://localhost:3000/public
//D:\Node_Sunday\Nodejs\sunday02\public
app.use('/public', static(__dirname + '/public'));

//post 방식의 전송 파라미터 받기
//body-parser 모듈 설치
//npm install body-parser --save
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(bodyParser) 까지만 해도 된다


app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

router.route('/').get(function(req, res) {
    let data = {"title" : "집이다", "name" : "길똥"}
    res.app.render('home', {"data" : data}, function(err, html) {
        if(err) throw err;
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
        res.end(html);
    });
});

router.route('/profile_form').get(function(req, res) {
    let userProfile = {
        "title" :   "프로필",
        "name"  :   "김주말",
        "kr"    :   "웹 30년",
        "hk"    :   "낙성대 운석학사",
        "jk"    :   "정보처리병사"
    };
    res.app.render('profile_form', {"data" : userProfile}, function(err, html) {
        if(err) throw err;
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
        res.end(html);
    });
    
});


//POST
router.route('/profile').post(function(req, res) {
    let userProfile = {
        "name"  :   req.body.name,
        "kr"    :   req.body.kr,
        "hr"    :   req.body.hr,
        "jk"    :   req.body.jk
    };
    console.log(userProfile);
    res.app.render('profile', {"data" : userProfile}, function(err, html) {
        if(err) throw err;
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
        res.end(html);
    });
    
});




//GET
router.route('/profile').get(function(req, res) {
    let userProfile = {
        "title" :   "프로필",
        "name"  :   req.query.name,
        "kr"    :   req.query.kr,
        "hr"    :   req.query.hr,
        "jk"    :   req.query.jk
    };
    res.app.render('profile', {"data" : userProfile}, function(err, html) {
        if(err) throw err;
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
        res.end(html);
    });
    
});


app.use('/', router);





server.listen(app.get('port'), function() {
    console.log('http://127.0.0.1:%d', app.get('port'));
});