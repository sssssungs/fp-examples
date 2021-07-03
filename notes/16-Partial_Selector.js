const _ = require("partial-js");
var users = [
  {
    id: 1,
    name: "BJ",
    post_count: 3,
    posts: [
      {
        id: 1,
        body: "hi",
        comments: [{ id: 3, body: "comment3" }],
      },
      {
        id: 2,
        body: "hi2",
        comments: [
          { id: 1, body: "comment1" },
          { id: 2, body: "comment2" },
        ],
      },
      {
        id: 4,
        body: "hi4",
        comments: [
          { id: 4, body: "comment4" },
          { id: 5, body: "comment5" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "PJ",
    post_count: 1,
    posts: [{ id: 3, body: "hi3", comments: [] }],
  },
];

console.log("......................................................");
console.log(
  _.sel(users, "0->name"),
  _.sel(users, "1->name"),
  _.sel(users, "0 -> post_count"),
  _.sel(users, "1 -> post_count"),
  _.sel(users, "0 -> posts -> 1 -> body")
);
console.log(
  _.sel(users, "(u => u.id == 1) -> name"),
  _.sel(users, "(u => u.id == 1) -> posts -> (p => p.id == 4) -> body")
); // predicate 자리에 넣어서 사용할수 있다.
// _.lambda 를 사용한다. ( = _.l) 이고 lambda 는 문자열로 화살표 함수를 만드는 함수다. 변수 이름은 $ 로 대체할수 있다.
_.go(
  users,
  _.find(_.l("$.id==1")),
  function (user) {
    return user.name;
  },
  console.log
);
// 더 짧게 만들도록 $.id==를 # 으로 대체할수도 있다
_.go(users, _.find(_.l("#1")), (user) => user.name, console.log);

console.log(
  _.sel(users, "($.post_count > 1) -> posts -> ($.comments.length > 1) -> body")
);
console.log("......................................................");
// 6-30 _.set 을 이용하면 sel 에서 찾은값을 변경할수 있다.
var user = {
  id: 1,
  name: "BJ",
  post_count: 3,
  posts: [
    {
      id: 1,
      body: "hi",
      comments: [{ id: 3, body: "comment3" }],
    },
    {
      id: 2,
      body: "hi2",
      comments: [
        { id: 1, body: "comment1" },
        { id: 2, body: "comment2" },
      ],
    },
    {
      id: 4,
      body: "hi4",
      comments: [
        { id: 4, body: "comment4" },
        { id: 5, body: "comment5" },
      ],
    },
  ],
};
_.set(user, "posts -> (#4) -> comments -> (#4) -> body", "update comment4"); // 내부의 값을 직접 변경하는 함수다.
console.log(user.posts[2].comments[0].body);
// _.set 의 immutable 버전은 _.im.set 이 있다. 중첩구조를 파고 들면서 새로 만들어야하는 값만 새로 만들고,
// 그대로 재활용해도 되는 데이터는 그대로 재활용한다.
