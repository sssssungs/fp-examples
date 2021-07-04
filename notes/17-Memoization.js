function memoize(func) {
  var cache = {};
  return function (arg) {
    if (cache[arg]) {
      console.log("캐시결과에서 바로 리턴", arg);
      return cache[arg];
    }
    console.log("본체 실행함.", arg);
    return (cache[arg] = func.apply(this, arguments));
  };
}

var mult5 = memoize(function (a) {
  return a * 5;
});
console.log(mult5(1));
console.log(mult5(2));
console.log(mult5(1));
console.log(mult5(2));
