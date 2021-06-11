const _ = require("partial-js");

// 코드 5-1
console.log(
  "---",
  _.go(
    10,
    (a) => a * 10,
    (a) => a - 50,
    (a) => a + 10
  )
);
_.go(
  10,
  (a) => a * 10,
  (a) => a - 50,
  (a) => a + 10
);

//_.go는 multiple result를 지원한다. _.mr 함수를 함께 사용하면 다음 함수에게 2개 이상의 인자들을 전달할수 있다
// 코드 5-2 _.mr 이용해서 여러개 넘기기
_.go(
  10, // 시작 인자 자체를 _.mr(2,4) 이런식으로 넘길수도 있음
  (a) => _.mr(a * 10, 50),
  (a, b) => a - b,
  (a) => a + 10
);

console.log(
  "-->",
  _.go(
    10,
    (a) => _.mr(a * 10, 50),
    (a, b) => a - b,
    (a) => a + 10
  )
);
