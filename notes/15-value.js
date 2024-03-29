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
console.log("===============================");

// 6-5 reject 또한 새로운 배열을 리턴한다. 하지만 내부의 값은 그대로임.
var rejectedUser2 = _.reject(user2, function (user) {
  return user.age < 30;
});
console.log("rejectedUser2", rejectedUser2);
console.log(rejectedUser2 == user2);
console.log(rejectedUser2[0] == user2[0]);

console.log("===============================");

// 6-8 차이는 3명입니다. 함수조합버전
function sub(a, b) {
  return a - b;
}
var diff2 = _.pipe(
  function (users, predi) {
    return sub(users.length, _.reject(users, predi).length);
  },
  _.s$("차이는 {{$}}명 입니다."),
  console.log
);

diff2(user2, function (user) {
  return user.age < 30;
});
diff2(user2, function (user) {
  return user.age > 30;
});
diff2(user2, function (user) {
  return user.age == 25;
});
_.go(
  user2,
  _(diff2, _, function (user) {
    // _ == _.partial
    return user.age == 32;
  })
);
_.go(
  user2,
  _.reject(function (user) {
    return user.name == "AA";
  }),
  _(diff2, _, function (user) {
    return user.age == 32;
  })
);
// 재사용성이 높고, 다양한 조합이 가능하다 !!!!!

console.log("===============================");

// 6-11 clone
var product1 = {
  name: "AB",
  price: 1000,
  sizes: ["s", "m", "l"],
  colors: ["red", "blue"],
};
var product2 = _.clone(product1);
console.log(product1 == product2);
product2.name = "CD";
console.log(product1.name, product2.name);
// clone 으로 복사하면 영향을 끼치지 않는 독립적인 새로운 객체를 반환한다. 하지만 객체 내부의 모든 값들까지 복사하는것은 아니다.
product2.sizes.push("xl");
console.log(product2.sizes);
console.log(product1.sizes); // product1 도 변경된다. 객체 내부의 객체는 복사하지 않는다.
// clone은 동일한 key들을 가진 새로운 객체를 만들면서 각 키에 기존의 키에 해당하는 밸류를 할당한다. 때문에 내부의 값이 객체라면
// 같은 객체를 바라보게 된다. (둘은 서로 다르지만 내부 객체의 경우 공유하게 되는)

// 6-13 clone 구현
_clone = function (obj) {
  var cloned = _.isArray(obj) ? [] : {};
  var keys = _.keys(obj);
  _.each(keys, function (key) {
    cloned[key] = obj[key];
  });
  return cloned;
};

// 6-15 extend , defaults 로 복사하기
var product22 = _.extend({}, product1, { name: "VVVV" }); // extend의 경우 왼쪽 객체에 없는 값은 확장하고, 왼쪽 객체에 있는 값은 덮어쓴다.
var product33 = _.defaults({ name: "QQQQQQ", price: 1 }, product1); // default의 경우 왼쪽에 없는 값만 확장한다.

console.log(product22, product33, product1);
