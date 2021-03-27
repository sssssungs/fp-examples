// 3.3.7 find 만들기
let _ = {};
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
function getLength(list) {
  return list == null ? void 0 : list.length;
}

var isArrayLike = function (list) {
  var length = getLength(list);
  return typeof length == "number" && length >= 0 && length < MAX_ARRAY_INDEX;
};

function bloop(new_data, body, stopper) {
  return function (data, iter_predi) {
    iter_predi = iter_predi || _.idtt;
    var result = new_data(data);
    var memo;
    if (isArrayLike(data))
      for (var i = 0, len = data.length; i < len; i++) {
        memo = iter_predi(data[i], i, data);
        if (!stopper) body(memo, result, data[i], i);
        else if (stopper(memo)) return body(memo, result, data[i], i);
      }
    else
      for (var i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
        memo = iter_predi(data[keys[i]], keys[i], data);
        if (!stopper) body(memo, result, data[i], i);
        else if (stopper(memo))
          return body(memo, result, data[keys[i]], keys[i]);
      }
    return result;
  };
}
_.isObject = function (obj) {
  var type = typeof obj;
  return type === "function" || (type === "object" && !!obj);
};

_.keys = function (obj) {
  return _.isObject(obj) ? Object.keys(obj) : [];
};
_.noop = () => {};
_.idtt = (v) => v;

// predicate가 true를 리턴하면 stopper인 _.idtt가 받은 값을 그대로 리턴해줘서 if에 걸린다.
_.find = bloop(
  _.noop, // 하나도 못찾은겨우 undefined를 리턴하기 위해
  (bool, result, val) => val, // body - stopper 조건에 부합한경우 그대로 리턴할 값
  _.idtt // stopper - 참일때 나가기 위해 memo 값을 그대로 return
);

console.log(
  "find test",
  _.find([1, 2, 3, 4, 5], (b) => b > 2)
);

console.log(
  "find test 222",
  _.find(
    [
      { id: 2, user: "a" },
      { id: 3, user: "b" },
      { id: 4, user: "c" },
    ],
    (user) => (user.user = "a")
  )
);
_.array = () => [];
_.push_to = (val, obj) => {
  obj.push(val);
  return val;
};
_.noop = () => {}; // 아무일도 하지 않는 함수.
_.map = bloop(_.array, _.push_to);
_.identity = (v) => v;
_.idtt = _.identity;
_.values = function (list) {
  return _.map(list, _.identity);
};
// 코드 3-54 작은함수들
_.toArray = function (list) {
  return Array.isArray(list) ? list : _.values(list);
};

_.rest = function (list, num) {
  // 배열의 앞에서부터 num 만큼의 값들을 제거한 새로운 배열을 리턴한다.
  return _.toArray(list).slice(num || 1);
};

_.rester = function (func, num) {
  return function () {
    return func.apply(null, _.rest(arguments, num));
  };
};
_.constant = function (v) {
  return function () {
    return v;
  };
};
_.find2 = bloop(_.noop, _.rester(_.idtt, 2), _.idtt); //이렇게도 변경가능하다.
// _.rester(_.idtt, 2) 는 앞에 두개의 인자를 제외한 인자를 그대로 리턴

_.findIndex = bloop(_.constant(-1), _.rester(_.idtt, 3), _.idtt); // 기본값을 -1
_.findKey = bloop(_.noop, _.rester(_.idtt, 3), _.idtt); // 기본값을 undefined

console.log(
  "find index",
  _.findIndex([1, 2, 3, 4, 5], (v) => v > 2)
);

console.log(
  "find key",
  _.findKey({ id: 4, name: "a", age: 22 }, (v) => typeof v === "string")
);
_.not = (v) => !v;
_.some = bloop(_.constant(false), _.constant(true), _.idtt);
_.every = bloop(_.constant(true), _.constant(false), _.not);

console.log(
  "some",
  _.some([1, 2, 3, 0, 5], (v) => v === 0),
  "every",
  _.some([1, 2, 3, 4, 5], (v) => v > 0)
);
