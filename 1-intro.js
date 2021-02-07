{
  function addMaker(a) {
    return function(b) {
      return a + b;
    };
  }
  let add3 = addMaker(3);
  // console.log(add3(5));
  // console.log(add3(10));

  let users = [
    { id: 1, name: "ID", age: 32 },
    { id: 2, name: "AA", age: 29 },
    { id: 3, name: "IU", age: 30 },
    { id: 4, name: "BC", age: 20 },
    { id: 5, name: "PQ", age: 35 },
    { id: 6, name: "SS", age: 24 },
    { id: 7, name: "AH", age: 28 }
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

  let user_under_30 = filter(users, user => user.age < 30);
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
    filter(users, user => user.age < 30),
    user => user.age
  );

  let names_under_30 = map(
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
    this.getId = function(){ return id;}
    this.getName = function(){ return name;}
    this.getAge = function(){ return age;}
  }

  const users2 = [
      new User(1, 'QQ', 33),
      new User(2, 'AA', 23),
      new User(3, 'WW', 23),
      new User(4, 'RR', 31),
      new User(5, 'TT', 36),
      new User(6, 'ZZ', 32),
      new User(7, 'QQ', 33),
  ]

  function find(list, predicate) {
    for(let i = 0, len = list.length; i< len; i++) {
      if(predicate(list[i])) return list[i];
    }
  }

  console.log('users2', find(users2, user => user.getAge() === 33).getName());
  console.log('user', find(users, user => user.name.indexOf('I')));

  // 1-25 b match1으로 predicate 만들기 (closure)
  const bmatch1 = (key, val) => function (obj) {
    return obj[key] === val;
  };

  console.log('find with bmatch', find(users, bmatch1('id', 5)));
  console.log('filter with bmatch', filter(users, bmatch1('age', 28)))
  console.log('map with bmatch', map(users, bmatch1('age', 28)))


  // 1-27 bmatch
  const object = (key,val) => {
    const obj = {};
    obj[key] = val;
    return obj;
  }

  const match = (obj, obj2) => {
    for(let key in obj2) {
      if(obj[key] !== obj2[key]) return false;
    }
    return true;
  }

  function bmatch(obj2, val) {
    console.log('arguments.length', arguments)
    if(arguments.length === 2) obj2 = object(obj2, val);
    console.log('obj2', obj2)
    return function(obj) {
      return match(obj, obj2);
    }
  }

  console.log('match', match(find(users, bmatch('id',3), find(users, bmatch('name', 'IU')))))

}
