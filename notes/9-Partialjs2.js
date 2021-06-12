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
  _.mr(2, 4),
  _.go(
    10,
    (a) => _.mr(a * 10, 50),
    (a, b) => a - b,
    (a) => a + 10
  )
);

// 코드 5-4 읽기 좋은 _.go
function add(a, b) {
  return a + b;
}
function square(a) {
  return a * a;
}

console.log("_.go is easy to read", _.go(_.mr(2, 3), add, square));

// 함수를 만드는 파이프라인 _.pipe
// _.go가 즉시 실행하는 파이프라인 이라면, _.pipe는 실행할 준비가 된 함수를 리턴하는 파이프라인 함수다. 그외 모든 기능은 go와 동일하다.

//코드 5-5 _.pipe
var f1 = _.pipe(add, square, console.log);
f1(2, 3);

// 코드 5-6 부분커링지원. 파이프라인 함수를 함수를 리턴하는 함수와 함께 사용
var products = [
  { id: 1, name: "후드", discounted_price: 6000, price: 10000 },
  { id: 2, name: "모자", discounted_price: 8000, price: 8000 },
  { id: 3, name: "셔츠", discounted_price: 6000, price: 6000 },
  { id: 4, name: "바지", discounted_price: 5000, price: 6000 },
];

_.go(
  products,
  _.filter(function (p) {
    return p.discounted_price < p.price; // 할인상품만
  }),
  _.sortBy("discounted_price"), // 낮은순으로 정렬
  _.first, // 첫번째 꺼내서
  _.val("name"), // 이름을 확인한다.
  console.log
);

// Partial.js의 filter sortby val은 모두 부분 커링이 된다. 모두 인자를 하나만 넘겨 앞으로 실행된 함수를 리턴 받았다!
// 코드 5-7 일반적인 함수 작성방식
var filtered_products = _.filter(products, function (p) {
  return p.discounted_price < p.price;
});
var sorted_products = _.sortBy(filtered_products, "discounted_price");
var first_product = _.first(sorted_products);
_.val(first_product, "name");

// 모든 함수를 중첩하는 방식
_.val(
  _.first(
    _.sortBy(
      _.filter(products, function (p) {
        return p.discounted_price < p.price;
      }),
      "discounted_price"
    )
  ),
  "name"
);

// 이렇게 작성하는 것 보다는 5-6 처럼 작성하는것이 훨씬 읽기도 쉽고, 변경도 용이하다.

// 코드 5-9 파이프라인으로 보조함수 만들기

_.go(
  products,
  _.filter((p) => p.discounted_price < p.price),
  _.map(_.pipe(_.idtt, _.pick(["id", "name"]), _.values)),
  console.log
);

// 다른방법으로 작성하기 코드 5-10 _.pipe == __ 이다.
_.go(
  products,
  _.filter(function (p) {
    return p.discounted_price < p.price;
  }),
  _.map(__(_.idtt, _.pick(["id", "name"]), _.values)),
  console.log
);

_.go(
  products,
  _.filter((p) => p.discounted_price < p.price),
  _.map((p) => _.go(p, _.pick(["id", "name"]), _.values)),
  console.log
);

// 코드 5-11 _.go의 비동기함수처리
_.go(
  10,
  _.callback(function (a, next) {
    setTimeout(function () {
      next(a + 10);
    }, 1000);
  }),
  function (a) {
    console.log(a);
  }
);

// 코드 5-12 _.callback 에 여러개 비동기 함수 넘기기
(function () {
  function add(a, b, next) {
    setTimeout(function () {
      next(a + b);
    }, 1000);
  }

  function sub(a, b, next) {
    setTimeout(function () {
      next(a - b);
    }, 1000);
  }

  function mul(a, b, next) {
    setTimeout(function () {
      next(a * b);
    }, 1000);
  }

  function log(msg, next) {
    setTimeout(function () {
      console.log(msg);
      next(msg);
    }, 1000);
  }

  _.go(
    _.mr(5, 10),
    _.callback(
      function (a, b, next) {
        add(a, b, next);
      },
      function (result, next) {
        sub(result, 10, next);
      },
      function (result, next) {
        mul(result, 10, next);
      },
      function (result, next) {
        log(result, next);
      }
    )
  );
})();
