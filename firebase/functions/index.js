
const functions = require('firebase-functions');
const firebase = require('firebase');
const admin = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const ejs = require('ejs');
const fs = require('fs');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');

require("firebase/auth");
require("firebase/database");

//https://firebase.google.com/docs/web/setup
//DataBase 설정 추가
/*
let firebaseConfig = {
    apiKey: "AIzaSyBPizTc_oZqt_t1epWHDJPsw6kfkzbOKCY",
    authDomain: "fire-4d7cb.firebaseapp.com",
    databaseURL: "https://fire-4d7cb.firebaseio.com",
    projectId: "fire-4d7cb",
    storageBucket: "fire-4d7cb.appspot.com",
    messagingSenderId: "157716423009",
    appId: "1:157716423009:web:246bbde8d0bc75d851a520"
};
*/

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
/** admin.initializeApp(firebaseConfig); */
let serviceAccount = require('./fire-4d7cb-firebase-adminsdk-267ed-4d8705e464.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//DB 객체 가져오기
const db = admin.firestore();




//app.get('/home', (request, response) => {
//    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
//
//    fs.readFile('./views/index.ejs', 'utf8', function(error, data) {
//        response.writeHead(200, {'Content-Type':'text/html'});
//        response.end(ejs.render(data,{cars:[{name:'SM3',price:2000,year:1999,company:'SAMSUNG'},{name:'SM9',price:6000,year:2013,company:'SAMSUNG'}]}));
//    })   
//});

//뷰엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body-parser 설정
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


router.route('/car/:_id').get(function(req, res) {
    console.log("/car/:id 요청 ...");
    let _id = req.param("_id");
    let carRef = db.collection('car').doc(_id);
    let getDoc = carRef.get()
           .then(doc => {
            if(!doc.exists) {
                console.log('No such document!!!');
            } else {
                console.log('Document Data :  '+ doc.data());
                let carData = doc.data();
                carData._id = _id;
                req.app.render('car_detail', {car : carData}, function(err, html) {
                    if(err) throw err;
                    res.end(html);
                });
            }
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
});


router.route('/cars/list').get(function(req, res) {
    console.log('/cars/list 호출됨...');
    //console.log(firebase.app().name);
    console.log(admin.app().name);
    
    let carRef = db.collection('car');
    let allCars = carRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            
            let carList = [];
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                let row = doc.data();
                row._id = doc.id;
                carList.push(row);
            });
            
            req.app.render('car_list', {cars : carList}, function(err, html) {
                if(err) throw err;
                res.end(html);
            });
            
            /*let result = snapshot.map(doc => doc.data());
            req.app.render('car_list', {cars : result}, function(err, html) {
                if(err) throw err;
                res.end(html);
            });*/
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    
//    let carList = [];
//    
//    req.app.render('car_list', {cars : carList}, function(err, html) {
//        if(err) throw err;
//        res.end(html);
//    });
    
});

router.route('/car/list/hard').get(function(req, res) {
    console.log('/car/list/hard 하드코딩 데이터 carList 호출됨...');
    
    let carList = [
        {name:'SM3',price:2000,year:1999,company:'SAMSUNG'},
        {name:'SM6',price:4000,year:2007,company:'SAMSUNG'},
        {name:'SM9',price:6000,year:2013,company:'SAMSUNG'}
    ];
    
    req.app.render('car_list', {cars : carList}, function(err, html) {
        if(err) throw err;
        res.end(html);
    });
    
});



router.route('/car/input').post(function(req, res) {
    console.log('/car/input 호출됨...');
    console.log('name = ' + req.body.name);
    console.log('company = ' + req.body.company);
    console.log('price = ' + req.body.price);
    console.log('year = ' + req.body.year);
    
    let carData = {
        name:   req.body.name,
        company:req.body.company,
        price:  req.body.price,
        year:   req.body.year
    }
    console.log(carData);
    let addDoc = db.collection('car').add(carData).then(ref => {
        console.log('Added document with ID: ', ref.id);
        res.redirect('/cars/list');
    }).catch(err => res.end('/car/input -- Input Error'));

});



app.use('/', router);
exports.app = functions.https.onRequest(app);