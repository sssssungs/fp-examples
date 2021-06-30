// 순수함수에 대해!
// 6-1
function add(a, b) {
  // 순수함수
  return a + b;
}

function add2(obj, value) {
  // 순수함수가 아닌 함수 (obj 의 상태를 변경한다)
  // 만일 obj.value 를 사용하는 코드가 여기 외에 다른곳에도 있다면 영향을 줄수가 있다 !
  obj.value = obj.value + value;
  return obj.value;
}

function add3(obj, value) {
  // 작은 차이지만 순수함수 (obj.value 를 참조만 하고 있음)
  return obj.value + value;
}

function add4(obj, value) {
  //  작은 차이지만 순수함수 (obj.value 를 참조만 하고 있음)
  return { value: obj.value + value };
}

const _ = require("partial-js");

// 6-2 자신의 상태를 변경하는 메서드 Array.prototype.sort
var user1 = [
  { name: "AA", age: 32 },
  { name: "bb", age: 25 },
  { name: "cc", age: 32 },
  { name: "dd", age: 28 },
  { name: "ee", age: 27 },
];

var comparator = function (a, b) {
  if (a.age < b.age) return -1;
  if (a.age > b.age) return 1;
  return 0;
};

var sortedUser1 = user1.sort(comparator); // 자기 자신을 바꾸고, 자기 자신을 리턴한다!!!
console.log("sortedUser1", sortedUser1, "user1", user1); // user1도 바뀌고, 그 바뀐 결과가 리턴됨
console.log("비교해보기", user1 == sortedUser1);
console.log(_.pluck(sortedUser1, "age"));
console.log(_.pluck(user1, "age"));
console.log("===============================");
// 6-3 정렬된 새로운 값을 만드는 sortby
var user2 = [
  { name: "AA", age: 32 },
  { name: "bb", age: 25 },
  { name: "cc", age: 32 },
  { name: "dd", age: 28 },
  { name: "ee", age: 27 },
];
var sortedUser2 = _.sortBy(user2, "age");
console.log("비교해보기", user2 == sortedUser2);
console.log(_.pluck(sortedUser2, "age"));
console.log(_.pluck(user2, "age"));
// 결과는 다르지만 그 배열안에있는 모든 값은 새로운 값이 아닌 기존의 값으로 동일. 순서만 달라짐.
