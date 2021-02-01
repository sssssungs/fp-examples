{
  function addMaker(a) {
    return function(b) {
      return a + b;
    };
  }
  var add3 = addMaker(3);
  // console.log(add3(5));
  // console.log(add3(10));

  var users = [
    { id: 1, name: "ID", age: 32 },
    { id: 2, name: "AA", age: 29 },
    { id: 3, name: "IU", age: 30 },
    { id: 4, name: "BC", age: 20 },
    { id: 5, name: "PQ", age: 35 },
    { id: 6, name: "SS", age: 24 },
    { id: 7, name: "AH", age: 28 }
  ];

  var temp_user = [];
  for (var i = 0, len = users.length; i < len; i++) {
    if (users[i].age < 30) temp_user.push(users[i]);
  }
  // console.log("temp_user under 30", temp_user);

  var ages = [];
  for (var i = 0, len = temp_user.length; i < len; i++) {
    ages.push(temp_user[i].age);
  }
  // console.log("under 30 ages: ", ages);

  var temp_user2 = [];
  for (var i = 0, len = users.length; i < len; i++) {
    if (users[i].age >= 30) temp_user2.push(users[i]);
  }
  // console.log("temp_user upper 30", temp_user2);

  var names = [];
  for (var i = 0, len = temp_user2.length; i < len; i++) {
    names.push(temp_user2[i].name);
  }
  // console.log("over 30 ages: ", names);

  //  filter를 생성함.
  function filter(list, predicate) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
      if (predicate(list[i])) new_list.push(list[i]);
    }
    return new_list;
  }

  var user_under_30 = filter(users, user => user.age < 30);
  // console.log("user_under_30", user_under_30);

  // map을 생성함.
  function map(list, iteratee) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
      new_list.push(iteratee(list[i]));
    }
    return new_list;
  }
  var ages_under_30 = map(
    filter(users, user => user.age < 30),
    user => user.age
  );

  var names_under_30 = map(
    filter(users, user => user.age < 30),
    user => user.name
  );
  // console.log("ages_under_30", ages_under_30);
  // console.log("names_under_30", names_under_30);

  // 함수를 생성하는 함수를 만든다.
  function bvalue(key) {
    return function(obj) {
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
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i].id === id) return list[i];
    }
  }
  function findByName(list, name) {
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i].name === name) return list[i];
    }
  }
  // console.log(findById(users, 1));
  // console.log(findByName(users, "SS"));
  // 인자 이용해 중복을 제거
  function findBy(key, list, val) {
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i][key] === val) return list[i];
    }
  }

  console.log(findBy("name", users, "PQ"));
}
