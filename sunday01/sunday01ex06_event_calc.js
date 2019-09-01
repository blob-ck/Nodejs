//sunday01ex06_event_calc.js

var util = require('util'); //Calc가  EventEmitter 를 상속받기 위해서
var EventEmitter = require('events').EventEmitter;

var Calc= function() {
    var self = this;
    this.on('stop', function() {
        console.log('==> Calc에 stop event 전달 됨.');
    });
}

//Calc가  EventEmitter 를 상속받는다.
util.inherits(Calc, EventEmitter);

Calc.prototype.add = function(a,b) {
    return a + b;
};

module.exports = Calc;
module.exports.title = 'calculator';