var _ = {};
// var hi = _.once(function () {
//   console.log("hi");
// });

// 오직 한번만 실행되는 함수 만들기

_.once = function (func) {
  var flag, result;
  return function () {
    if (flag) return result;
    flag = true;
    // console.log("qqqqqqqqqqqqq", this, arguments);
    return (result = func.apply(this, arguments));
  };
};

var a = _.once(function () {
  console.log("A");
  return "B";
});

console.log("==== once ====", a());
console.log("==== once ====", a());

// 다시 물어보지 않는 함수
function skip(body) {
  var yes;
  return function () {
    return yes || (yes = body.apply(null, arguments));
  };
}

// 코드 4-5 id를 증가시키는 함수
function idMaker(start) {
  return function () {
    return ++start;
  };
}

var messageCid = idMaker(0);
console.log("m first ==>", messageCid());
console.log("m second ==>", messageCid());
var postCid = idMaker(10);
console.log("m first ==>", postCid());
console.log("m third ==>", messageCid());
