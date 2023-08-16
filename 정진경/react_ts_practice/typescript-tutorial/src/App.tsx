import React, { useState } from 'react'
import './App.css'
import InputFeild from './components/InputFeild'

const App: React.FC = () => {
  // 굳이 꼭 React.FC를 사용하지 않고 인자에 가각 타입을 지정해 주는 방법 사용가능하다.
  const [todo, setTodo] = useState<string>('') // 초기 상태 타입 지정

  console.log(todo)

  return (
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputFeild todo={todo} setTodo={setTodo} />
    </div>
  )
}

export default App
