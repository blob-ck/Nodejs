//sunday01ex12_callback.js

//방법 1 : 선언 후 실행
function fn01() {
    console.log('fn01 함수 실행~!');
};

fn01();


//방법 2 : 선언과 동시에 실행
(function() {
    console.log('선언(state)과 실행을 동시에~!');
})();



//방법 3 : 함수 expression을 변수에 초기화
var fn02 = function() {
    console.log('변수에 저장 후 호출');
}
fn02();


//방법 4 : 기존 함수를 변수에 담기
var fn03 = fn01;
fn03();


//방법 5 : 기존함수로 콜백 사용하기
function fn04(callback) {
    if(typeof callback == 'function') {
        callback();
    }
}

fn04(fn01);
fn04(function() {
    console.log('선언과 동시에 콜백 실행');
});




//방법 6 : 기존함수로 콜백 사용하기 + 콜백에 객체 던져주기
function fn05(callback) {
    if(typeof callback == 'function') {
        callback({"name" : "홍호홓", "age" : 17});
    }
}

fn05(function(data) {
    console.log('선언과 동시에 콜백 실행');
    console.log(data.name, data.age);
});
















