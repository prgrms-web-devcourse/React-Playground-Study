https://github.com/ssi02014/react-query-tutorial

# `TanStack Query(React Query v4)`

데이터 관리와 상태 관리를 위한 라이브러리다. 이를 사용하면 애플리케이션에서 서버에서 가져온 데이터를 효과적으로 관리하고 업데이트할 수 있다. `React Query`는 간단하고 직관적인 API를 제공하여 데이터 요청, 캐싱, 리패칭, 업데이트, 오류 처리 등의 작업을 쉽게 수행할 수 있다.

`React Query`를 사용하면 컴포넌트 간의 데이터 공유와 동기화가 간단해지며, 불필요한 데이터 요청을 방지하고 성능을 최적화할 수 있다. 또한 **서버와의 통신을 추상화**하여 코드를 단순화하고 유지 보수를 편리하게 할 수 있다.

<details>
<summary>🤔 데이터 요청, 캐싱, 리패칭, 업데이트, 오류 처리는 각각 어떤 과정일까?</summary>
<div markdown="1">

- `데이터 요청`은 애플리케이션이 서버에서 필요한 정보를 요청하는 과정이다. 이것은 클라이언트가 서버로 데이터를 요청하고 서버는 그 요청에 대한 응답을 제공하는 것을 의미한다.
- `캐싱`은 이미 불러온 데이터를 메모리에 저장해두는 것을 의미한다. 이렇게 하면 같은 데이터를 다시 요청할 때 서버에 요청을 보내지 않고 캐시에서 데이터를 가져와 성능을 향상시킬 수 있다.
- `리패칭`은 **캐시된 데이터를 주기적으로 갱신**하거나, 사용자가 **명시적으로 새로운 데이터를 요청**할 때 데이터를 다시 불러오는 과정이다. 이렇게 하면 데이터가 항상 최신 상태를 유지하고 사용자 경험을 개선할 수 있다.
- `업데이트`는 데이터의 내용이 변경될 때 해당 변경 사항을 업데이트하는 과정이다. 이것은 캐시된 데이터나 화면에 표시된 데이터를 **서버의 변경 사항과 동기화**시키는 것을 의미한다.
- `오류 처리`는 데이터 요청 또는 업데이트 과정에서 발생할 수 있는 문제를 다루는 것이다. 이것은 **네트워크 오류, 서버 오류, 또는 데이터 유효성 검사 오류** 등을 처리하여 애플리케이션의 안정성을 유지하는데 중요하다.

</div>
</details>

`React Query`는 클라이언트 상태와 서버 상태를 명확히 구분하기 위해 만들어졌다.

- 클라이언트 상태(Client State)와 서버 상태(Server State)는 완전히 다른 개념이며, 클라이언트 상태는 각각의 input 값으로 예를 들 수 있고, 서버 상태는 **데이터베이스에 저장되어 있는 데이터**로 예를 들 수 있다.

## 기본 작성 방법

```tsx
// v4
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      // ...
    },
  },
})

await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: fetchPosts })
```

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({ /* options */});

