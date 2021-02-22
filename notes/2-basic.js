const obj = {};
const a = 1;
obj[a > 2 ? "a" : "b"] = a; // 대괄호 내부에서는 코드 형태도 가능하다.
console.log(obj);
console.log("===========================================");
// 함수를 객체로 사용하기
function Obj8() {}
Obj8.a = 1;
Obj8.b = 2;

const test = new Obj8();
test.a = 1;
console.log("객체 형태의 함수 인스턴스?", test);
console.log("===========================================");

// 코드 2-8 배열에 숫자가 아닌 Key 사용하기
const obj10 = [];
obj10.a = 1;
// 가능은 하지만 이 경우 length 는 변하지 않는다. 1개를 넣었지만 length가 0으로 나옴.
console.log("배열에 숫자가 아닌 key 사용하기", obj10, obj10.length);
console.log("===========================================");

// 코드 2-10 한번에 length 올리기! 안티패턴이므로 사용은 자제하기.
const obj12 = [];
obj12.length = 5;
console.log("한번에 length 올리기", obj12);

const obj13 = [1, 2];
obj13[5] = 5;
console.log("한번에 올리잣.", obj13, obj13.length);
obj13.push(6);
console.log("한번에 올리잣.", obj13, obj13.length);
// 참고로 근소한 차이지만 arr.push(1) 보다 arr[i]=1 이 성능은 더 좋다!

// ==========================================================
//기본객체의 메서드 지우기
console.log("===========================================");

const obja = { a: 1, b: 2, c: 3 };
delete obja.a;
console.log(obja);
delete obja["b"];
console.log(obja);

// delete Array.prototype.push // 이런것도 됨 이렇게 사용하면 이후에 push를 사용할 수 없음.
console.log("===========================================");
// 코드 2-13 일반적인 함수의 정의

// console.log(add1(10, 5)); // hoisting 일어남.
// console.log(add2(10, 5)); // hoisting 일어났으나, 실행되지는 않음??

// 아래처럼 실행하면 둘다 에러가 나지 않는다! 고로 이는 hoisting이 발생한 것이다!
console.log(add1);
console.log(add2);

// 이것의 이유는 변수와 함수의 선언차이 이기 때문
// 변수: 선언과 초기화가 동시에 이루어지지 않기 때문에 호이스팅에 의해 참조만 가능
// 함수: 선언과 초기화가 동기에 이루어지기 때문에 호이스팅에서 참조뿐만 아니라 실행도 가능한것.
// add2의 경우 변수를 선언해서 익명함수를 담았기 때문에 호이스팅에 의해 미리 참조할수있지만 값이 없어 실행할수는 없다!

function add1(a, b) {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
};
var m = {
  add3: function (a, b) {
    return a + b;
  },
};
// 큰 차이는 없어보이지만 hoisting에서 문제가 발생할 수 있다.
console.log("===========================================");

// 코드 2-18 호이스팅 이용해서 return 문 아래에 함수선언하기.
function add(a, b) {
  return valid() ? a + b : new Error();
  function valid() {
    return Number.isInteger(a) && Number.isInteger(b);
  }
}
console.log(add(1, 2));

console.log("===========================================");

// 괄호없이 실행하기!
(function (a) {
  console.log(a);
})(100);

!(function (a) {
  console.log(a);
})(1);

// 2-27 즉시 실행하면서 this 할당하기
const az = function (a) {
  console.log(this, a);
}.call([1], 1);

/////////////////////////////// eval 과 new Function
// 코드 2-28
const a2222 = eval("10+5");
const newFunction = new Function("a,b", "return a*b");
function test222() {
  return (a = 2);
}
const aaa = (bbb = 1);
console.log(aaa, bbb);

//// 유명함수
// 코드 2-38 유명함수에서 자기 자신을 참조하는법
var f1 = function () {
  console.log("f1", f1);
};

f1();

var f2 = function () {
  console.log(arguments.callee);
};
f2();
var f3 = f2;
f2 = null;
f3();
console.log("======================================================");
// 코드 2-40 유명함수의 자기 참조
var ff1 = function f() {
  console.log(f);
};
ff1();
var ff2 = ff1;
ff1 = null;
ff2();

// 2-41 안전하고 편한 자기 참조
var hi = 1;
var hello = function hi() {
  console.log(hi);
};
hello();
console.log(hello.name === "hi");
// 내부 스코프에서만 사용하기 때문에 이름이 중복되어도 된다
var z1 = function z() {
  console.log(z, 1);
};
var z2 = function z() {
  console.log(z, 2);
};
console.log(z1.name === z2.name);

// 코드2-42 재귀를 이용한 flatten
function flatten(arr) {
  return (function f(arr, new_arr) {
    arr.forEach(function (v) {
      Array.isArray(v) ? f(v, new_arr) : new_arr.push(v);
    });
    return new_arr;
  })(arr, []);
}

console.log("flatten", flatten([1, [[2]], [3]]));