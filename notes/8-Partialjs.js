// 마이클 포거스의 _.pipeline은 multiple result를 지원하지 않고, 또 this를 사용할수 없다는 단점이 있다!
// Partialjs의 _.pipe는 mr, this를 모두 지원한다.

const _ = require("partial-js");

_.pipe(
  function () {
    return this.a;
  },
  console.log,
  function () {
    this.b = 2;
    return this;
  },
  console.log
).call({ a: 1 }); // {a:1}이 pipe 내부의 this가 된다.

var obj = {
  a: 10,
  method1: _.pipe(
    function () {
      return this.a;
    },
    console.log,
    function () {
      this.b = 2;
      return this;
    },
    console.log
  ),
};

obj.method1();
console.log("============================================");

//코드 4-25 즉시 실행 파이프라인 _.go
_.go(
  10,
  function (a) {
    return a / 2;
  },
  function (a) {
    return a + 2;
  },
  console.log
);

//코드 4-28 partial
// 첫번째 인자로 함수대신 문자열이 들어오면 객체의 메서드를 실행하기 위한 함수를 리턴한다. 그리고 나중에 객체와 추가 인자를 넘겨주면 된다.
var background = _.partial("css", "background");
// background($('body'), 'green') // $('body').css('background', 'green') 과 동일하게 동작
var concat = _.partial("concat"); // 첫번째 인자가 실행되는 method 명칭이다.
console.log(concat([1, 2], 3));

console.log("---------------------------------------");
// currying : 하나씩 받는다.
// 코드 4-29 부분 커링을 지원하지 않는 경우 함수로 감싸기
var values = function (data) {
  return _.map(data, function (v) {
    return v;
  });
};
console.log("values", values({ a: 1, b: 2, c: 4 }));
// 코드 4-30 _.partial을 이용한 부분 적용
var values2 = _.partial(_.map, _, function () {
  return v;
});
