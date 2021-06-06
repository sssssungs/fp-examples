// chain의 단점. 체인방식은 객체가 생성되어야만 메서드를 사용할 수 있기 때문에,
// 반드시 생성단계를 거쳐야 한다. 그리고 this 등의 상태와 흐름과 깊이에 의존하기 때문에
// 언제 어디서나 아무때나 사용이 가능한 순수함수보다는 접근성면에서 좀 불편하다.

// _.compose : 오른쪽에서 왼쪽으로
// _.pipeline : 왼쪽에서 오른쪽으로

const _ = require("underscore");
_;

_.pipeline2 = function () {
  var funs = arguments;
  return function (seed) {
    return _.reduce(
      funs,
      function (result, current) {
        return current(result);
      },
      seed
    );
  };
};

var div_square = _.pipeline2(
  (a) => a / 2,
  (a) => a * a
);

console.log("div_sq", div_square(6));

console.log("=============");

//코드 4-17
// for 이용해서 pipeline을 구현
_.pipeline_for = function () {
  var funs = arguments;
  return function (seed) {
    var l = seed;
    for (var i = 0; i < funs.length; i++) {
      var r = funs[i];
      r = r(l);
    }
    return l;
  };
};
// 마이클 포거스의 방법
_.pipeline = function () {
  var funs = arguments;
  return function (seed) {
    return _.reduce(funs, (l, r) => r(l), seed);
  };
};
// _partial 사용
_.pipeline_partial = function () {
  return _.partial(_.reduce, arguments, (l, r) => r(l));
};

// 코드 4-18
var users = [];
var companies = [];
function joined_at(attrs) {
  return _.extend(attrs, { joined_at: new Date() });
}
function greeting(member) {
  return member.name + " 회원님은 " + member.id + "번째 회원이십니다.";
}
function join(table, member) {
  table.push(member);
  member.id = table.length;
  return member;
}

// partial 이용.
var join_user = _.pipeline(joined_at, _.partial(join, users), greeting);
var join_company = _.pipeline(joined_at, _.partial(join, companies), greeting);

// company에만 추가 로직이 있는 경우
var join_company2 = _.pipeline(
  joined_at,
  _.partial(join, companies),
  function () {}, // 추가로직을 넣을 수 있다.
  greeting
);

console.log("join_users", join_user({ name: "my" }), users);
console.log("join_users", join_user({ name: "sung" }), users);

console.log("join_company", join_company({ name: "ss" }));

// pipeline, flow 등에는 결과를 하나만 받을수 있는 한계점이 존재한다.
// Multiple results

// 코드 4-21 multiple results
_.mr = function () {
  arguments._mr = true;
  return arguments;
};

_.pipeline_mr = function () {
  var funs = arguments;
  return function (seed) {
    return _.reduce(
      funs,
      function (l, r) {
        // multiple result 라면 apply 로 인자를 펼친다.
        // console.log("=======>", l && l._mr && r.apply(null, l));
        return l && l._mr ? r.apply(null, l) : r(l);
      },
      // 인자가 여러개라면 첫번째 함수에게도 mr 로 만들어서 넘기기.
      arguments.length < 2 ? seed : _.mr.apply(null, arguments)
    );
  };
};

// apply는 배열이나 arguments 객체를 받아 함수의 인자들로 펼쳐준다 (spread).
// l이 mr이라면 r.apply를 이용해 r 함수에게 인자를 여러개로 전달할수 있도록한다.

// 코드 4-42 multiple result 사용법
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function square(a) {
  return a * a;
}
var f1 = _.pipeline_mr(
  add, // 3+2
  square, // 5*5
  function (a) {
    return _.mr(a, a / 5); // 25-5
  },
  sub
);

console.log("f1", f1(3, 2));

// _.pipeline으로 함수를 정의하게되면 multiple result를 지원하는 함수가 되어, 함수를 중첩하기만 해도 마치 Go언어처럼 동작한다.
var add1 = _.pipeline_mr(function (a, b) {
  return a + b;
});
var sub1 = _.pipeline_mr(function (a, b) {
  return a - b;
});
function ff1(a, b) {
  return _.mr(a - 5, b / 2);
}

// 넘겨지는 인자는 하나지만 2개처럼 동작한다.
console.log(add1(ff1(20, 10)));
console.log(sub1(ff1(20, 10)));
