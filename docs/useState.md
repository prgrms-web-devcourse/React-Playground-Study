## 📗 react - state 등장 배경

- 바닐라 자바스크립트 같은 곳에서 직접 DOM을 수정하고, 직접 렌더링 시키는 작업이 많았다.
  - 규모가 커지면 복잡해진다.
- 조금 더 효율적으로 관리하기 위해 클로저를 이용하여 DOM에 관련된 정보를 변수로 저장했다.
  - react에서 state라고 부른다.

## 📗 useState는 비동기적으로 동작한다?

### 📘 왜 이런 말이 나오게 된걸까?

react에서는 state를 useState를 통해서 관리하게 되는데, state를 변경하려고 하면 setter를 이용해야 한다.
setter를 이용해서 state를 변경하려고 할 때 의도적으로 동작하지 않아서 그 원리에 대해 다루다가 비동기적으로 동작한다는 말이 등장한 듯 하다. 아래는 공식 문서에 있던 코드이다.

```tsx
import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
```

onClick이라는 함수에서 number에 1을 더해주는 행위가 의도에 맞게 동작하지 않는다. setNumber를 세 번 호출 했지만 number는 1이 된다. 결과가 비동기 함수를 사용했을 때와 비슷하다고 생각되기도 한다.

### 0. state

공식 문서에서는 해당 내용을 스냅샷으로서의 state라고 안내한다.

state 변수를 설정할 때, 변수를 바로 변경하는 것이 아닌, 리렌더링을 발동 시키는 구조이다.

공식 문서에 나와 있는 내용 중 한 부분이다.

> [“렌더링”](https://ko.react.dev/learn/render-and-commit#step-2-react-renders-your-components)이란 React가 컴포넌트, 즉 함수를 호출한다는 뜻입니다. 해당 함수에서 반환하는 JSX는 시간상 UI의 스냅샷과 같습니다. prop, 이벤트 핸들러, 로컬 변수는 모두 **렌더링 당시의 state를 사용해** 계산됩니다.

### 1. 리렌더링을 하는 것과 setter는 무슨 상관인가?

state 업데이트 큐(setter)는 렌더링의 효율을 위한 batch라는 특성이 있는데, 이 특성과 연관이 있다.

batch는 여러 state 업데이트들을 한번에 처리하는 것을 말한다. 공식 문서에 나와있는 사진은 다음과 같다.

![i_react-batching.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fd612c49-58d2-4547-95bc-c562646205c7/i_react-batching.png)

여러 state 업데이트가 들어오면 한 곳에 저장해 두었다가 한 번에 처리하는 것이다.

보통, 하나의 함수가 끝날 때 까지 state 업데이트들을 모아두고 처리 한다.

보통이라고 이야기 한 이유는 중간에 awiat이 들어가기도 하는데, 이 때는 16ms내에 발생한 state 업데이트 내용을 기준으로 하는 듯 하다. ( 해당 내용은 다른 블로그에서 얻은 내용으로 추측한 내용 입니다..)

이러한 이유들(setter가 동작하는 방식)로 useState는 비동기적으로 동작한다.

### 2. 그렇다면 useState의 setter는 비동기 함수일까?

찾아보면서 비동기적으로 작동한다는 이야기와 렌더링이 큐에 들어간다고 하는 내용을 읽으면서, 비동기 함수가 아닌가? 하고 궁금해져서 조금 더 찾아보게 되었다.

**2.1 비동기 함수란?**

> 비동기 함수는 이벤트 루프를 통해 비동기적으로 작동하는 함수로, 암시적으로 `[Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)`를 사용하여 결과를 반환합니다. 그러나 비동기 함수를 사용하는 코드의 구문과 구조는, 표준 동기 함수를 사용하는것과 많이 비슷합니다.

**2.2 비동기 함수의 특징**

[해당 블로그](https://velog.io/@jay/setStateisnotasync)에도 나와 있지만 내용이 너무 어려워서 다른 내용을 기준으로 확인해 보았다.

- 일반적으로 실행 시간을 예측할 수 없다.
- 함수에서 특정한 작업을 기다리지 않고 즉시 반환한다.
- task queue에 들어간다.

이렇게 특징들을 나열해 보고 나서 useState와는 다른 점들을 알게 되었다. setter로 인한 렌더링은 렌더링 큐라는 곳에 들어가고, 특정 함수가 끝나거나 특정 시간이 지났을 때 렌더링이 발생하기 때문에 비동기 함수와는 거리가 조금 있지 않을까 하고 생각했다.
