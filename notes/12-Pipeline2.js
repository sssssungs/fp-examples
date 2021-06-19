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
