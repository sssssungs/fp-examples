const _ = require("partial-js");

console.log("--------------------- 수집하기 --------------------");
// 5-58 map and pluck (객체에서 키만 가져오기)
_.pluck = function (data, key) {
  return _.map(data, function (val) {
    return val[key];
  });
};

var users = [
  { id: 1, name: "ID" },
  { id: 2, name: "AA" },
  { id: 3, name: "TW" },
  { id: 4, name: "Qw" },
];

console.log("_pluck", _.pluck(users, "name"));
console.log(
  "_map",
  _.map(users, (u) => u.name)
);
console.log("_pluck", _.pluck(users, "id"));
console.log(
  "_map",
  _.map(users, (u) => u.id)
);

console.log("-----------------------------------------");
// 5-59 map and values, pairs
_.go(users, _.first, _.values, console.log);
_.go(
  users,
  _.first,
  _.map((v) => v),
  console.log
);

_.go(users, _.first, _.pairs, console.log);
_.go(
  users,
  _.first,
  _.map((val, key) => [key, val]),
  console.log
);

console.log("--------------------- 거르기 --------------------");
// 5-60 filter and reject
_.reject = function (data, predi) {
  return _.filter(data, _.negate(predi)); // negate 함수결과(t/f) 의 반대를 리턴한다.
};

// 아래와 같
_.reject2 = function (data, predi) {
  return _.filter(data, function (value, index, list) {
    return !predi(value, index, list);
  });
};

_.difference = function (data, target) {
  return _.filter(data, function (val) {
    return !_.contains(target, val);
  });
};

_.difference2 = function (data, target) {
  return _.reject(data, function (val) {
    return _.contains(target, val);
  });
};

console.log(_.difference([1, 2, 3, 4, 5], [2, 3]));
console.log("--------------------- 접기  --------------------");

// 5-62 group by & reduce
var users2 = [
  { id: 1, name: "ID", age: 33 },
  { id: 2, name: "AA", age: 33 },
  { id: 3, name: "TW", age: 32 },
  { id: 4, name: "Qw", age: 31 },
];

_.group_by = function (data, iter) {
  return _.reduce(
    data,
    function (grouped, val, i, list) {
      var key = iter(val, i, list);
      _.has(grouped, key) ? grouped[key].push(val) : (grouped[key] = [val]);
      return grouped;
    },
    {}
  );
};

console.log(_.group_by(users2, (u) => u.age));
// 접기는 루프를 끝까지 돈다.
// reduce를 포함한 모든 접기 유형은 지연평가를 할수 없다.

console.log("--------------------- 찾아내기  --------------------");
// 코드 5-63 _.take
console.log(_.take([1, 2, 3, 4]));
console.log(_.take([1, 2, 3, 4], 2));
console.log(_.take([1, 2, 3, 4], 10));

// 코드 5-64 some
_.some = function (data, iter) {
  iter =
    iter ||
    function (v) {
      return v;
    };
  var res = false;
  _.find(data, function (v) {
    return (res = !!iter(v));
  });
  return res;
};

console.log(
  _.some([0, 1, 1, 2, 2], function (v) {
    return v > 2;
  })
);
