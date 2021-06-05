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
// console.log("f1", f1(1, 2, 3, 4)); // iteratee is not function error 😡

// 4-13 유동적 인자 전달이 가능한 partial
let ___ = {};

function _toUndef(args1, args2, args3) {
  if (args2) args1 = args1.concat(args2);
  if (args3) args1 = args1.concat(args3);
  for (var i = 0, len = args1.length; i < len; i++)
    if (args1[i] == _) args1[i] = undefined;
  return args1;
}

function mergeArgs(args1, args2, args3) {
  if (!args2.length)
    return args3 ? _toUndef(args1, args3) : _toUndef(args1.slice());

  var n_args1 = args1.slice(),
    args2 = _.toArray(args2),
    i = -1,
    len = n_args1.length;
  while (++i < len) if (n_args1[i] == _) n_args1[i] = args2.shift();
  if (!args3) return _toUndef(n_args1, args2.length ? args2 : undefined);

  var n_arg3 = args3.slice(),
    i = n_arg3.length;
  while (i--) if (n_arg3[i] == _) n_arg3[i] = args2.pop();
  return args2.length
    ? _toUndef(n_args1, args2, n_arg3)
    : _toUndef(n_args1, n_arg3);
}

_.partial2 = function (fn) {
  var args1 = [],
    args3,
    len = arguments.length,
    ___idx = len;
  for (var i = 1; i < len; i++) {
    let arg = arguments[i];
    if (arg == ___ && (___idx = i) && (args3 = [])) continue;
    if (i < ___idx) args1.push(arg);
    else args3.push(arg);
  }
  return function () {
    return fn.apply(this, mergeArgs(args1, arguments, args3));
  };
};

// 새로운 partial method : _ 자리는 한칸씩 메꾸고 나머지가 ___ 자리로 들어가게 된다 -> undefined로 정의되지 않음 optional 임
// 왼쪽의 _ 가 우선순위가 높고 그다음 오른쪽의 _ 이고 그다음이 ___ 자리임.

var customPartial = _.partial2(console.log, ___, 2, 3);
customPartial(1); // 1 2 3
customPartial(1, 2, 3, 4, 5); // 1 2 3 4 5 2 3
console.log("=======================================");

var customPartial2 = _.partial2(console.log, _, 2, ___, 6);
customPartial2(1, 3, 4, 5);
customPartial2(1, 3, 4, 5, 7, 8, 9);
console.log("=======================================");

var customPartial3 = _.partial2(console.log, _, 2, ___, 5, _, 7);
customPartial3(1);
customPartial3(1, 3, 4);
customPartial3(1, 3, 4, 6, 8);

console.log("=======================================");

// 코드 4-15 m과 _partial2 다시 사용
var m_add_all = _.partial2(m, ___, add);

console.log("add_all", m_add_all(1, 2, 3, 4, 5));
console.log("add_all", m_add_all(1, 2, 3, 4, 50));

// 함수형 자바스크립트의 꽃은 바로 partial 이 아닐까 !
