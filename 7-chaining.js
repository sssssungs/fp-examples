// chain의 단점. 체인방식은 객체가 생성되어야만 메서드를 사용할 수 있기 때문에,
// 반드시 생성단계를 거쳐야 한다. 그리고 this 등의 상태와 흐름과 깊이에 의존하기 때문에
// 언제 어디서나 아무때나 사용이 가능한 순수함수보다는 접근성면에서 좀 불편하다.

// _.compose : 오른쪽에서 왼쪽으로
// _.pipeline : 왼쪽에서 오른쪽으로

const _ = require("underscore");

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
