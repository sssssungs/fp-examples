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
  return function (data, iteratee) {
    var result = new_data(data);
    if (isArrayLike(data))
      for (var i = 0, len = data.length; i < len; i++) {
        body(iteratee(data[i], i, data), result);
      }
    else
      for (var i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
        body(iteratee(data[keys[i]], keys[i], data), result);
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
