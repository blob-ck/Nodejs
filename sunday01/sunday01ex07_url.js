//sunday01ex07_url.js
var url = require('url');
var curURI = url.parse('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=okky');
console.log('URI query String : %s', curURI.query);

var queryString = require('');