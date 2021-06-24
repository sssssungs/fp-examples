# fp-examples 
함수형 자바스크립트 프로그래밍 노트

1. 함수를 되도록 작게 만들기
2. 다형성이 높은 함수 만들기
3. 상태를 변경하지 않거나 정확히 다루어 부수 효과를 최소화
4. 동일 일자를 받으면 항상 동일한 결과를 리턴하는 순수함수 만들기
5. 복잡한 객체 하나를 인자로 사용하기보다 되도록 일반적인값 여러개를 인자로 사용
6. 큰 로직을 고차함수로 만들고 세부로직을 보조함수로 완성하기
7. 어느곳에서든 바로 실행하거나 혹은 미뤄서 실행할수 있도록 일반함수이자 순수함수로 선언하기
8. 모델이나 컬렉션 등의 커스텀 보다는 기본 객체를 이용하기
9. 로직의 흐름을 최대한 단방향으로 흐르게 하기
10. 작은 함수를 모아 큰 함수만들기

-----

### 참고
[https://clojure.org](https://clojure.org)  
[https://clojurescript.org](https://clojurescript.org)  
[clojurescript github](https://github.com/clojure/clojurescript)

### Partial-js
```
_ == partial
__ == pipe
___ == indent
```

### lazy evaluation
[지연평가](https://plposer.tistory.com/46)  
partial.js에서 네임스페이스를 _대신 L로 변하면 지연평가가 되며,  
나머지 연산은 실행되지 않도록 알아서 최적화를 해준다.  
이는 map, filter 등이 순수함수이기 때문에 가능하다.  
평가 시점이나 평가 순서와 상관없이 동일한 결과를 가져올 수 있기 때문이다.
[출처: https://plposer.tistory.com/46]

## 4가지 유형별 고차함수들
1. 수집하기 - `map`, `pluck`, `values`, `keys`, `pairs` 등  
2. 거르기 - `filter`, `reject`, `difference`, `compact` 등
3. 접기 - `reduce`, `group_by`, `index_by`, `count_by`, `max`, `min` 등  
4. 찾아내기 - `find`, `some`, `every`, `take`, `indexOf`, `findIndex` 등 

`map`, `filter`, `reduce`, `find` 는 대표함수들이다.  
각 유형 중 추상화 레벨이 가장높다. 즉 각 유형별 특화함수를 만들수 있다는 뜻.
