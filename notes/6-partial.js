const _ = require("underscore");

// 코드 4-8 partial 복습하기
const pc = _.partial(console.log, 1);
pc(2); // 1 2
pc(2, 3); // 1 2 3

const pc2 = _.partial(console.log, _, 2);
pc2(1); // 1 2 >>> _ 자리에 들어감
pc2(1, 3); // _ 자리에 1, 뒤에 3 이 들어감

const pc3 = _.partial(console.log, _, _, 3);
pc3(1); // 1 undefined 3
pc3(1, 2); // 1 2 3
pc3(1, 2, 4); // 1 2 3 4

const pc4 = _.partial(console.log, _, 2, _, 4, _);
pc4(1); // 1 2 undefined 4 undefined

console.log("========================");
// 코드 4-9 add all
const add_all = _.partial(_.reduce, _, (a, b) => a + b); // reduce 의 첫번째 인자로 넣을거를 받고, function 은 더하기를 전달한다!
console.log("add_all", add_all([1, 2, 3, 4, 5, 5]));

// 코드 4-10 method 를 partial 함수를 이용해서 만들기
const method = function (obj, method) {
  console.log("arguments", arguments);
  return obj[method].apply(obj, _.rest(arguments, 2));
};

const push = _.partial(method, _, "push");
const shift = _.partial(method, _, "shift");

const array = [1, 2];
push(array, 3);
console.log("push method", array);
shift(array);
console.log("shift method", array);

const barray = method([1, 2, 3], "concat", 4, 5);
console.log("b array", barray);

console.log("=======================================");
// 4.2.2 partial compose로 함수만들기
// compose는 오른쪽의 함수를 실행한 결과를 왼쪽의 함수에게 전달하는것을 반복
// 코드 4-11
_.compose(
  console.log,
  function (a) {
    return a - 2;
  },
  function (a) {
    return a + 5;
  }
)(1); // 1 + 5 >> 6 - 2 >> log

const falsy_values = _.compose(
  _.partial(_.isEqual, -1),
  _.partial(_.findIndex, _, _.identity)
);

console.log("falsy_values", falsy_values([1, true, {}]));
console.log("falsy_values", falsy_values([1, 0, false]));
console.log("falsy_values", falsy_values([0, "", false]));
console.log("=======================================");
const some = _.negate(falsy_values);

console.log("some", some([1, true, {}]));
console.log("some", some([1, 0, false]));
console.log("some", some([0, "", false]));
console.log("=======================================");
const every = _.compose(
  _.partial(_.isEqual, -1),
  _.partial(_.findIndex, _, _.negate(_.identity))
);

console.log("every", every([1, true, {}]));
console.log("every", every([1, 0, false]));
console.log("every", every([0, "", false]));
console.log("=======================================");

// _.partial은 왼쪽에서부터 순서대로 하나하나 적용되므로, 그 개수가 정해져 있어야한다. 자바스크립트의 함수는 인자개수가 유동적일 수 있고
// 함수의 마지막 인자를 중요하게 사용할수도 있는데 이같은 함수와 _.partial은 궁합이 잘 맞지 않는다.

//코드 4-12
// arrow function의 this는 window이므로, argument도 window에 따르는 형태를 가진다! 주의!!
function add(a, b) {
  return a + b;
}
function m() {
  const iter = arguments[arguments.length - 1];
  arguments.length--;
  return _.reduce(arguments, iter);
}

console.log("m", m(100, 50, add));
console.log("m", m(100, 50, 10, add));
console.log("m", m(100, 50, 10, 5, add));

const f1 = _.partial(m, _, _, _, add); // 꼭 3개만 넘길수 있다.
console.log("f1", f1(1)); // NaN
console.log("f1", f1(1, 2)); // NaN
console.log("f1", f1(1, 2, 3)); // Good
console.log("f1", f1(1, 2, 3, 4)); // iteratee is not function error 😡
