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

var mult_all2 = _.map(__(_.args, _.initial(2), _.reduce(mult)));

console.log("mult_all2", mult_all2(10, 10, 2, [1, 2, 3]));

// ㅋㅗ드 5-29 spread 와 all
_.all(10, 5, [
  function (a, b) {
    return a + b;
  },
  function (a, b) {
    return a - b;
  },
  function (a, b) {
    return a * b;
  },
]); // 결과: arguments { 0:15, 1: 5, 2:50, _mr: true }

_.spread(10, 5, [
  function (a) {
    return a * a;
  },
  function (b) {
    return b * b;
  },
]); // 결과: arguments { 0:100, 1: 25,  _mr: true }

// all 은 동일하게 전달하고, spread 는 순서대로 전달한다.
//코드 5-30 파이프라인과 함께 사용
function con(a, b, c) {
  console.log("value", a, b, c, arguments);
}
_.go(
  10,
  _.all(
    (a) => a + 5,
    (a) => a - 5,
    (a) => a * 5
  ),
  _.spread(
    (a) => a + 1,
    (b) => b + 2,
    (c) => c + 3
  ),
  console.log
);

console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++");
// ㅋㅗ드5-31 비동기로 가능하다!
_.go(
  10,
  _.all(
    //1
    function (a) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(a + 5);
        }, 2000);
      });
    },
    //2
    function (a) {
      return a - 5;
    },

    //3
    function (a) {
      return a * 5;
    }
  ),
  _.spread(
    //1
    function (a) {
      return a + 1;
    },
    //2
    _.callback(function (b, next) {
      setTimeout(function () {
        next(b + 2);
      }, 2000);
    }),
    //3
    function (c) {
      return c + 3;
    }
  ),
  console.log
);

// _.map 을 배열에 담긴 각각의 값을 하나의 함수를 통해 변경하기 위해 사용한다면, spread는 각각의 값을 각각의 함수를 통해 다른 결과로 만들때 사용하고
// all은 동일한 값을 서로 다른 모든 함수들에게 전달하여 결과를 만들기 위해 사용한다.
