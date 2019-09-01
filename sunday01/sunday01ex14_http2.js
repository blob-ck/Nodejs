//sunday01ex14_http2.js

var http = require('http');

var server = http.createServer();

server.listen(3000, function() {
   console.log('http://localhost:', 3000) ;
});


server.on('connection', function(socket) {
    console.log('connection......');
});

server.on('request', function(req, res) {
    console.log('request......');
    res.end('Request......');
    server.close();
});

server.on('close', function() {
    console.log('close......');
});
