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

var users3 = [
  { id: 1, name: "ID", age: 33 },
  { id: 2, name: "AA", age: 25 },
  { id: 3, name: "TW", age: 12 },
  { id: 4, name: "zz", age: 44 },
  { id: 4, name: "qe", age: 14 },
  { id: 5, name: "gr", age: 32 },
  { id: 6, name: "hy", age: 31 },
  { id: 7, name: "en", age: 90 },
  { id: 8, name: "mo", age: 11 },
  { id: 9, name: "as", age: 21 },
];

console.log("loop ------------------ 멈출수있는 reduce");
var count = 0,
  count_reduce = 0;
_.go(
  users3, // loop 사용
  _.loop(function (list, user) {
    count++;
    // if (user.age < 20) list.push(user); // 10대 2명만 뽑기
    // if (list.length === 2) return _.break(list);
    // return list;
    return user.age < 20 && list.push(user) === 2 ? _.break(list) : list;
  }, []),
  console.log
);
_.go(
  users3, // reduce 사용
  _.reduce(function (list, user) {
    count_reduce++;
    if (list.length === 2) return list;
    if (user.age < 20) list.push(user); // 10대 2명만 뽑기
    return list;
  }, []),
  console.log
);
console.log(count, count_reduce); // 결과는 동일하지만 reduce의 경우 length 만큼 반복한다.
// 찾아내기 함수들은 값을 찾다가 원하는 결과를 완성하면 나간다.

//5-76 지연평가의 동작조건을 동적으로 하기
var strict_or_lazy1 = __(
  _.range,
  _.if(
    (list) => list.length < 100,
    __(
      _.map((v) => v * v),
      _.filter((v) => v % 2 !== 0),
      _.take(10)
    )
  ).else(
    __(
      L.map((v) => v * v),
      L.filter((v) => v % 2 !== 0),
      L.take(10)
    )
  ),
  console.log
);

strict_or_lazy1(50); // 엄격
strict_or_lazy1(100); // 지연

var strict_or_lazy2 = __(
  _.range,
  L.strict((list) => list.length < 100), // strict_or_lazy1 를 간단하게 만들면 이와 같다
  // L.strict(100), 으로 변경할수 있다 (숫자만 넣으면 자동으로 length < 100)으로 변환해줌
  L.map((v) => v * v),
  L.filter((v) => v % 2 !== 0),
  L.take(10),
  console.log
);
