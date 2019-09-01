//sunday01ex15_http3.js

var http = require('http');

var server = http.createServer();

server.listen(3000, function () {
    console.log('http://localhost:%d', 3000);
});

server.on('request', function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf8;"
    });
    res.write('<html>');
    res.write('<head>');
    res.write('<title>길동이 홈페이지 환영 ㄳㄳ</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>오오아아아아왕</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end('<h1>Hello http~!</h1>');
});
