# React : memoiation

리액트로 개발을 하다보면 굳이 반복해서 렌더링 될 필요가 없는 컴포넌트가 계속 반복적으로 렌더링되는 문제를 찾을 수 있을겁니다. 그리고 또 그 컴포넌트가 복잡한 로직을 수행한다면 성능이 너무 안 좋아 지겠죠? 이런 문제를 개선하기 위해 memoization 을 사용할 수 있습니다.

## memoization 이 뭘까?

- 기존 값을 메모리에 저장해 두고 특정 액션이 실행된 뒤, 값이 **이전 값과 동일하면 이를 재사용**하는 기법.
- Memoized된 내용을 재사용하여 렌더링할 시, **가상 DOM에서 바뀐 부분을 확인하지** 않아 성능이 향상됨.

### 메모이제이션 전에 꼭 알아야 할 리액트 특징

- 리액트가 상태관리를 할 수 있는 이유는 가상 DOM을 만들어놓고 값이 바뀔 때 마다 **컴포넌트를 새로 그리기** 때문입니다.
- 값을 비교하고 어디서 해당 값을 업데이트해줘야 하는지 찾지 않고 무조건 가상 DOM을 새로 그리기 때문에 상태관리가 쉬운 것이다. 하지만 이렇게 하면 값이 그대로인 부분도 매번 새로 그려야 한다는 성능상의 단점이 있다. 이때문에 나온 것이 리액트 메모제이션 기법입니다. **값이 그대로인 것들을 새로 그리는 노동을 줄임으로써 성능을 아낄 수 있습니다.**

### **react 메모이제이션**

- 리액트에서 제공하는 메모이제이션 기법은 아래 메소드들을 통해서 사용할 수 있습니다.
  - `React.memo(컴포넌트)`
  - `useCallback(() => { 함수 그 자체... }, [])`
  - `useMemo(() => 함수의 리턴 값, [])`

### **React.memo()**

- 리액트에서 제공하는 고차컴포넌트입니다.
  - 고차컴포넌트란 어떤 컴포넌트를 인자로 받아서 새로운 컴포넌트를 반환해 주는 함수
- 컴포넌트 자체를 메모이제이션
- **자체적으로 props값을 비교**해서 달라진 부분이 없다면 리액트 DOM에서 비교 작업이 들어가지 않는다.
- React.memo()의 경우에도 좀 더 최적화된 컴포넌트를 반환해 주는데 랜더링이 되어야 상황에 놓일때 마다 **prop check**를 통해서 자신이 받는 prop에 변화가 있는지 확인해서 변화가 있을때만 랜더링을 하고 없다면 새로 랜더링을 하는게 아니라 `기존에 랜더링이 된 내용을 재사용`한다.
  - 아래 예시를 보면 `<School/>` 컴포넌트가 랜더링 될때 마다 자동으로 `<Student/>`가 렌더링이 되는 상황이다.
    ```jsx
    const School = (props) => {
    	const [schoolEvent,setSchoolEvent] = useState(0);
    	const incrementSchoolEvent = () => {
    		setSchoolEvent(schoolEvent + 1)
    	}

    	return (
    		<button onClick={incrementSchoolEvent}>학교행사추가</button>
    		{schoolEvent}
    		<Student
    			name={'김땡땡'}
    			age={20}
    			address={'김땡땡집주소'}
        />
    	)
    }
    ```
    ```jsx
    const Student = ({name, age, address}) => {
    	... 뭔가 복잡하고 무거운 로직... (성적을 산출한다던가)

    	return (
    		<div>
    			<h1>{name}</h1>
    			<span>{age}</span>
    			<span>{address}</span>
    		</div>
    	)
    }

    export default Student;
    // export default memo(Student);
    ```
  - 이때 `<Student />`가 React.memo를 통해서 최적화가 되어 있다면 **prop check**해서 동일하다면 새로 랜더링 하지 않고 기존 값을 사용하겠죠?
  - 이렇게 `memo(Student)`를 해주면 School에서 state가 변경돼서 School 컴포넌트를 재렌더링 해야 하는 상황에서 Student 컴포넌트의 재렌더링을 막아줌
