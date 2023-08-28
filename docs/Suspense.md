# Suspense

## Motivation

`Suspense`가 기존 비동기 요청을 처리하는데 있어 발생하는 여러 문제들을 해결한다고 판단

- 초기에 `Suspense`는 `React.lazy`를 활용한 코드 스플리팅만을 지원
- 궁극적으로 `Suspense`는 비동기 작업을 처리하도록 지원하는 것을 목표

## Description

- `Suspense` 이전에는 하나의 컴포넌트 안에서 많은 분기가 발생한다. -> 명령적 (Imperative)
- `Suspense` 이후에는 분기를 처리하는 부분에 대한 책임을 `Suspense`에게 맡긴다. -> 선언적 (Declarative)

-> 컴포넌트 내부에는 정상적으로 데이터가 로딩되었을 때의 UI만 선언할 수 있다.
-> 비즈니스 로직과 UI에만 집중할 수 있다.

코드를 통해 이해해보자.

```jsx
function List({ pageId }) {
  return items[pageId].map((item) => <li>{item}</li>);
}
```

컴포넌트를 해석할 때 위에서부터 아래로 이해할 수 있으며 이러한 코드 형태는 선언적이다.

하지만 비동기 코드가 더해지면 어떻게 될까?

```jsx
function List({ pageId }) {
  const [items, setItems] = useState();

  useEffect(() => {
    fetchItems(pageId).then(setItems);
  }, []);

  return items[pageId].map((item) => <li>{item}</li>);
}
```

더 이상 위에서 아래로 코드를 읽을 수 없게 된다.
또한, `pageId`가 변경되었을 때를 생각해보면 위와 같은 코드 형태는 문제를 발생시킨다.

다음으로 데이터 패칭 라이브러리를 사용한 경우를 알아보자.

```jsx
function List({ pageId }) {
  const [items, isLoading] = useData(pageId);

  if (isLoading) {
    return <Spinner />;
  }

  return items[pageId].map((item) => <li>{item}</li>);
}
```

이러한 코드 형태는 위에서 아래로 코드를 편하게 읽을 수 있게 해준다.

하지만 개선할 부분은 존재한다.
과연 두 개의 관심사, 즉 로딩과 성공이 같이 있을 필요가 있을까?

같은 공간에 두면 다음과 같은 문제가 발생한다.

```jsx
function Header() {
  const [data, isLoading] = useData();

  if (isLoading) {
    return /* ??? */
  }

  return (...);
}
```

다른 컴포넌트에서도 데이터를 사용할 때마다 로딩 상태에 대한 분기 처리가 필요해진다.
또한, 로딩 상태에서 `<Spinner />`를 보여줄 수도 있고 `null`로 처리할 수도 있다.
이를 매번 생각해내는 것은 힘든 일이 된다.

이제 로딩과 성공 상태를 분리해보자.

```jsx
function List({ pageId }) {
  const items = useData(pageId);

  return items[pageId].map((item) => <li>{item}</li>);
}
```

코드를 위에서 아래로 읽으면서 더 이상 로딩 상태에 관심을 가지지 않는다.
데이터 그 자체에만 집중할 수 있게 되는 것이다.

그러면 로딩 상태는 어떻게 처리되는 것일까?

```jsx
<Suspense fallback={<Spinner />}>
  <List pageId={pageId} />
</Suspense>
```

컴포넌트 내부에서 로딩 상태를 처리하는 것이 아닌 부모 컴포넌트에서 처리하도록 한다.

그리고 여기서 중요하게 생각할 부분은 로딩 상태를 `JSX`안에 처리한다는 것이다.
선언적인 방식으로 `JSX` 안에 UI에 대한 작업을 진행하도록 한다.

`Suspense`를 활용하여 이전 예로 잠시 돌아가보자.

```jsx
function Header() {
  const data = useQuery(...);

  return (
    <>
      {data.info}
    </>
  )
}
```

컴포넌트 내부에 로딩 상태를 생각하지 않고 데이터에만 집중한다.

```jsx
<Suspense fallback={<Skeleton />}>
  <Header />
  <List pageId={pageId} />
</Suspense>
```

로딩 상태에 대해서도 어느 데이터를 읽어야 하는지 생각할 필요가 없게 된다.

![suspense-loading](./imgs/suspense-loading.png)

## 나아갈 키워드

- 대수적 효과
  - [모두를 위한 대수적 효과](https://overreacted.io/ko/algebraic-effects-for-the-rest-of-us/)
  - [Algebraic Effects of React Suspense](https://blog.mathpresso.com/algebraic-effects-of-react-suspense-157b49807ea0)
  - [Infrastructure.js](https://gist.github.com/sebmarkbage/2c7acb6210266045050632ea611aebee)
- 동시성
  - [Suspense와 선언적으로 Data fetching처리](https://fe-developers.kakaoent.com/2021/211127-211209-suspense/)

## 참고 문서

- [Conceptual Model of React Suspense](https://blog.mathpresso.com/conceptual-model-of-react-suspense-a7454273f82e)
- [React 18 Keynote](https://www.youtube.com/watch?v=FZ0cG47msEk&t=409s)
- [토스ㅣSLASH 21 - 프론트엔드 웹 서비스에서 우아하게 비동기 처리하기](https://www.youtube.com/watch?v=FvRtoViujGg)
