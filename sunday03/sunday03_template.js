//sunday03ex03_login.js
//1
//npm install ejs --save
const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const static = require('serve-static');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


//3 port
app.set('port', process.env.PORT || 3000);


//4 view engine 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//npm install ejs --save

//5 static : 공개 폴더 설정
app.use('/public', static(path.join(__dirname, 'public')));

//7 body parser 설정
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//9 mongoDB 연결설정
var db;
function dbConnection() {   // server.listen에서 사용 
    //상단에서 설정
    // var MongoClient = require('mongodb').MongoClient;
    var dbUrl = 'mongodb://localhost';
    
    //shell에서 직접 실행시 보안경고가 뜨면 {useNewUrlParser:true, useUnifiedTopology:true} 를 추가
    MongoClient.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology:true}, function(err, client) {
        if(err) throw err;
        console.log('MongoDB Connection 성공 : %s', dbUrl);
        
        var db = client.db('local');

    });
}


//11 AuthUser - router 에서 사용(로그인 절차)
var authUser = function(database, loginData, callback) {
    console.log('loginData : %j',loginData);
    //database에서 컬렉션 받아오기
    users = database.collection('users');
    users.find(loginData).toArray(function(err, docs) {
        if(Array.isArray(docs)) {
            console.log('Array 맞다');
        } else {
            console.log('Array 아니다');
        }
    });
    
}




//8 router 설정
router.route('/process/login').post(function(req, res) {
    console.log('/process/login 요청됨');
    var loginData = {
        id:req.body.id,
        password:req.body.password
    }
    
    console.log(`paramId:${req.body.id}, paramPwd:${req.body.password}`);
    
    //12 로그인 검증
    authUser(db, loginData, function(err, docs) {
        
    });
    
    res.end(req.body.id+", "+req.body.password); 
});



//6 router 미들웨어 설정(서버 실행 전)
app.use('/', router);


//2
const server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('http://localhost:%d', app.get('port'));
    
//10 서버 실행 후 바로 db 연결
    dbConnection(); 
});
