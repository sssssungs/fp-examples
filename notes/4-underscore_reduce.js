var _ = {};

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

// 3-75 _.each로 _.reduce 만들기
// _.reduce = function (data, iteratee, memo) {
//   _.each(data, function (val, idx, data) {
//     memo = iteratee(memo, val, idx, data);
//   });
//   return memo;
// };
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

function getLength(list) {
  return list == null ? void 0 : list.length;
}

var isArrayLike = function (list) {
  var length = getLength(list);
  return typeof length == "number" && length >= 0 && length < MAX_ARRAY_INDEX;
};

_.if = function (validator, func, alter) {
  return function () {
    return validator.apply(null, arguments)
      ? func.apply(null, arguments)
      : alter && alter.apply(null, arguments);
  };
};

_.toArray = function (list) {
  return Array.isArray(list) ? list : _.values(list);
};

_.rest = function (list, num) {
  // 배열의 앞에서부터 num 만큼의 값들을 제거한 새로운 배열을 리턴한다.
  return _.toArray(list).slice(num || 1);
};

_.rester = function (func, num) {
  return function () {
    return func.apply(null, _.rest(arguments, num));
  };
};
// 3-76 bloop 이용해서 _.reduce 만들기
// function bloop(new_data, body, stopper, is_reduce) {
//   // reduce 인지 인자 하나를 더 추가
//   return function (data, iter_predi, opt1) {
//     // reduce 인 경우 세번째 인자인 op1로 memo를 받음 (memo 초기값)
//     iter_predi = iter_predi || _.idtt;
//     var result = new_data(data);
//     var memo = is_reduce ? opt1 : undefined;
//
//     if (isArrayLike(data)) {
//       for (var i = 0, len = data.length; i < len; i++) {
//         memo = is_reduce // is_reduce 여부에 따라 전달 인자 개수 변경
//           ? iter_predi(memo, data[i], i, data)
//           : iter_predi(data[i], i, data);
//         if (!stopper) body(memo, result, data[i], i);
//         else if (stopper(memo)) return body(memo, result, data[i], i);
//       }
//     } else {
//       for (var i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
//         memo = is_reduce // is_reduce 여부에 따라 전달 인자 개수 변경
//           ? iter_predi(memo, data[keys[i]], keys[i], data)
//           : iter_predi(data[keys[i]], keys[i], data);
//         if (!stopper) body(memo, result, data[keys[i]], keys[i]);
//         else if (stopper(memo))
//           return body(memo, result, data[keys[i]], keys[i]);
//       }
//     }
//     return is_reduce ? memo : result;
//   };
// }

// 3-77 절차지향적으로 리팩토링 하기
// 3-78 limiter 추가
// 3-80 리팩토링
function bloop(new_data, body, stopper, is_reduce) {
  // reduce 인지 인자 하나를 더 추가
  return function (data, iter_predi, opt1) {
    // reduce 인 경우 세번째 인자인 op1로 memo를 받음 (memo 초기값)
    iter_predi = iter_predi || _.idtt;
    var result = new_data(data);
    var memo = is_reduce ? opt1 : undefined;
    var limiter = is_reduce ? undefined : opt1; // opt1 를 limiter 로 사용한다.
    var keys = isArrayLike(data) ? null : _.keys(data); // key를 담고 아래 for문을 하나로 합친다.

    // reduce
    if (is_reduce) {
      for (var i = 0, len = (keys || data).length; i < len; i++) {
        var key = keys ? keys[i] : i;
        memo = iter_predi(memo, data[key], key, data);
      }
      return memo;
    }

    // find, some, every, findIndex, findKey
    if (stopper) {
      for (var i = 0, len = (keys || data).length; i < len; i++) {
        var key = keys ? keys[i] : i;
        var memo = iter_predi(data[key], key, data);
        if (stopper(memo)) return body(memo, result, data[key], key);
      }
    } else if (limiter) {
      // each, map, filter, reject with limiter
      for (var i = 0, len = (keys || data).length; i < len; i++) {
        var key = keys ? keys[i] : i;
        body(iter_predi(data[key], key, data), result, data[key]);
        if (limiter === result.length) break;
      }
    } else {
      //each, map, filter, reject without limiter
      for (var i = 0, len = (keys || data).length; i < len; i++) {
        var key = keys ? keys[i] : i;
        body(iter_predi(data[key], key, data), result, data[key]);
      }
    }
    return result;
  };
}

_.reduce = bloop(_.noop, _.noop, undefined, true);
console.log(
  "reduce test",
  _.reduce(
    [1, 2, 3, 4],
    function (memo, val) {
      return memo + val;
    },
    0
  ),
  _.reduce(
    [
      { age: 31, name: "randy" },
      { age: 21, name: "ellie" },
      { age: 25, name: "sofie" },
      { age: 99, name: "mark" },
    ],
    function (names, user) {
      if (user.age > 30) names.push(user.name);
      return names;
    },
    []
  )
);

_.filter = bloop(
  _.array,
  _.if((v) => v, _.rester(_.push))
);

// console.log(
//   "filter example",
//   _.filter(
//     [1, 2, 3, 4, 5],
//     function () {
//       return true;
//     },
//     2
//   )
// );

_.map = bloop(_.array, _.push_to);
console.log(
  "map with bloop",
  _.map(
    [1, 2, 3, 4, 5],
    function (v) {
      return v * 2;
    },
    3
  )
);
