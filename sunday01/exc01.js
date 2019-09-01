var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors);
app.get('/', function(req, res) {
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
    var print = '홈페이지~!';
    res.end(print);
});

var server = http.createServer(app);
var port = 3000;
var serverCB = function() {
    console.log('http://localhost:%d', port);
}

server.listen(port, serverCB);