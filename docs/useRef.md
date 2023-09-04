# useRef

## useRef란?

`useRef`는 렌더링에 필요하지 않은 값을 참조할 수 있는 React 훅입니다.

컴포넌트가 특정 정보를 ‘기억’하도록 하고 싶지만 해당 정보가 새 렌더링을 촉발하지 않도록 하려는 경우 ref를 사용할 수 있습니다.

```ts
const ref = useRef(initialValue)
```

<br>

### Reference

### `useRef(initialValue)`

컴포넌트의 최상위 레벨에서 `useRef`를 호출하여 `ref`를 선언합니다.

```ts
import { useRef } from 'react';

function MyComponent() {
  const intervalRef = useRef(0)
  const inputRef = useRef(null)
  // ...
```

<br>

### Parameters

매개변수로 전달하는 `initialValue`는 ref 객체의 `current` 프로퍼티의 초기 설정값으로 할당되게 됩니다. 어떤 타입의 값이든 지정할 수 있습니다.

이 인자는 초기 렌더링 이후부터는 무시됩니다.

<br>

### Returns

`useRef`는 단일 프로퍼티를 가진 객체를 반환합니다.

```ts
const intervalRef = useRef(0)
console.log(intervalRef)

// { current: 0 } 출력
```

해당 객체를 JSX 노드의 `ref` 속성으로 React에 전달하면 React는 `current` 프로퍼티를 설정하게 됩니다.

다음 렌더링에서 `useRef`는 동일한 객체를 반환합니다.

<br>

### 주의사항

