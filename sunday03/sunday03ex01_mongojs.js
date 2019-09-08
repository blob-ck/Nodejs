//sunday03ex01_mongojs.js
//mongo db 관련 모듈중 가장 간단한 모듈
var mongojs = require('mongojs');

//mongojs(db명, [컬렉션명]);
var db = mongojs('vehicle', ['car']);

db.car.find(function(err, data){
    console.log(data);
    
    
    
    //프로세스 강제종료
    process.exit();
});
