const _ = require("partial-js");

// 코드 5-27 인자 더 많이 넘기기
function underscorejs1() {
  var a = 10;
  var b = 5;
  return _.map([1, 2, 3], function (val) {
    // a b 를 기억하는 익명함수를 _.map의 iteratee로
    return val * a - b;
  });
}

function underscorejs2() {
  return _.map(
    [1, 2, 3],
    _.partial(
      function (a, b, val) {
        return val * a - b;
      },
      10,
      5
    )
  );
}

function partialjs() {
  return _.map(10, 5, [1, 2, 3], function (a, b, val) {
    console.log("aa", a, b, val);
    return a * val - b;
  });
} // map에 인자를 여러개 넘기면 iteratee 에게도 인자로 넘겨준다.
// partialjs의 주요 고차 함수들은, 추가로 사용하고자 하는 인자를 함께 넘길수 있도록 되어 있다.
// 메인 인자인 [1,2,3] 이전에 인자들을 넘기면 보조함수의 기본 인자들인 val, i, list 등의 이전 인자로 전달해준다
console.log("underscorejs1", underscorejs1());
console.log("underscorejs2", underscorejs2());
console.log("partialjs", partialjs());

// 코드 5-28 partial 특징사용하여 간단히 만들기
var mapper2 = _.map(function (a, b, val) {
  return a * b * val;
});
console.log("mapper2 with partial", mapper2(10, 100, [1, 2, 3]));

function mult(a, b) {
  return a * b;
}

var mult_all = _.map(function (a, b, val) {
  // map의 iteratee argument: value, index, list (뒤에서부터 3개는 무조건 여기로 들어감)
  return _.reduce(_.initial(arguments, 2), mult); // initial : 뒤에서부터 n개 제거하고 나머지 반환한다.
});
console.log("mult_all", mult_all(10, 10, 2, [1, 2, 3]));
