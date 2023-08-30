# react - batching

## 📗 등장 배경

- state를 사용할 때 렌더링을 효율적으로 하기 위해 [batching](https://www.notion.so/ee5cf46717a046acada2ad6585ac2933?pvs=21)이라는 개념이 등장
  > 이벤트 핸들러와 그 안에 있는 코드가 완료될 때까지 UI가 업데이트 되지 않는다.
- batching이라는 개념이 이벤트 핸들러 내에서만 작동
- Promise, setTimeout, 기본 이벤트 핸들러에 대해서도 적용

## 📗 특징

### 0. batching

의도대로 사용하기 위해서는 교체(특정 값을 바로 넣는 형태)가 아니라 업데이트 함수를 사용해야 한다.

교체와 업데이트 함수는 어떤 차이가 있을까

> 다음 렌더링 중에 `useState` 를 호출하면 React는 큐를 순회합니다.
> 이전 `number` state는 `0`이었으므로 React는 이를 첫 번째 업데이터 함수에 `n` 인수로 전달합니다.
> 그런 다음 React는 이전 **업데이터 함수의 반환 값**을 가져와서 다음 업데이터 함수에 `n`으로 전달하는 식으로 반복합니다
>
> | queued update | n   | returns   |
> | ------------- | --- | --------- |
> | n => n + 1    | 0   | 0 + 1 = 1 |
> | n => n + 1    | 1   | 1 + 1 = 2 |
> | n => n + 1    | 2   | 2 + 1 = 3 |

```tsx
import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1); //교체
          console.log("첫 번째", number); //어떤 값이 콘솔에 출력될까요?

          setNumber(number + 1);
          console.log("두 번째", number); //어떤 값이 콘솔에 출력될까요?

          setNumber((n) => n + 1); //업데이트
          console.log("세 번째", number); //어떤 값이 콘솔에 출력될까요?
        }}
      >
        +3
      </button>
    </>
  );
}
```

예상과는 다른 결과가 나올 수 있다. 업데이트 함수를 사용하면 원하는 값이 바로 나와야 하는 게 아닌가?

이런 상황은 흔하게 발생하는 상황은 아니라고 한다. 해당 내용처럼 값이 바뀌는 것을 원하면 아래 코드 처럼 작성하는게 맞을 것이다.

```tsx
onClick={() => {
				let newNumber = number
				newNumber += 3
        setNumber(newNumber)
      }}
```

### 1. automatic batching

react 18이 적용 되고 그 내용 중에 automatic batching이라는 개념이 포함 되어있다. 기존에 batching은 Promise, setTimeout, 기본 이벤트 핸들러에 대해서는 적용되지 않았다.

이 특징을 개선한 것이 automatic batching 이다.

```tsx
//react 18 이전
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// React 18 이전에는 오직 React 이벤트들만 batch되었습니다.

function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React는 마지막에 단 한 번만 리렌더링합니다. (그게 batching이죠!)
}

setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React는 각 상태 업데이트마다 한 번씩, 총 두 번 렌더링합니다. (batching 없음)
}, 1000);
```

위에서 아래로 적용되었다.

```tsx
//react 18 이후 적용
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React 18 이후로 timeout, 프로미스,
// 네이티브 이벤트 핸들러 또는 다른 이벤트 내의 업데이트도 batch 됩니다.

function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React는 마지막에 단 한 번만 리렌더링합니다. (그게 batching이죠!)
}

setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React는 마지막에 단 한 번만 리렌더링합니다. (그게 batching이죠!)
}, 1000);
```

batching을 원하지 않는다면 flushSync를 사용하여 구분 가능

```tsx
import { flushSync } from "react-dom";

function handleClick() {
  flushSync(() => {
    setCounter((c) => c + 1);
  });
  // 이 시점에서 React는 DOM을 업데이트합니다.
  flushSync(() => {
    setFlag((f) => !f);
  });
  // 이 시점에서 React는 DOM을 업데이트합니다.
}
```

### 1-1 flushSync 사용 주의 사항

> 문제는 Hook이 있는 함수 컴포넌트에는 영향을 미치지 않는데, state를 설정해도 [useState](https://ko.react.dev/learn/state-as-a-snapshot)에서 기존 변수가 업데이트되지 않기 때문입니다.

- **1-1-1 automatic batching Test - 함수형 컴포넌트**
  ```tsx
  import { useState } from "react";
  import { flushSync } from "react-dom";

  export default function Counter() {
    const [number, setNumber] = useState(0);

    const handleNumber = () => {
      flushSync(() => {
        setNumber((number) => number + 1);
      });
      console.log(number);
    };

    return (
      <>
        <h1>{number}</h1>
        <button onClick={handleNumber}>1</button>
      </>
    );
  }
  ```
- **1-1-2 automatic batching Test - 클래스 컴포넌트**
  ```tsx
  import React from "react";
  import { flushSync } from "react-dom";

  export default class Counter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        number: 0,
      };
    }

    handleNumber = () => {
      flushSync(() => {
        this.setState(({ number }) => ({ number: number + 1 }));
      });
      console.log(this.state.number);
    };

    render() {
      return (
        <>
          <h1>{this.state.number}</h1>
          <button onClick={this.handleNumber}>1</button>
        </>
      );
    }
  }
  ```

hooks에서 해결 방법…? useEffect…

react 18이 적용되면서 비동기함수나 기본 이벤트 핸들러에 상관 없이 batching이 적용 된다. 함수형 컴포넌트에서도 flushSync를 사용하는 것이 가능하지만, 랜더링이 발생한 시점의 상태 값은 변하지 않는다. 상태값을 이용하지 않고 랜더링 후의 화면?과 같은 요소의 변화를 [이용](https://codesandbox.io/s/flushsync-example-4j4iyq?from-embed=&file=/src/App.js)하는 것은 가능하다.

### **Automatic batching을 살펴보고**

업데이트 이전에 비동기 함수나 기본 이벤트 핸들러 내에서 상태를 업데이트 할 때에는 트릭(?)처럼 사용했다고 하면, 업데이트 이후에는 방식을 통합하여 트릭을 제거하고 useEffect나 flushSync라는 것을 통해 사용하도록 일관성?을 높이는 효과도 생기지 않았을까 생각했다.
