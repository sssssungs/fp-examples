const obj = {};
const a = 1;
obj[a > 2 ? "a" : "b"] = a; // 대괄호 내부에서는 코드 형태도 가능하다.
console.log(obj);
console.log("===========================================");
// 함수를 객체로 사용하기
function Obj8() {}
Obj8.a = 1;
Obj8.b = 2;

const test = new Obj8();
test.a = 1;
console.log("객체 형태의 함수 인스턴스?", test);
console.log("===========================================");

// 코드 2-8 배열에 숫자가 아닌 Key 사용하기
const obj10 = [];
obj10.a = 1;
// 가능은 하지만 이 경우 length 는 변하지 않는다. 1개를 넣었지만 length가 0으로 나옴.
console.log("배열에 숫자가 아닌 key 사용하기", obj10, obj10.length);
console.log("===========================================");

// 코드 2-10 한번에 length 올리기! 안티패턴이므로 사용은 자제하기.
const obj12 = [];
obj12.length = 5;
console.log("한번에 length 올리기", obj12);

const obj13 = [1, 2];
obj13[5] = 5;
console.log("한번에 올리잣.", obj13, obj13.length);
obj13.push(6);
console.log("한번에 올리잣.", obj13, obj13.length);
