var _ = require("underscore");
{
  // _.each, _.map에서 사용하는 객체는 4가지 정도. {}, [], arguments, arraylike
  var d1 = { name: "pj", age: 25 };
  var d2 = [1, 2, 3];
  var d3 = (function () {
    return arguments;
  })(1, 2, 3);
  var d5 = { length: 3 };
  (d5[0] = 1), (d5[1] = 2), (d5[2] = 3);

  console.log("=======================================");
  console.log("d3", d3[0], d3[1], d3[2]);
  console.log("=======================================");
  // underscore의 array like 판단
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var isArrayLike = function (list) {
    var length = list == null ? void 0 : list.length;
    return (
      typeof length == "number" && length >= 0 && length <= MAX_ARRAY_INDEX
    );
  };
  // length 가지고만 판단을 하다니 약간 위험하군!
  // underscore의 특징. 아래형태 (array like)도 에러를 뱉지 않음.
  _.each({ length: 4 }, function () {
    console.log("arguments", arguments);
  });
  _.each(0, function () {
    console.log("arguments", arguments); // 아무일 없음
  });

  // underscore의 경우 꼭 필요하지 않은 경우라면 형체크를 거의 하지 않는다!. 그냥 출발시킴.
  function func1(data) {
    var keys = _.keys(data);
    console.log("keys", keys);
    for (var i = 0; i < keys.length; i++) {
      //
    }
  }
  func1(0);
  function func2(data) {
    console.log("getLength(data)", getLength(data));
    for (var i = 0, len = getLength(data); i < len; i++) {}
  }
  function getLength(list) {
    return list == null ? undefined : list.length;
  }

  func2(undefined);
}
{
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

  function bloop(new_data, body) {
    return function (data, iteratee) {
      var result = new_data(data);
      if (isArrayLike(data))
        for (var i = 0, len = data.length; i < len; i++) {
          body(iteratee(data[i], i, data), result);
        }
      else
        for (var key in data) {
          if (data.hasOwnProperty(key))
            body(iteratee(data[key], key, data), result);
        }

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
  _.keys = (list) => _.map(list, _.args1);

  console.log(_.keys([3, 2, 1]));
  console.log(_.keys({ a: 1, b: 2, name: "eee" }));

  _.map([1, 2, 3, 4, 5], (v) => console.log(v + 2));

  bloop(
    function (v) {
      return v;
    },
    function () {}
  )([5, 6, 7], function (v) {
    console.log(v);
  });
}
