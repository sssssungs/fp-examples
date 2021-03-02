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
}
