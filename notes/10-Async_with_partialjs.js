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

// 코드 5-19 동일한 구조로 변경하기
_.go(
  [1, 2, 3],
  _.map(function () {
    return new Date();
  }),
  JSON.stringify,
  console.log
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
  JSON.stringify,
  console.log
);
