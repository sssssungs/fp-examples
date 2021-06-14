const _ = require("partial-js");
// console.log(
//   JSON.stringify(
//     _.map([1, 2, 3], function (b) {
//       return new Date();
//     })
//   )
// );
// 즉시완료됨
// ["2021-06-12T07:44:30.484Z","2021-06-12T07:44:30.484Z","2021-06-12T07:44:30.484Z"]

// _.map([1, 2, 3], function () {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(new Date());
//     }, 1000);
//   });
// }).then(function (result) {
//   console.log(JSON.stringify(result));
// });
// 3초 시간 걸려서 완료됨
// ["2021-06-12T07:44:31.494Z","2021-06-12T07:44:32.497Z","2021-06-12T07:44:33.497Z"]
console.log("------------------------------");
// 코드 5-19 동일한 구조로 변경하기
_.go(
  [1, 2, 3],
  _.map(function () {
    return new Date();
  }),
  JSON.stringify
  // console.log
);

_.go(
  [1, 2, 3],
  _.map(function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(new Date());
      }, 1000);
    });
  }),
  JSON.stringify
  // console.log
);
console.log("------------------------------");
// 코드 5-20 일반 콜백을 _.map 의 iteratee로 사용
_.go(
  [1, 2, 3],
  _.map(
    _.callback(function (val, i, list, next) {
      // 마지막 인자로 next가 들어오고 next를 통해 결과를 전달하면 그 결과가 하나씩 _.map의 결과인 새로운 배열에 쌓여간다.
      setTimeout(function () {
        next(new Date());
      }, 1000);
    })
  ),
  JSON.stringify
  // console.log
);

// 함수를 미리 선언해두면 더 깔끔쓰
// 코드 5-21
function syncDate() {
  return new Date();
}
function promiseDate() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(new Date());
    }, 1000);
  });
}
console.log("------------------------------");
_.go(
  [1, 2, 3],
  _.map(syncDate),
  JSON.stringify
  // console.log
);
_.go(
  [1, 2, 3],
  _.map(promiseDate),
  JSON.stringify
  // console.log
);

// 비동기 결과를 기다리는 if 문!
// 코드 5-22
var is_1 = function (a) {
  return a === 1;
};
var is_2 = function (a) {
  return a === 2;
};
function test1(a) {
  if (is_1(a)) return "it is 1";
  else if (is_2(a)) return "it is 2";
  else return "it is not 1 or 2";
}
console.log(test1(2));

// 근데 만일 is_1 같은 함수가 시간이 걸린다고 할때! 아래처럼 만들겠지만 이는 우리가 예상한 결과가 아니다.
// 코드 5-23 비동기함수와 조건문
var is_1_async = function (a) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(a === 1);
    }, 1000);
  });
};

var is_2_async = function (a) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(a === 2);
    }, 1000);
  });
};

function test2(a) {
  if (is_1_async(a)) return "it is 1";
  else if (is_2_async(a)) return "it is 2";
  else return "it is not 1 or 2";
}
console.log(test2(2)); // 결과는 1 이다. 왜냐면 is_1_async 에서 promise를 바로 return 하니까 true로 인식
