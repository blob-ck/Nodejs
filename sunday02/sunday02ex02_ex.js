const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const server = http.createServer(app);

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

router.route('/').get(function(req, res) {
    let data = {
        "title" :   "홈홈홈",
        "name"  :   "김노드"
    }
    res.app.render('home', {"data" : data}, function(err, html) {
        if(err) throw err;
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf8;"});
        res.end(html);
    });
});

router.route('/profile').get(function(req, res) {
    let data = {
        "title" :   "프로필 페이지",
        "name"  :   "박므사"
    };
    res.app.render('profile', {"data" : data}, function(err, html) {
        if(err) throw err;
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf8;"});
        res.end(html);
    });
});

app.use('/', router);

server.listen(app.get('port'), function() {
    console.log('http://127.0.0.1:%d', app.get('port'));
});