function App() {
  return (
   <QueryClientProvider client={queryClient}>
      <div>블라블라</div>
   </QueryClientProvider>;
  );
}
```

- 위 예시에서 `App.js`에 `QueryClientProvider`로 컴포넌트를 감싸고, client props에다 `queryClient`를 연결함으로써, 이 context는 앱에서 비동기 요청을 알아서 처리하는 `background` 계층이 된다.

## 많이 사용되는 메서드

[](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#useQueryClient)

1. [`queryClient.useQueryClient`](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#useQueryClient)
2. [`queryClient.getQueryData`](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#getQueryData) 기존 쿼리의 캐시된 데이터를 가져오는 데 사용할 수 있는 동기 함수다. 쿼리가 존재하지 않으면 `undefined`를 반환한다.
3. [`queryClient.getQueriesData`](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#getQueriesData) 여러 쿼리의 데이터를 가져오는데 사용할 수 있는 동기 함수 입니다. 전달된 `queryKey` 또는 `filters`와 일치하는 쿼리만 반환한다. 일치하는 쿼리가 없으면 빈 배열이 반환된다.
4. [`queryClient.setQueryData`](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#setQueryData) 캐싱된 쿼리 데이터를 즉시 업데이트하는데 사용할 수 있는 동기 함수다.
5. [`queryClient.setQueriesData`](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#setQueriesData)
6. [`queryClient.invalidateQueries`](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#invalidateQueries) 특정 쿼리 또는 쿼리 그룹에 속한 모든 쿼리를 무효화시킨다. 데이터를 갱신할 때 사용된다.
7. [`queryClient.refetchQueries`](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#refetchQueries) 특정 조건에 따라 쿼리를 다시 가져오는 데 사용하는 함수다.
8. [`queryClient.cancelQueries`](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#cancelQueries) 현재 실행 중인 모든 쿼리를 취소한다. 불필요한 네트워크 요청을 방지할 때 유용하다. (낙관적 업데이트 때 많이 사용)
9. [`queryClient.removeQueries`](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#removeQueries) 특정 쿼리 또는 쿼리 그룹에 속한 모든 쿼리를 제거한다. 더 이상 필요하지 않은 데이터를 삭제할 때 사용된다.
10. [`queryClient.resetQueries`](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#resetQueries) 액세스 가능한 캐시 쿼리를 초기 상태로 재설정하는데 사용하는 함수다.
11. [`queryClient.clear`](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#clear) 모든 캐시된 데이터를 삭제한다. 애플리케이션 초기화 또는 로그아웃 시에 사용될 수 있다.

### `queryClient.prefetchQuery`

- 미리 fetch 해오겠다는 뜻
- 이 메서드는 필요한 데이터를 미리 가져오지 않아도 즉시 해결될 수 있거나 쿼리가 실행된 후에 해결될 수 있는 프로미스를 반환한다. **데이터를 반환하거나 오류를 throw하지 않는다.**
- 예를 들어 페이지네이션을 구현했다고 가정하면, 페이지1에서 페이지2로 이동했을 때 페이지3의 데이터를 미리 받아놓는 것

```tsx
const prefetchNextPosts = async (nextPage: number) => {
  const queryClient = useQueryClient()
  // 해당 쿼리의 결과는 일반 쿼리들처럼 캐싱된다.
  await queryClient.prefetchQuery(
    ['posts', nextPage],
    () => fetchPosts(nextPage),
    { ...options }
  )
}

// 단순 예
useEffect(() => {
  const nextPage = currentPage + 1

  if (nextPage < maxPage) {
    prefetchNextPosts(nextPage)
  }
}, [currentPage])
```

### `queryClient.cancelQueries`

- 쿼리를 **수동으로 취소하고 싶을 때** 사용하는 메서드
  - ex) 사용자가 취소 버튼을 클릭하여 요청을 중지하도록 할 때
  - ex) 페이지를 벗어날 때

```tsx
const query = useQuery(['super-heroes'], {
  /* ...options */
})

const queryClient = useQueryClient()

const onCancelQuery = (e) => {
  e.preventDefault()

  queryClient.cancelQueries(['super-heroes'])
}

return <button onClick={onCancelQuery}>Cancel</button>
```

## Devtools

- devtools는 기본값으로 `process.env.NODE_ENV === 'development'` 인 경우에만 실행된다, 즉 일반적으로 개발환경에서만 작동하므로 설정되어있으므로, 프로젝트 배포 시에 Devtools 삽입코드를 제거해줄 필요가 없다.

```bash
$ npm i @tanstack/react-query-devtools
```

## 캐싱 라이프 사이클

- React-Query 캐시 라이프 사이클

```
* Query Instances with and without cache data(캐시 데이터가 있거나 없는 쿼리 인스턴스)
* Background Refetching(백그라운드 리패칭)
* Inactive Queries(비활성 쿼리)
* Garbage Collection(가비지 컬렉션)
```

- `cacheTime`의 기본값 5분, `staleTime` 기본값 0초를 가정

1. `A`라는 queryKey를 가진 A 쿼리 인스턴스가 `mount`됨
2. 네트워크에서 데이터 fetch하고, 불러온 데이터는 A라는 queryKey로 `캐싱`함
3. 이 데이터는 `fresh`상태에서 `staleTime(기본값 0)` 이후 `stale` 상태로 변경됨
4. A 쿼리 인스턴스가 `unmount`됨
5. 캐시는 `cacheTime(기본값 5min)` 만큼 유지되다가 `가비지 콜렉터(GC)`로 수집됨
6. 만일, cacheTime이 지나기 전이고, A 쿼리 인스턴스 fresh한 상태라면 새롭게 mount되면 캐시 데이터를 보여준다.

## `useQuery`

[useQuery | TanStack Query Docs](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
// 사용법(1)
const { data, isLoading, ... } =  useQuery(queryKey, queryFn, {
  // ...options ex) enabled, staleTime, ...
});

// 사용법(2)
const result = useQuery({
  queryKey,
  queryFn,
  // ...options ex) enabled, staleTime, ...
});

result.data
result.isLoading
// ...
```

