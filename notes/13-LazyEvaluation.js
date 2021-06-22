const _ = require("partial-js");

// 코드 5-54 map and every
function square(v) {
  return v * v;
}

_.go(
  [2, 4, 11, 2, 7, 12],
  _.map(square), // 6번 반복 [ 4, 16, 121, 4, 49, 144 ]
  _.every((v) => v < 100), // 3번 반복 (121에서 return)
  console.log
);

// partial js의 L 을 이용하면 평가 지연할수 있다.
_.go(
  [2, 4, 11, 2, 7, 12],
  L.map(square), // 3번 반복
  L.every((v) => v < 100), // 3번 반복
  console.log
);

// 코드 5-57 지연평가의 기준
// 1 엄격한 평가
// _.go(
//     [2, 4, 11, 2, 7, 12], // <-- 이 데이터가 많아도 유리해지고
//     _.map(slow_or_heavy), // <-- slow_or_heavy 가 오래 걸릴수록 뒤로 미루는게 좋으며
//     _.every(fast), // <-- 최종적으로 꺼내고자 하는 값의 개수가 적을수록 미루는 것이 좋다
//     console.log
// );
// 2 지연 평가
// _.go(
//     [2, 4, 11, 2, 7, 12],
//     L.map(slow_or_heavy),
//     L.every(fast),
//     console.log
// );
// 1의 경우 slow_or_heavy를 데이터 개수만큼 모두 실행해야한다. 2의 경우 slow_or_heavy를 뒤로 미뤄서 slow_or_heavy -> fast를 실행해보고, fast의 결과에 따라
// 다음 slow_or_heavy 들을 실행할지를 결정하므로, 모두 실행할 수도 있고, 단한번만 실행할 수도 있다.

// 지연평가의 세가지 기준
// - 데이터가 많을때
// - 앞쪽 함수가 무거운 함수일때
// - 뒤로 갈수록 필요한 재료가 적을때 (완성하는데 필요한 재료가 적을때)
