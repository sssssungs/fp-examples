console.log("map을 만들어보자~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
// 3.2.2 map을 만들어보자
var _ = {};
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
function getLength(list) {
  return list == null ? void 0 : list.length;
}

var isArrayLike = function (list) {
  var length = getLength(list);
  return typeof length == "number" && length >= 0 && length < MAX_ARRAY_INDEX;
};
// _.map = function (data, iteratee) {
//   var new_list = [];
//   if (isArrayLike(data))
//     for (var i = 0, len = data.length; i < len; i++) {
//       new_list.push(iteratee(data[i], i, data));
//     }
//   else
//     for (var key in data) {
//       if (data.hasOwnProperty(key))
//         new_list.push(iteratee(data[key], key, data));
//     }
//   return new_list;
// };

// console.log(
//   "_map console",
//   _.map([1, 2, 3, 4], (v, i, l) => [v, i, l])
// );
// console.log(
//   "_map console",
//   _.map({ a: 3, b: 2, c: 1 }, (v, i, l) => [v, i, l])
// );
// console.log(
//   _.map(
//     [1, 2, 3],
//     function (v) {
//       return v * this;
//     }.bind(5)
//   )
// );

console.log("쓸모없는 함수 사용하기 -----------------------------------");

// _.each = function (data, iteratee) {
//   if (isArrayLike(data))
//     for (var i = 0, len = data.length; i < len; i++) {
//       iteratee(data[i], i, data);
//     }
//   else
//     for (var key in data) {
//       if (data.hasOwnProperty(key)) iteratee(data[key], key, data);
//     }
//   return data;
// };

// function bloop(new_data, body) {
//   return function (data, iteratee) {
//     var result = new_data(data);
//     if (isArrayLike(data))
//       for (var i = 0, len = data.length; i < len; i++) {
//         body(iteratee(data[i], i, data), result);
//       }
//     else
//       for (var key in data) {
//         if (data.hasOwnProperty(key))
//           body(iteratee(data[key], key, data), result);
//       }
//
//     return result;
//   };
// }
_.isObject = function (obj) {
  var type = typeof obj;
  return type === "function" || (type === "object" && !!obj);
};

_.keys = function (obj) {
  return _.isObject(obj) ? Object.keys(obj) : [];
};

console.log("==========================================");
console.log("_.keys example", _.keys({ name: "ph" }));
console.log(_.keys(10));
console.log(_.keys(null));

// ㅋㅗ드 3-48 keys 이용해서 코드 개선하기.
function bloop(new_data, body) {
  return function (data, iter_predi) {
    var result = new_data(data);
    if (isArrayLike(data))
      for (var i = 0, len = data.length; i < len; i++) {
        body(iter_predi(data[i], i, data), result, data[i]); // data[i] 추가함 for filter.
      }
    else
      for (var i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
        body(iter_predi(data[keys[i]], keys[i], data), result, data[keys[i]]);
      }
    // for (var key in data) {
    //   if (data.hasOwnProperty(key))
    //     body(iteratee(data[key], key, data), result);
    // }

    return result;
  };
}

_.array = () => [];
_.push_to = (val, obj) => {
  obj.push(val);
  return val;
};
_.noop = () => {}; // 아무일도 하지 않는 함수.
_.map = bloop(_.array, _.push_to);

_.each = bloop(_.identity, _.noop);
_.identity = (v) => v;
_.idtt = _.identity;
_.values = function (list) {
  return _.map(list, _.identity);
};
console.log(_.values({ id: 5, name: "je" }));

_.args0 = _.identity;
_.args1 = (a, b) => b;
// _.keys = (list) => _.map(list, _.args1);

// console.log(_.keys([3, 2, 1]));
// console.log(_.keys({ a: 1, b: 2, name: "eee" }));

_.map([1, 2, 3, 4, 5], (v) => console.log(v + 2));

bloop(
  function (v) {
    return v;
  },
  function () {}
)([5, 6, 7], function (v) {
  console.log(v);
});

// filter를 만들어보자!!!
// 3-49 old filter
_.old_filter = function (data, predicate) {
  var result = [];
  for (var idx = 0, len = data.length; idx < len; idx++) {
    if (predicate(data[idx], idx, data)) result.push(data[idx]);
  }
  return result;
};

// _.filter = function (data, predicate) {
//   var result = [];
//   _.each(data, function (val, idx, data) {
//     if (predicate(val, idx, data)) result.push(val);
//   });
//   return result;
// };

_.filter = bloop(_.array, (bool, result, val) => {
  if (bool) result.push(val);
});

_.filter = bloop(_.array, _.if(_.idtt, _.rester(_.push)));

var o = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

console.log(
  "_.filte example",
  _.filter(o, function (val) {
    return val > 2;
  })
);

// 코드 3-54 작은함수들
_.toArray = function (list) {
  return Array.isArray(list) ? list : _.values(list);
};

_.rest = function (list, num) {
  // 배열의 앞에서부터 num 만큼의 값들을 제거한 새로운 배열을 리턴한다.
  return _.toArray(list).slice(num || 1);
};

_.reverse = function (list) {
  return _.toArray(list).reverse();
};
console.log("========================");
console.log("reverse", _.reverse([1, 2, 6, 8, 4]));
console.log("reverse object", _.reverse({ 0: 1, 1: 2, 2: 3 }));

_.rester = function (func, num) {
  return function () {
    return func.apply(null, _.rest(arguments, num));
  };
};

function sum(a, b, c, d) {
  return (a || 0) + (b || 0) + (c || 0) + (d || 0);
}
console.log("rester", _.rester(sum)(1, 2, 3, 4));
console.log("rester", _.rester(sum, 2)(1, 2, 3, 4));
console.log("rester", _.rester(sum, 3)(1, 2, 3, 4));

// 코드 3-57 if
_.if = function (validator, func, alter) {
  return function () {
    return validator.apply(null, arguments)
      ? func.apply(null, arguments)
      : alter && alter.apply(null, arguments);
  };
};

function sub(a, b) {
  return a - b;
}

var sub2 = _.if(
  function (a, b) {
    return a >= b;
  },
  sub,
  function () {
    return new Error("a가 b보다 작습니다..");
  }
);
// console.log(sub2(2, 5));
console.log(sub2(10, 5));

var diff = _.if(
  function (a, b) {
    return a >= b;
  },
  sub,
  function (a, b) {
    return sub(b, a);
  }
);

console.log("diff", diff(1, 5), diff(5, 1));

_.safety = _.with_validator = _.if;

_.toArray2 = _.if(Array.isArray, _.idtt, _.values);

console.log("_toArray2", _.toArray([1, 2, 3, 4, 5, 7, 8]));
console.log("_toArray2", _.toArray({ a: 1, b: 2, c: 3, d: 4 }));

_.constant = function (v) {
  return function () {
    return v;
  };
};

_.isNumber = function (a) {
  return toString.call(a) == "[object Number]";
};

var square = _.safety(_.isNumber, (a) => a * a, _.constant(0));

console.log("square function with _.safety", square(5));
console.log("square function with _.safety", square("가나다"));

// 코드 3-63 reject 함수
_.reject = bloop(_.array, _.if(_.idtt, _.noop, _.rester(_.push)));

_.negate = function (func) {
  return function () {
    return !func.apply(null, arguments);
  };
};

_.reject_2nd = bloop(_.array, _.if(_.negate(_.idtt), _.rester(_.push)));

_.not = (v) => !v;

_.reject_3rd = bloop(_.array, _.if(_.not, _.rester(_.push)));
