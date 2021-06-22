const _ = require("partial-js");

var user = { name: "coco" };
_.go.call(
  user,
  32,
  function (age) {
    this.age = age;
  },
  function () {
    console.log(this.name);
  },
  function () {
    this.job = "rapper";
  }
);

console.log(user);

console.log("=============================");
//코드 5-33 indent 란 ?
var f1 = _.indent(
  function () {
    console.log("1 ===>", this, arguments, this.parent);
    return "hi1";
  },
  function () {
    console.log("2 ===>", this, arguments, this.parent);
  }
);

f1.call({ a: 10 }, 1, 2);

var f2 = _.indent(
  function (a) {
    this.b = a + 10;
  },
  function () {},
  function () {},
  function () {
    console.log(this.b);
  }
);

f2(5);
f2(7);
console.log("--------------");
// 코드 5-36 indent 를 두번이상 하기.
var f3 = _.indent(
  function (a) {
    this.b = a + 10;
  },
  _.indent(
    function () {
      this.b = 20;
      console.log("this.b", this.b);
      console.log("this.parent.b", this.parent.b);
    },
    function () {
      console.log("this.parent.arguments", this.parent.arguments);
    }
  ),
  function () {
    console.log("this.b", this.b);
  }
);

f3(5);
console.log("===========================================");

// 5.4.4 무조건 비동기로 시작하는 async
// 코드 5-37
// _.go
//   .async(1, function (a) {
//     return a;
//   })
//   .then(console.log);
// console.log(11); // 무조건 비동기로 동작하도록 해서 11이 먼저 보여지고 위에 1이 보여짐.

// 코드 5-38 비동기제어
_.go(
  20,
  _.branch(
    // branch 내부에서는 비동기가 제어가 된다.
    function (a) {
      return new Promise(function (resolve) {
        resolve(a + 10);
      });
    },
    function (a) {
      // a+10 을 기다림
      console.log("두번째", a);
      return a * a;
    },
    console.log
  ),
  console.log // 20은 즉시 내려와서 찍힘.
); // >>>> 결과 20 , 30 , 900 -- 30보다 20이 먼저 찍혔다.
