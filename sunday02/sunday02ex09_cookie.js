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


app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', router);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, '/public')));
app.use(cors());
app.use(cookieParser());

//Cookie 설정 to Response
router.route('/process/setCookie').get(function(req, res) {
    console.log('/process/setCookie');
    res.cookie('user', {
        id          :   'Han',
        name        :   'FFFIIIRRREEE',
        authorized  :   true
    });
    
    res.redirect('/process/showCookie');
});

//Cookie 보기 from Request
router.route('/process/showCookie').get(function(req, res) {
    console.log('/process/showCookie');
    res.send(req.cookies);
});

router.route('/').get(function(req, res) {
    console.log('/ 요청됨');
    
    res.app.render('index', {}, function(err, html) {
        if(err) throw err;
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
        res.end(html);
    });
});


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