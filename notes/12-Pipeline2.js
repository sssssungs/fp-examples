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
      console.log(this.b);
      console.log(this.parent.b);
    },
    function () {
      console.log(this.parent.arguments);
    }
  ),
  function () {
    console.log(this.b);
  }
);

f3(5);
