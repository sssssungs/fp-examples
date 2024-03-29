{
  function addMaker(a) {
    return function (b) {
      return a + b;
    };
  }
  // let add3 = addMaker(3);
  // console.log(add3(5));
  // console.log(add3(10));

  let users = [
    { id: 1, name: "ID", age: 32 },
    { id: 2, name: "AA", age: 29 },
    { id: 3, name: "IU", age: 30 },
    { id: 4, name: "BC", age: 20 },
    { id: 5, name: "PQ", age: 35 },
    { id: 6, name: "SS", age: 24 },
    { id: 7, name: "AH", age: 28 },
  ];

  let temp_user = [];
  for (let i = 0, len = users.length; i < len; i++) {
    if (users[i].age < 30) temp_user.push(users[i]);
  }
  // console.log("temp_user under 30", temp_user);

  let ages = [];
  for (let i = 0, len = temp_user.length; i < len; i++) {
    ages.push(temp_user[i].age);
  }
  // console.log("under 30 ages: ", ages);

  let temp_user2 = [];
  for (let i = 0, len = users.length; i < len; i++) {
    if (users[i].age >= 30) temp_user2.push(users[i]);
  }
  // console.log("temp_user upper 30", temp_user2);

  let names = [];
  for (let i = 0, len = temp_user2.length; i < len; i++) {
    names.push(temp_user2[i].name);
  }
  // console.log("over 30 ages: ", names);

  //  filter를 생성함.
  function filter(list, predicate) {
    let new_list = [];
    for (let i = 0, len = list.length; i < len; i++) {
      if (predicate(list[i])) new_list.push(list[i]);
    }
    return new_list;
  }

  let user_under_30 = filter(users, (user) => user.age < 30);
  // console.log("user_under_30", user_under_30);

  // map을 생성함.
  function map(list, iteratee) {
    let new_list = [];
    for (let i = 0, len = list.length; i < len; i++) {
      new_list.push(iteratee(list[i]));
    }
    return new_list;
  }
  let ages_under_30 = map(
    filter(users, (user) => user.age < 30),
    (user) => user.age
  );

  let names_under_30 = map(
    filter(users, (user) => user.age < 30),
    (user) => user.name
  );
  // console.log("ages_under_30", ages_under_30);
  // console.log("names_under_30", names_under_30);

  // 함수를 생성하는 함수를 만든다.
  function bvalue(key) {
    return function (obj) {
      return obj[key];
    };
  }
  // console.log("bvalue", bvalue("a")({ a: 1, b: 2 }));
  // console.log("b value a", bvalue("a"));
  // console.log(
  //   "ages with bvalue",
  //   map(
  //     filter(users, user => user.age < 30),
  //     bvalue("age")
  //   )
  // );

  // find 만들기
  // console.log(filter(users, user => user.id === 3)[0]);
  function findById(list, id) {
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i].id === id) return list[i];
    }
  }
  function findByName(list, name) {
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i].name === name) return list[i];
    }
  }
  // console.log(findById(users, 1));
  // console.log(findByName(users, "SS"));
  // 인자 이용해 중복을 제거
  function findBy(key, list, val) {
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i][key] === val) return list[i];
    }
  }

  console.log(findBy("name", users, "PQ"));

  function User(id, name, age) {
    this.getId = function () {
      return id;
    };
    this.getName = function () {
      return name;
    };
    this.getAge = function () {
      return age;
    };
  }

  const users2 = [
    new User(1, "QQ", 33),
    new User(2, "AA", 23),
    new User(3, "WW", 23),
    new User(4, "RR", 31),
    new User(5, "TT", 36),
    new User(6, "ZZ", 32),
    new User(7, "QQ", 33),
  ];

  function find(list, predicate) {
    for (let i = 0, len = list.length; i < len; i++) {
      if (predicate(list[i])) return list[i];
    }
  }
  console.log("==================================================");

  console.log("users2", find(users2, (user) => user.getAge() === 33).getName());
  console.log(
    "user",
    find(users, (user) => user.name.indexOf("I"))
  );

  // 1-25 b match1으로 predicate 만들기 (closure)
  const bmatch1 = (key, val) =>
    function (obj) {
      return obj[key] === val;
    };
  console.log("==================================================");

  console.log("find with bmatch", find(users, bmatch1("id", 5)));
  console.log("filter with bmatch", filter(users, bmatch1("age", 28)));
  console.log("map with bmatch", map(users, bmatch1("age", 28)));

  // 1-27 bmatch
  const object = (key, val) => {
    const obj = {};
    obj[key] = val;
    return obj;
  };

  const match = (obj, obj2) => {
    for (let key in obj2) {
      if (obj[key] !== obj2[key]) return false;
    }
    return true;
  };

  function bmatch(obj2, val) {
    console.log("arguments.length", arguments);
    if (arguments.length === 2) obj2 = object(obj2, val);
    console.log("obj2", obj2);
    return function (obj) {
      return match(obj, obj2);
    };
  }
  console.log("==================================================");

  console.log(
    "match",
    match(find(users, bmatch("id", 3), find(users, bmatch("name", "IU"))))
  );
  console.log("==================================================");

  // 최대한 true/false로 리턴하게 만들어서 if 조건을 태울수 있도록 한다.
  console.log("find same object", find(users, bmatch({ id: 3, name: "IU" })));

  function findIndex(list, predicate) {
    for (let i = 0, len = list.length; i < len; i++) {
      if (predicate(list[i])) return i;
    }
    return -1;
  }
  console.log("==================================================");

  console.log("find index example", findIndex(users, bmatch({ id: 3 })));
  const _ = {
    map: null,
    filter: null,
    find: null,
    findIndex: null,
    identity: null,
    falsy: null,
    truthy: null,
    some: null,
    every: null,
    get: null,
  };
  // 고차함수 정리 및 인자 늘리기
  _.map = function (list, iteratee) {
    let new_list = [];
    for (let i = 0, len = list.length; i < len; i++) {
      new_list.push(iteratee(list[i], i, list));
    }
    return new_list;
  };
  _.filter = function (list, predicate) {
    let new_list = [];
    for (let i = 0, len = list.length; i < len; i++) {
      if (predicate(list[i], i, list)) new_list.push(list[i]);
    }
    return new_list;
  };
  _.find = function (list, predicate) {
    for (let i = 0, len = list.length; i < len; i++) {
      if (predicate(list[i], i, list)) return list[i];
    }
  };
  _.findIndex = function (list, predicate) {
    for (let i = 0, len = list.length; i < len; i++) {
      if (predicate(list[i], i, list)) return i;
    }
    return -1;
  };
  console.log("==================================================");

  // 고차함수 사용
  console.log(
    "고차함수 _.filter",
    _.filter([1, 2, 3, 4], (value) => value > 3),
    _.filter([1, 2, 3, 4], (value, index) => index % 2 === 0)
  );

  // 1.3.5 const identity = v => v; 이건 어디다 스는거징 ??
  _.identity = function (v) {
    return v;
  };
  console.log("==================================================");

  console.log(
    "identity test",
    _.filter([true, 0, 10, "a", false, null], _.identity) // boolean 으로 평가했을때 true로 평가되는 값만 남았다.
  );
  _.falsy = function (value) {
    return !value;
  };
  _.truthy = function (value) {
    return !!value;
  };

  // some / every 만들기
  // _.some = function (list) {
  //   return !!_.find(list, _.identity);
  // };
  // _.every = function (list) {
  //   return _.filter(list, _.identity).length === list.length;
  // };
  console.log("==================================================");

  // console.log("some example", _.some([1, 0, false]));
  // console.log("every example", _.every([{}, 1, true]));
  console.log("==================================================");

  // 연산자를 함수로 변경해서 확장성을 높임.
  // function not(v) {
  //   return !v;
  // }
  // function beq(a) {
  //   return function (b) {
  //     return a === b;
  //   };
  // }
  // _.some = function (list) {
  //   return !!_.find(list, _.identity);
  // };
  // _.every = function (list) {
  //   return beq(-1)(_.findIndex(list, not));
  // };
  // console.log("some example", _.some([1, 0, false]));
  // console.log("every example", _.every([false, 1, true]));
  // console.log("==================================================");

  function not(v) {
    return !v;
  }
  function beq(a) {
    return function (b) {
      return a === b;
    };
  }
  // 1-36 함수를 기능단위로 다시 쪼개기.
  // console.log("_find", _.find([1, 2, 3], _.identity));
  function positive(list) {
    return _.find(list, _.identity);
  }
  function negativeIndex(list) {
    return _.findIndex(list, not);
  }
  _.some = function (list) {
    return not(not(positive(list)));
  };
  _.every = function (list) {
    return beq(-1)(negativeIndex(list));
  };
  console.log("some example", _.some([1, 0, false]));
  console.log("every example", _.every([false, 1, true]));
  console.log("==================================================");
  console.log("==================================================");
  console.log("이제 클로저 연습");
  // 1-49 함수를 리턴하는 함수
  function constant(val) {
    return function () {
      return val;
    };
  }

  const always10 = constant(10);
  console.log(always10());
  console.log(always10());
  console.log(always10());

  console.log("==================================================");

  function callWith(val1) {
    return function (val2, func) {
      return func(val1, val2);
    };
  }

  const callWith10 = callWith(10);
  console.log(
    "call with 10",
    callWith10(20, (a, b) => a + b),
    callWith10(20, (a, b) => a - b)
  );
  console.log(
    "변수 없이 바로 사용",
    callWith(10)(20, (a, b) => a + b)
  );

  console.log(
    "map에 적용하기",
    callWith([1, 2, 3])(function (v) {
      return v * 10;
    }, _.map)
  );

  console.log("==================================================");
  _.get = function (list, idx) {
    return list[idx];
  };
  // 코드 1-52
  const callWithUsers = callWith([
    { id: 2, name: "QQ", age: 33 },
    { id: 4, name: "ZZ", age: 37 },
    { id: 5, name: "AA", age: 36 },
  ]);

  console.log("call with users", callWithUsers(2, _.get));
  console.log("==================================================");

  function add(a, b) {
    return a + b;
  }
  const add10 = add.bind(null, 10);
  console.log(add10(20));

  console.log("==================================================");
  // partial 만들기.
  Function.prototype.partial = function () {
    const fn = this,
      _args = arguments; // 클로저가 기억할 변수에는 원본을 남기기
    return function () {
      const args = Array.prototype.slice.call(_args); // 리턴된 함수가 실행될때마다 복사하여 원본을 지키기
      let arg = 0;
      for (let i = 0; i < args.length && arg < arguments.length; i++) {
        if (args[i] === undefined) args[i] = arguments[arg++];
      }
      return fn.apply(this, args);
    };
  };

  function addTotal() {
    let result = 0;
    for (let i = 0; i < arguments.length; i++) {
      result += arguments[i];
    }
    return result;
  }

  console.log("==================================================");
  console.log("partial 결과");
  const add3 = addTotal.partial(undefined, undefined, 3, undefined, undefined);
  console.log(add3(1, 2, 4, 5));
  console.log(add3(20, 20, 20, 20));
}
