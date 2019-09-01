//sunday02ex09_cookie.js
const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const static = require('serve-static');
const cors = require('cors');

//cookie-parser 미들웨어 설치
//npm install cookie-parser -save
const cookieParser = require('cookie-parser');

//session 미들웨어 설치
//npm install express-session -save
const expressSession = require('express-session');

//multer 모듈 설치
//npm install multer --save
const multer = require('multer');

app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, '/public')));
app.use(cors());
app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));


let storage = multer.diskStorage({
    "destination"   :   function(req, file, callback) {
        callback(null, 'uploads');
    },
    "filename"      :   function(req, file, callback) {
//        callback(null, file.originalname);
//        callback(null, file.originalname + Date.now());
        callback(null, file.originalname)
    }
});

let upload = multer({
    "storage"   :   storage,
    "limits"    :   {
        "files"     :   10,
        "fileSize"  :   1024*1024*1024
    }
});

router.route('/process/photo').post(upload.array('photo', 1), function(req, res) {
    console.log('process/photo 요청 날라옴~');
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf8;"});
    res.end('파일 저장 완료!');
});


router.route('/process/login').post(function(req, res) {
    console.log('/process/login');
    
    let paramId = req.body.userid;
    let paramPwd = req.body.password;
    
    if(req.session.user) {
        console.log('이미 로그인 된 상태입니다. 상품페이지로 이동!');
        res.redirect('/process/product');
    } else {
        req.session.user = {
            "userid"    :   paramId,
            "name"      :   paramPwd,
            "authorized"  :   true
        }
        
        res.writeHead(200, {"Content-Type"  :   "text/html;charset=utf8"});
        res.write('<h1>로그인 성공~!</h1>');
        res.write('<p><a href="/process/product">상품페이지</a></p>');
        res.write('<p><a href="/process/logout">로그아웃</a></p>');
        res.end();
    }
});

router.route('/process/logout').get(function(req, res) {
    if(req.session.user) {
        req.session.destroy(function(err) {
            if(err) throw err;
            res.redirect('/public/login.html');
        });
    } else {
        console.log('로그아웃 상태! 로그인 페이지로 이동합니다.');
        res.redirect('/public/login.html');
    }
});

router.route('/process/product').get(function(req, res) {
    console.log('/process/product');
    if(req.session.user) {
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
        res.write("PRODUCT Page");
        res.write('<p><a href="/process/logout">로그아웃</a></p>');
        res.end();
    } else {
        console.log('로그아웃 상태! 로그인 페이지로 이동합니다.');
        res.redirect('/public/login.html');
    }
});

router.route('/').get(function(req, res) {
    console.log('/ 요청됨');
    
    res.app.render('index', {}, function(err, html) {
        if(err) throw err;
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
        res.end(html);
    });
});


//router 미들웨어 사용 시 router 설정이 끝난 후에 작성
app.use('/', router);

//다른 모든 라우팅 패스 설정 이후 설정해야 한다.
//npm install express-error-handler --save 미들웨어 설치
const expressErrorHandler = require('express-error-handler');
const errorHandler = expressErrorHandler({
    static: {
        '404'   :   __dirname + '/public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


const server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('http://127.0.0.1:%d', app.get('port'));
});