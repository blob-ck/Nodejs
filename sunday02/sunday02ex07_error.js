//sunday02ex07_error.js
const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const static = require('serve-static');


app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', router);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, '/public')));

router.route('/').get(function(req, res) {
    console.log('/ 요청됨');
    
    res.app.render('index', {}, function(err, html) {
        if(err) throw err;
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
        res.end(html);
    });
});


//다른 모든 라우팅 패스 설정 이후 설정해야 한다.
app.all('*', function(req, res) {
    res.status(404).send('<h1>404 ERROR 페이지 없다</h1>');
});

const server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('http://127.0.0.1:%d', app.get('port'));
});