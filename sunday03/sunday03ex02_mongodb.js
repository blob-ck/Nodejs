//sunday03ex02_mongodb.js
var MongoClient = require('mongodb').MongoClient;

//mongodb 모듈 2.x 버전 : dbUrl에 db를 포함한다.
var dbUrl = 'mongodb://localhost';

MongoClient.connect(dbUrl, function(err, client) {

    if(err) throw err;
    
    //mongodb 모듈 3.x 버전 : db를 별도로 호출한다.
    var db = client.db('vehicle');
    
    db.collection('car').findOne({}, function(findErr, result) {
        if(findErr) throw findErr;
        console.log(result.name);
        client.close;
    });
});