```tsx
// 실제 예제
const getAllSuperHero = async () => {
  return await axios.get('http://localhost:4000/superheroes')
}

const { data, isLoading } = useQuery(['super-heroes'], getAllSuperHero)

// 혹은
const useSuperHeroData = (heroId: string) => {
  return useQuery(['super-hero', heroId], () => getSuperHero(heroId), {
    cacheTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
    retry: 1,
    // ...options
  })
}
```

- `queryKey`는 무조건 **배열**로 지정해야 한다.
- `queryFn`은 `Promise`를 반환하는 함수를 넣어야 한다.

<details>
<summary>`useQuery` 모든 옵션</summary>
<div markdown="1">

```tsx
const {
  data,
  dataUpdatedAt,
  error,
  errorUpdateCount,
  errorUpdatedAt,
  failureCount,
  failureReason,
  fetchStatus,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isInitialLoading,
  isLoading,
  isLoadingError,
  isPaused,
  isPlaceholderData,
  isPreviousData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  refetch,
  remove,
  status,
} = useQuery({
  queryKey,
  queryFn,
  cacheTime,
  enabled,
  networkMode,
  initialData,
  initialDataUpdatedAt,
  keepPreviousData,
  meta,
  notifyOnChangeProps,
  onError,
  onSettled,
  onSuccess,
  placeholderData,
  queryKeyHashFn,
  refetchInterval,
  refetchIntervalInBackground,
  refetchOnMount,
  refetchOnReconnect,
  refetchOnWindowFocus,
  retry,
  retryOnMount,
  retryDelay,
  select,
  staleTime,
  structuralSharing,
  suspense,
  useErrorBoundary,
})
```

</div>
</details>

### 여러 개의 쿼리 처리

`useQueries`

```tsx
// v4
const queryResults = useQueries({
  queries: [
    {
      queryKey: ['super-hero', 1],
      queryFn: () => fetchSuperHero(1),
      staleTime: Infinity, // 다음과 같이 option 추가 가능
    },
    {
      queryKey: ['super-hero', 2],
      queryFn: () => fetchSuperHero(2),
      staleTime: 0,
    },
    // ...
  ],
})
```

## CUD

