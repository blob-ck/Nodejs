//sunday01ex07_event_calc_test.js
var Calc = require('./sunday01ex06_event_calc');

var calc = new Calc();
calc.emit('stop');

console.log(Calc.title + '에 stop 이벤트 전달함');

console.log(calc.add(3,2));