- 주의사항❗️
  - React.memo()를 사용하면 렌더링 횟수 감소를 통해서 이득을 볼 수 있지만 무분별하게 사용한다면 오히려 메모리 문제로 성능 저하를 일으킨다.
  - React.memo는 오직 props 변화에만 의존하는 최적화 방법이다.
    - 만약 컴포넌트가 useState, useReducer, useContext 와 같은 훅을 사용한다면, props에 변화가 없더라도 다시 렌더링이 된다는 것을 알고 있어야 한다.
- 그럼 언제 React.memo를 사용해야 할까⁉️
  1 컴포넌트가 같은 Props로 자주 렌더링 될 때
  2 컴포넌트가 렌더링이 될때마다 복잡한 로직을 처리해야 할때

### useMemo는 react의 메모이제이션 훅과 함께 쓰면 더 좋다!

- 예를 들어 보자

```jsx
 const School = (props) => {
	const [schoolEvent,setSchoolEvent] = useState(0);
	const incrementSchoolEvent = () => {
		setSchoolEvent(schoolEvent + 1)
	}

	const name = {
		lastName: '김',
		firstName: '땡땡'
	}

	return (
		<button onClick={incrementSchoolEvent}>학교행사추가</button>
		{schoolEvent}
		<Student
			name={name}
			age={20}
			address={'김땡땡집주소'}
    />
	)
}
```

```jsx
const Student = ({name, age, address}) => {
	... 뭔가 복잡하고 무거운 로직... (성적을 산출한다던가)

	console.log('랜더링 될때마다 나타남 🐻')

	return (
		<div>
			<h1>성: {name.lastName}</h1>
			<h1>이름: {name.firstName}</h1>
			<span>{age}</span>
			<span>{address}</span>
		</div>
	)
}

export default memo(Student)

```

- 여기서 클릭이벤트를 통해 학교행사를 증가 시켰을때 `<Student/>`는 렌더링이 안 일어날 거 같지만 렌더링이 일어납니다! **`왜죠???`**
  - **객체이기 때문**이에요!
  - 자바스크립트에서의 object는 string, number와 같은 원시타입과는 다르게 변수(name) 안에 그대로 저장 되는 것이 아니라 객체가 저장되어 있는 메모리주소가 변수(name)안에 저장됩니다.
  - 11111 이라는 메모리에 저장이 되어 있었다면 재렌더링시 컴포넌트 내 모든 내용이 초기화가 된다. → 객체의 주소로 초기화 되면서 → name도 초기화 된다. (= 새로운 객체가 생성된다. =다른 메모리 주소(22222)가 name 에 할당된다.) → <Student/>는 prop에 변화가 있는 것으로 받아들인다.
  - ❗️❗️❗️❗️⁉️
  - 이러면 애써 memo()를 사용해서 최적화 해준 보람이 없죠??
  ### useMemo() 훅을 같이 사용해서 메모이제이션 해줍시다!
  - 그러면 객체가 할당되어 있는 메모리 주소가 변하지 않게 돼서 `<Student/>`의 재렌더링을 막을 수 있습니다!
  ```jsx
  const School = (props) => {
  	const [schoolEvent,setSchoolEvent] = useState(0);
  	const incrementSchoolEvent = () => {
  		setSchoolEvent(schoolEvent + 1)
  	}

  	const name = useMemo(() => {
  		return {
  			lastName: '김',
  			firstName: '땡땡'
  		}
  	},[])

  	return (
  		<button onClick={incrementSchoolEvent}>학교행사추가</button>
  		{schoolEvent}
  		<Student
  			name={name}
  			age={20}
  			address={'김땡땡집주소'}
      />
  	)
  }
  ```

### useCallback도 같이 써 봅시다