[useMutation | TanStack Query Docs](https://tanstack.com/query/v4/docs/react/reference/useMutation)

- 기본적으로 데이터를 Get(Read)할 때는 `useQuery`를 사용한다.
- CUD(Create, Update, Delete)는 `useMutation`을 사용한다.

```tsx
const CreateTodo = () => {
  const mutation = useMutation(createTodo, {
    onMutate() {
      /* ... */
    },
    onSuccess(data) {
      console.log(data)
    },
    onError(err) {
      console.log(err)
    },
    onSettled() {
      /* ... */
    },
  })

  const onCreateTodo = (e) => {
    e.preventDefault()
    mutation.mutate({ title })
  }

  return <>...</>
}
```

- useMutation의 반환 값인 mutation 객체의 `mutate` 메서드를 이용해서 요청 함수를 호출할 수 있다.
- mutate는 `onSuccess`, `onError` 메서드를 통해 성공 했을 시, 실패 했을 시 response 데이터를 핸들링할 수 있다.
- `onMutate`는 mutation 함수가 실행되기 전에 실행되고, mutation 함수가 받을 동일한 변수가 전달된다.
- `onSettled`는 try...catch...finally 구문의 `finally`처럼 요청이 성공하든 에러가 발생되든 상관없이 마지막에 실행된다.

[useMutation callback과 mutate callback의 차이](https://github.com/ssi02014/react-query-tutorial#-usemutation-callback%EA%B3%BC-mutate-callback%EC%9D%98-%EC%B0%A8%EC%9D%B4)

## 그 외 기능

- 종속 처리 가능: `enabled` 옵션
- 무한 스크롤 가능: `useInfiniteQuery`
- 쿼리 무효화(캐시 데이터 최신화): `invalidateQueries`
- 캐시 데이터 즉시 업데이트(동기 함수): `setQueryData`
- 낙관적 업데이트: `cancelQueries` `invalidateQueries` `setQueryData` 응용
- 에러가 발생했을 때 Fallback UI 처리 가능: `react-error-boundary` `useQueryErrorResetBoundary`
- 로딩 중일 때 Fallback UI 처리 가능: `Suspense`와 결합한 에러바운더리 처리,, ⇒ `useSuspenseQuery` 훅도 있는 것 같다. v5 버전인 듯!

## **React Query Typescript**

### `useQuery`

- TQueryFnData: useQuery로 실행하는 query function의 `실행 결과`의 타입을 지정하는 제네릭 타입
- TError: query function의 `error` 형식을 정하는 제네릭 타입
- TData: useQuery의 `data에 담기는 실질적인 데이터`의 타입
- TQueryKey: useQuery의 첫 번째 인자 `queryKey`의 타입을 명시적으로 지정해주는 제네릭 타입

```tsx
// useQuery 타입 적용 예시
const { data } = useQuery<
  SuperHeros,
  AxiosError,
  SuperHeroName[],
  [string, number]
>(['super-heros', id], getSuperHero, {
  select: (data) => {
    const superHeroNames = data.data.map((hero) => hero.name)
    return superHeroNames
  },
})

/**
 주요 타입
 * data: `SuperHeroName[]`
 * error: `AxiosError<any, any>`
 * select: `(data: SuperHeros): SuperHeroName[]`
 */
```

### `useMutation`

- TData: useMutaion에 넘겨준 mutation function의 `실행 결과`의 타입을 지정하는 제네릭 타입
  - data의 타입과 onSuccess(1번째 인자)의 인자의 타입으로 활용된다.
- TError: useMutaion에 넘겨준 mutation function의 `error` 형식을 정하는 제네릭 타입
- TVariables: `mutate 함수`에 전달 할 인자를 지정하는 제네릭 타입
  - onSuccess(2번째 인자), onError(2번째 인자), onMutate(1번째 인자), onSettled(3번째 인자) 인자의 타입으로 활용된다.
- TContext: mutation function을 실행하기 전에 수행하는 `onMutate 함수의 return값`을 지정하는 제네릭 타입
  - onMutate의 결과 값의 타입을 onSuccess(3번째 인자), onError(3번째 인자), onSettled(4번째 인자)에서 활용하려면 해당 타입을 지정해야 한다.

```tsx
// useMutation 타입 적용 예시
const { mutate } = useMutation<Todo, AxiosError, number, number>(postTodo, {
  onSuccess: (res, id, nextId) => {},
  onError: (err, id, nextId) => {},
  onMutate: (id) => id + 1,
  onSettled: (res, err, id, nextId) => {},
})

const onClick = () => {
  mutate(5)
}

/** 
 주요 타입
 * data: `Todo`
 * error: `AxiosError<any, any>`
 * onSuccess: `(res: Todo, id: number, nextId: number)`
 * onError: `(err: AxiosError, id: number, nextId: number)`
 * onMutate: `(id: number)`
 * onSettled: `(res: Todo, err: AxiosError, id: number, nextId: number)`,
*/
```

## React Query 개발 꿀팁

[[번역] #1: 현실적인 리액트 쿼리](https://parang.gatsbyjs.io/react/2022-react-01/)

- re-fetch를 잘 인식하기 위해 개발자 도구 network 탭에서 throttle을 걸자!
