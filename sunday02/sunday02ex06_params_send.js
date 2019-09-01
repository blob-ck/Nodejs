//sunday02ex06_params_send.js
const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();

app.set('port', process.env.PORT||3000);
app.use('/', router);

router.route('/').get(function(req, res) {
    console.log('/ 요청됨');
    //res.writeHead(200, {"Content-Type" : "text/html;charset=utf8"});
    
    //res.send({"name" : "HOng", "age" : 22});
    res.redirect('http://google.com');
});

const server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('http://127.0.0.1:%d', app.get('port'));
});