```jsx
const School = (props) => {
	const [schoolEvent,setSchoolEvent] = useState(0);
	const incrementSchoolEvent = () => {
		setSchoolEvent(schoolEvent + 1)
	}
	const tellMe = () => {
		console.log('공부 해라')
	}
	console.log('School')

	return (
		<button onClick={incrementSchoolEvent}>학교행사추가</button>
		{schoolEvent}
		<Student
			name={'김땡땡'}
			age={20}
			address={'김땡땡집주소'}
			tellMe = {tellMe}
    />
	)
}
```

```jsx
const Student = ({name, age, address, tellMe}) => {
	... 뭔가 복잡하고 무거운 로직... (성적을 산출한다던가)
	console.log('student')
	return (
		<div>
			<h1>{name}</h1>
			<span>{age}</span>
			<span>{address}</span>
			<button onClick={tellMe}>😈</button>
		</div>
	)
}

export default memo(Student);
```

- 악마 버튼을 누르게 되면 공부해라 라는 콘솔로그가 나옵니다.
- 다시 학교 행사 추가 버튼을 누르게 되면 `<School/>` 과 `<Student/>`가 모두 렌더링이 됩니다.
  - `<Student/>` 로 보내주는 prop에는 변화가 없는데 왜 `<Student/>`는 렌더링 될까요??
  - `tellMe`라는 prop이 `함수를 전달 받고 있기 때문`입니다!
  - 자바스크립트에서 함수는 객체의 한 종류이기 때문에 위와 같은 이유로 `tellMe`의 메모리 주소가 바뀌기 때문에 `<Student/>`도 재랜더링 됩니다.

### useMemo()는 어떤 값(혹은 함수의 리턴 값)을 메모이징 하기 위해 사용하는 거라면 useCallback()은 어떤 함수를 메모이징 하기 위해 사용한다!

```jsx
const School = (props) => {
	const [schoolEvent,setSchoolEvent] = useState(0);
	const incrementSchoolEvent = () => {
		setSchoolEvent(schoolEvent + 1)
	}

	const tellMe = useCallback(() => {
		console.log('공부 해라')
	}, [])

	console.log('School')

	return (
		<button onClick={incrementSchoolEvent}>학교행사추가</button>
		{schoolEvent}
		<Student
			name={'김땡땡'}
			age={20}
			address={'김땡땡집주소'}
			tellMe = {tellMe}
    />
	)
}
```

- 이제 메모이징 됐기 때문에 tellMe는 같은 메모리 주소를 갖게 됩니다!
- 이제 학교 행사 추가 버튼을 눌러도 `<Student/>`가 재렌더링 되지 않습니다!

### **useCallback()**

- 함수 자체를 메모이제이션
- 자바스크립트에서 함수는 객체로 취급되기 때문에 리렌더링이 일어날 때마다 새로운 함수가 생성
- 자식 컴포넌트의 불필요한 리렌더링을 막기 위해선 useCallback()으로 감싸줘야 함.
- **deps에 들어있는 의존성 값**이 변경되지 않는다면 이전에 생성한 함수의 참조 값을 반환
- 주의할점❗️
  - 함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭, `deps` 배열 안에 포함시켜야 됩니다! 만약에 `deps` 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면, 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고 보장 할 수 없습니다. props 로 받아온 함수가 있다면, 이 또한 `deps` 에 넣어주어야 합니다!
  ```jsx
  const onToggle = useCallback(
    (id) => {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      )
    },
    [users]
  )
  ```

### useMemo()

- 함수의 리턴 값을 메모이제이션
- **deps에 들어있는 의존성 값**이 변경되지 않는다면 메모이제이션 된 값을 사용.
  - = 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고, 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 됩니다.
  ```jsx
  function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중...')
    return users.filter((user) => user.active).length
  }
  const count = useMemo(() => countActiveUsers(users), [users])
  ```

### **위 메서드들의 공통적으로 주의할 점!**

- 리렌더링이 자주 일어나지 않는다면 굳이 사용할 필요가 없다. (메모리에 불필요하게 남아있을 필요 없음)
- state나 props의 값이 어느 정도 적당히 변경되는 경우 사용해주면 좋을 듯.
