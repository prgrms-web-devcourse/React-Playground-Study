## Getting Started with Create React App

useRef()에 대해 공부해보자.

- useRef()는 리렌더링 하지 않는다. 컴포넌트의 속성만 조회&수정한다.

- 사용방법

1. Ref 객체 만들어 주기
   const 변수명 = useRef()
2. 선택하고 싶은 DOM에 속성으로 ref값 설정해 주기 (2번 부분은 상황에 따라 다양하게 사용가능)
3. 변수명.current 값은 우리가 선택하고자 하는 DOM을 가리킨다.

- 사용 목적

1. 불필요한 랜더링 없이 값을 변경하고 저장하기 위해 (변수 관리)

- 컴포넌트가 마운팅 되는 시점부터 마운트 해제될 때까지 같은 값을 계속해서 유지할 수 있다.

2. DOM 요소에 접근(주로 input 요소를 클릭하지 않고 포커스를 주고 싶을때 )
