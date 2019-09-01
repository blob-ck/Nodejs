//sunday01ex02_process.js

//console.log(process.argv.length);
//console.log(process.argv);

process.argv.forEach(function(item, index){
   if(index < 0) return false;
    console.log(index, ':', item); 
});

console.log('os 환경 변수 : ', process.env['os']);