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
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

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

app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));



//9 mongoDB 연결설정
var db;
var dbVehicle;
function dbConnection() {   // server.listen에서 사용 
    //상단에서 설정
    // var MongoClient = require('mongodb').MongoClient;
    var dbUrl = 'mongodb://localhost';
    
    //shell에서 직접 실행시 보안경고가 뜨면 {useNewUrlParser:true, useUnifiedTopology:true} 를 추가
    MongoClient.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology:true}, function(err, client) {
        if(err) throw err;
        console.log('MongoDB Connection(local) 성공 : %s', dbUrl);
        
        db = client.db('local');
        dbVehicle = client.db('vehicle');
    });
}

//function dbVehicleConnection() {   // server.listen에서 사용 
//    //상단에서 설정
//    // var MongoClient = require('mongodb').MongoClient;
//    var dbUrl = 'mongodb://localhost';
//    
//    //shell에서 직접 실행시 보안경고가 뜨면 {useNewUrlParser:true, useUnifiedTopology:true} 를 추가
//    MongoClient.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology:true}, function(err, client) {
//        if(err) throw err;
//        console.log('MongoDB Connection(vehicle) 성공 : %s', dbUrl);
//
//        dbVehicle = client.db('vehicle');
//    });
//}


//11 AuthUser - router 에서 사용(로그인 절차)
var authUser = function(database, loginData, callback) {
    console.log('loginData : %j',loginData);
    //database에서 컬렉션 받아오기
    var users = database.collection('users');
    users.find(loginData).toArray(function(err, docs) {
        
        if(err) {
                        console.log('Error 발생!');
            console.log('Error 발생!');
            callback(err, null);
            return;
        }
        
        if(docs != null && docs != undefined && Array.isArray(docs)) {
            if(docs.length > 0) {
                //console.log(docs[0]);
                callback(null, docs);
            } else {
                console.log('사용자가 없음');
                callback(null, null);
            }
        } else {
        
        }
    });
}

function addUser(dataBase, userData, callback) {
    console.log("::: adduser :::");
    console.log(userData);
    //callback(null, userData);
    
    //users 컬렉션을 연결하는 객체 생성
    var users = dataBase.collection('users');
    
    
    //insertMany 를 사용하여 다중 insert
    users.insertMany([userData], function(err, result) {
        if(err) {
            callback(err, null);
            return;
        }
        
        if(result.insertedCount > 0) {
            console.log('사용자 정보 추가 성공~!');
        } else {
            console.log('사용자 정보 추가 성공~!');
        }
        
        callback(null, userData);
    });
    
    
}


var getVehicleList = function(database, vehicleSrchCon, callback) {
    console.log('getVehicleList');
    //database에서 컬렉션 받아오기
    var car = database.collection('car');
    car.find(vehicleSrchCon).toArray(function(err, docs) {
        
        if(err) {
            console.log('Error 발생!');
            callback(err, null);
            return;
        }     
        
        if(docs != null && docs != undefined && Array.isArray(docs)) {
            if(docs.length > 0) {
                //console.log(docs[0]);
                callback(null, docs);
            } else {
                console.log('등록된 차량이 없음');
                callback(null, null);
            }
        } else {
            console.log('배열이 아니여');
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
    
    if(db) {
        //12 로그인 검증
        authUser(db, loginData, function(err, docs) {
            if(err) {
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.end('데이터베이스 에러 발생!');
                return;
            }

            if(docs != null && docs.length > 0) {
                //세션에 로그인정보 담기(cookie-parser, express-session)
                req.session.user = {
                    loginData : loginData,
                    name : docs[0].name,
                    authorized : true
                }
                
                //상품정보 페이지로 이동
                res.redirect('/process/product');
                
            } else {
                res.redirect('/public/login.html');
            }  
        });
    } else {   
        res.end('DB(local) 접속이 안되어있습니다!'); 
    }
});




router.route('/process/logout').get(function(req, res) {
    console.log('/process/logout 요청됨');
    if(req.session.user) {
        req.session.destroy(function(err) {
            if(err) throw err;
            console.log('세션 삭제 및 로그아웃 성공!');
        });
    } else {
        console.log('아직 로그인 전~!');
    }
    
    res.redirect('/public/login.html');
});




router.route('/process/adduser').post(function(req, res) {
    console.log('/process/adduser 요청!');
    var userData = {
        id      : req.body.id,
        name    : req.body.name,
        password: req.body.password
    };
    
    if(db) {
        addUser(db, userData, function(err, result) {
            if(err) throw err;
            console.log(result.insertedCount);
            
            if(result && result.insertedCount > 0) {
                console.log(result);
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8;"});
                res.write('사용자 추가 성공~~~');
                res.end();
            } else {
                console.log('사용자 추가 실패!');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8;"});
                res.write('사용자 추가 성공~~~');
                res.end();
            }
        });
    }
});




router.route('/process/product').get(function(req, res) {
    console.log('/process/product 요청됨~!'); 
    
    var vehicleSrchCon = {};
    
    if(dbVehicle) {
        getVehicleList(dbVehicle, vehicleSrchCon, function(err, docs) {
            if(req.session.user) {
                req.app.render('product', {"cars" : docs}, function(err, html) {
                    if(err) throw err;
                    res.end(html);
                });
            } else {
                console.log('로그인 안됨~!');
                res.redirect('/public/login.html');
            }
        });

    } else {   
        res.end('DB(vehicle) 접속이 안되어있습니다!'); 
    }

});


//6 router 미들웨어 설정(서버 실행 전)
app.use('/', router);


//2
const server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('http://localhost:%d', app.get('port'));
    
//10 서버 실행 후 바로 db 연결
    dbConnection();
    //dbVehicleConnection();
});
