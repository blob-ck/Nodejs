//sunday01ex03_exports

//사용자 정의 모듈을 exports할 경우 
//var calc = require('./node_ww01_ex01'); 상대경로를 사용해야 한다

var calc = {};

calc.minus = function(a, b) {
    return a - b;
}


//calc 객체를 모듈에 등록한다.
//모듈은 외부 파일에서 require하여 사용한다.
module.exports = calc;

//이렇게 하면 안됨
/*exports.plus = function(a, b) {
    return a + b;
}*/

//module.exports.plus = function(a, b) { 도 된다 <-- exports 다음에 calc 를 생략해도 calc의 속성으로 등록된다
calc.plus = function(a, b) {
    return a + b;
}