function memoize(func) {
  var cache = {};
  return function (arg) {
    if (cache[arg]) {
      console.log("캐시결과에서 바로 리턴", arg);
      return cache[arg];
    }
    console.log("본체 실행함.", arg);
    return (cache[arg] = func.apply(this, arguments));
  };
}

var mult5 = memoize(function (a) {
  return a * 5;
});
console.log(mult5(1));
console.log(mult5(2));
console.log(mult5(1));
console.log(mult5(2));

var add = memoize(function (a, b) {
  return a + b;
});
console.log(add(3, 5));
console.log(add(3, 10)); // multiple arguments를 사용할수 없다.

const _ = require("partial-js");

// underscore의 memoize 내부
_.memoize = function (func, hasher) {
  var memoize = function (key) {
    var cache = memoize.cache;
    var address = "" + (hasher ? hasher.apply(this, arguments) : key);
    // 캐시한 결과가 null, 0, undefined 일수 있기 때문에 has 사용
    if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
    return cache[address];
  };
  memoize.cache = {}; // 메모리 관리 할수 있도록
  return memoize;
};

// partial의 memoize2 (memoize는 underscorejs와 동일함)
var f1 = _.memoize2(function (obj) {
  console.log("함수본체에 들어옴");
  return obj.a + 10;
});

var obj1 = { a: 1 };
var obj2 = { a: 2 };

console.log(f1(obj1));
console.log(f1(obj1)); // 캐시
console.log(f1(obj1)); // 캐시
console.log(f1(obj2));
console.log(f1(obj2)); // 캐시
// memoize2 는 각 함수들에 대한 결과값을 인자로 사용된 객체에 담아두므로 한번 사용하고
// 버리는 객체라면 그 값은 별도의 관리 없이도 메모리에서 비워진다. 캐시를 별도로 관리안해도 알아서 해줌.

var evens = _.memoize2(function (list) {
  console.log("함수본체에 들어와서 루프 실행");
  return _.filter(list, function (num) {
    return num % 2 == 0;
  });
});

// mutable 예제
var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(evens(list));
console.log(evens(list)); // 캐시를 사용하여 loop를 돌지 않음
list.push(11);
list.push(12);
console.log(evens(list)); // 캐시를 사용하여 12가 나오지 안음.

// immutable 예제
var list2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(evens(list2));
console.log(evens(list2)); // 캐시 사용
list2 = list2.concat(11, 12);
console.log(evens(list2));
console.log(evens(list2)); // zotltkdyd
