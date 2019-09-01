//sunday01ex01_console.js

//단축키
//행 복사 Ctrl + d
//행 이동 Ctrl + Shift + up || down

/*
console.log('Hello World');
console.log("Hello", "World");

//변환문자열 사용하여 출력하기
console.log("숫자 보여주기: %d", 10);
console.log("문자 보여주기: %s", '기생충');
console.log("JSON 객체 보여주기: %j", {"name" : '기생충'});


var name = '김길동';
console.log("name = "+ name);

//템플릿 문자열 사용
console.log(`성명 = ${name}`);


console.log("JSON 객체 보여주기: " + {"name" : '기생충'});
console.log("JSON 객체 보여주기: " + JSON.stringify({"name" : '기생충'}));
console.log("JSON 객체 보여주기: " , {"name" : "기생충"});*/



//실행시간 출력하기
var result = 0;
console.time('time_check');

for(var i = 0; i < 10000; i++) {
    result += i;
}

console.timeEnd('time_check');
console.log("result = ", result);



//노드 기본속성 사용?
console.log("현재 실행 파일 명 : &s", __filename);
console.log("현재 실행 파일 경로명 : &s", __dirname);