`ref.current` 프로퍼티는 state와 달리 [변이](https://react-ko.dev/learn/updating-objects-in-state#whats-a-mutation)할 수 있지만, 렌더링에 사용되는 객체(예: state의 일부)를 포함한다면 해당 객체를 변이해서는 안 됩니다.

```ts
ref.current = 5
console.log(ref.current) // 5
```

`ref.current` 프로퍼티를 변경해도 ref는 일반 JavaScript 객체이기 때문에 React는 사용자가 언제 변경했는지 알 수 없습니다. 그렇기 때문에 컴포넌트를 다시 렌더링 하지 않습니다.

초기화를 제외하고는 렌더링 중에 해당 프로퍼티를 get / set 하지 맙시다! 컴포넌트의 동작을 예측할 수 없게 됩니다.

Strict Mode로 인해 컴포넌트 함수가 두 번 호출되기 때문에 ref 객체는 두 번 생성되고 하나는 버려집니다.

<br>

## ref로 값 참조하기

앞에서 ref를 변경하더라도 컴포넌트가 리렌더링 되지 않는다고 말했습니다. 즉, ref는 컴포넌트의 시각적 출력에 영향을 미치지 않는 정보를 저장하는 데 적합합니다.

```ts
function handleStartClick() {
  const intervalId = setInterval(() => {
    // ...
  }, 1000)
  intervalRef.current = intervalId
}

// ref의 interval ID 값을 읽어 해당 interval을 취소할 수 있습니다.
function handleStopClick() {
  const intervalId = intervalRef.current
  clearInterval(intervalId)
}
```

<br>

### ref의 특징

1. 일반 변수는 리렌더링 될 때마다 재할당이 됩니다. 반면에 ref 객체는 동일한 객체를 반환하기 때문에 리렌더링 사이에 정보를 저장할 수 있습니다.
2. state 변수는 변경될 때마다 리렌더링을 촉발합니다.
3. 정보가 공유되는 외부 변수와 달리 각각의 컴포넌트에 로컬로 저장됩니다.

화면에 표시되는 정보를 저장하는 데는 ref보다는 state를 사용하는 게 좋습니다.

<br>

```ts
import { useRef } from 'react'

export default function Counter() {
  // 이벤트 핸들러에서만 읽고 쓰기 때문에 state 대신 ref를 사용합니다.
  let ref = useRef(0)

  function handleClick() {
    ref.current = ref.current + 1
    alert('You clicked ' + ref.current + ' times!')
  }

  return <button onClick={handleClick}>Click me!</button>
}
```

<br>

### `ref.current` 사용 시점

렌더링 중에는 `ref.current`를 쓰거나 읽지 말라고 언급했었죠? 위의 예시처럼 이벤트 핸들러나 Effect에서 ref를 읽거나 쓸 수 있습니다.

```ts
function MyComponent() {
  // ...
  useEffect(() => {
    // ✅ Effect에서 ref를 읽거나 쓸 수 있습니다.
    myRef.current = 123
  })
  // ...
  function handleClick() {
    // ✅ 이벤트 핸들러에서 ref를 읽거나 쓸 수 있습니다.
    doSomething(myOtherRef.current)
  }
  // ...
}
```

<br>

## ref로 DOM 조작하기

먼저 초기값이 `null`인 ref 객체를 선언합니다.

```ts
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);
  // ...
```

그 다음 ref 객체를 `ref` 속성으로 조작하려는 DOM 노드의 JSX에 전달할 수 있습니다.

```ts
// ...
return <input ref={inputRef} />
```

JSX로 전달하면 React가 DOM 노드를 생성하고 화면에 그린 후, ref 객체의 `current` 프로퍼티를 DOM 노드로 설정합니다.

```ts
console.log(inputRef) // { current: input } 출력, input은 DOM 노드
```

이제 DOM 노드 `<input>`에 접근해 `focus()`와 같은 **빌트인 브라우저 API**를 사용할 수 있습니다.

만약 노드가 화면에서 제거되면 React는 `current` 프로퍼티를 다시 `null`로 설정합니다.

### ref를 이용한 DOM 수동 조작

React가 관리하는 DOM 노드를 수동으로 수정하려 하면 React가 수행하는 변경 사항과 충돌할 위험이 있습니다.
그러나 React가 업데이트할 이유가 없는 DOM의 일부는 안전하게 수정할 수 있습니다.

<br>

## 커스텀 컴포넌트에 대한 ref 설정 방법

```ts
const inputRef = useRef(null)

return <MyInput ref={inputRef} />

// 경고: 함수 컴포넌트에는 ref를 지정할 수 없습니다.
// 이 ref에 접근하려는 시도는 실패합니다.
// React.forwardRef()를 사용하려고 하셨나요?
```

기본적으로 컴포넌트는 내부의 DOM 노드에 대한 ref를 외부로 노출하지 않습니다. React가 컴포넌트의 다른 컴포넌트의 DOM 노드에 접근하는 것을 허용하지 않기 때문입니다.
부모 컴포넌트가 컴포넌트 내부의 DOM을 조작할 수 있도록 하고 싶을 때.
`forwardRef`를 사용할 수 있습니다.

```ts
import { forwardRef } from 'react'

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />
})

export default MyInput
```

이런 식으로 작성하면 커스텀 컴포넌트의 ref를 가져올 수 있습니다.
`MyInput` 컴포넌트를 `forwardRef`를 사용하여 선언하면, `props` 다음의 두 번째 `ref` 인수에 위의 `inputRef`를 받도록 설정됩니다.

<br>

만약, 부모 컴포넌트가 다른 작업을 하지 않도록 기능을 제한하고 싶다면 `useImperativeHandle`을 사용할 수 있습니다.

```ts
const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null)
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus()
    },
  }))
  return <input {...props} ref={realInputRef} />
})
```

부모 컴포넌트에 사용하는 `ref.current` 프로퍼티에는 `focus` 메서드만 있게 됩니다.

<br>

## 타입스크립트의 `useRef`

`@types/react`의 `index.d.ts`를 보면 `useRef`는 3개의 정의가 오버로딩되어 있습니다.

```ts
function useRef<T>(initialValue: T): MutableRefObject<T>
function useRef<T>(initialValue: T | null): RefObject<T>
function useRef<T = undefined>(): MutableRefObject<T | undefined>

interface MutableRefObject<T> {
  current: T
}

interface RefObject<T> {
  readonly current: T | null
}
```

`useRef`의 반환 타입으로 `MutableRefObject`와 `RefObject`가 있습니다. 각각 타입의 정의를 보면 모두 `current` 프로퍼티를 갖는 것을 알 수 있습니다.

세 개의 오버로딩 된 `useRef`를 예시와 함께 살펴보겠습니다.

<br>

### `useRef<T>(initialValue: T): MutableRefObject<T>`

매개변수 타입과 제너릭 타입이 `T`로 일치한다면, `{ current : T }` 타입의 객체를 반환합니다.

```ts
const localVarRef = useRef<number>(0)
```

<br>

### `useRef<T>(initialValue: T|null): RefObject<T>`

매개변수 타입이 `null`을 허용한다면, `{ readonly current: T | null }` 타입의 객체를 반환합니다.

```ts
const localVarRef = useRef<number>(null)
```

여기서는 매개변수로 `null` 값을 전달했습니다. 다시 한 번 오버로딩을 보겠습니다.

```ts
function useRef<T>(initialValue: T | null): RefObject<T>

interface RefObject<T> {
  readonly current: T | null
}
```

`null` 값을 받는 경우 `RefObject` 타입의 값을 반환하게 됩니다. 즉, `current` 프로퍼티는 `readonly`가 되기 때문에 나중에 값을 수정할 수 없습니다.

`readonly` 대상은 `current` 프로퍼티므로, `current` 프로퍼티의 하위 프로퍼티는 얼마든지 수정할 수 있습니다. 따라서 `current`에 DOM 노드가 할당된 이후에는 `value`와 같은 값들을 수정할 수 있습니다.

```ts
const inputRef = useRef<HTMLInputElement>(null)

const handleButtonClick = () => {
  if (inputRef.current) {
    inputRef.current.value = ''
  }
}

return (
  // ...
  <input ref={inputRef} />
)
```

<br>

### `useRef<T = undefined>(): MutableRefObject<T | undefined>`

제너릭 타입이 `undefined`라면(타입을 제공하지 않았다면), `{ current: undefined }` 타입의 객체를 반환합니다.

DOM 요소를 다루기 위해서는 해당 방법으로 선언하면 안됩니다.

```ts
const inputRef = useRef<HTMLInputElement>()

return (
  // ...
  <input ref={inputRef} />
)
//       ~~~  'MutableRefObject<undefined>' 형식은 'LegacyRef<HTMLInputElement> | undefined' 형식에 할당할 수 없습니다.
//            'MutableRefObject<undefined>' 형식은 'RefObject<HTMLInputElement>' 형식에 할당할 수 없습니다.
//            'current' 속성의 형식이 호환되지 않습니다.
//            'undefined' 형식은 'HTMLInputElement | null' 형식에 할당할 수 없습니다.
```

`ref` 프로퍼티는 `RefObject` 타입만 받기 때문에 에러가 뜨게 됩니다.

<br>

요약하자면, 로컬 변수 용도라면 제너릭 타입과 같은 타입의 초기값을 넣어주고, DOM 조작을 할 경우에는 `null`로 초기값을 넣어주는 것이 적절한 방법입니다.

<br>

### 제너릭 타입 지정 꿀팁

```ts
import { useRef } from 'react'

const Component = () => {
  // What goes here?
  const audioRef = useRef<NoIdeaWhatGoesHere>(null)

  return <audio ref={audioRef}>Hello</audio>
}
```

보통 처음에는 각각의 DOM 노드가 어떤 타입인지 모르는 경우가 많습니다.

대부분은 직접 DOM 노드의 속성 위에 마우스를 올린 후 타입스크립트가 알려주는 타입을 확인하고 적용하여 문제를 해결합니다.
하지만 더 쉬운 방법으로는 React가 제공하는 `ElementRef`가 있습니다.

```ts
import { useRef, ElementRef } from 'react'

const Component = () => {
  const audioRef = useRef<ElementRef<'audio'>>(null)

  return <audio ref={audioRef}>Hello</audio>
}
```

<br>

`ElementRef`를 사용하면 커스텀 컴포넌트의 ref를 참조하는 경우에도 타입을 간단하게 정의할 수 있습니다.

```ts
import { OtherComponent } from './other-component'
import { useRef, ElementRef } from 'react'

// Pass it in via typeof!
type OtherComponentRef = ElementRef<typeof OtherComponent>

const Component = () => {
  const ref = useRef<OtherComponentRef>(null)

  return <OtherComponent ref={ref}>Hello</OtherComponent>
}
```

<br>

## 더 알아볼 것

- ref 콜백
- `forwardRef`

<br>

## 참고 문서

https://react-ko.dev/reference/react/useRef <br>
https://react-ko.dev/learn/referencing-values-with-refs <br>
https://react-ko.dev/learn/manipulating-the-dom-with-refs <br>
https://driip.me/7126d5d5-1937-44a8-98ed-f9065a7c35b5 <br>
https://www.totaltypescript.com/strongly-type-useref-with-elementref <br>
