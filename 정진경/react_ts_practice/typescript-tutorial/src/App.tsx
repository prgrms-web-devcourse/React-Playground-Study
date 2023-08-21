import React, { useState } from 'react'
import './App.css'
import InputFeild from './components/InputFeild'
import TodoList from './components/TodoList'
import { Todo } from './model'

const App: React.FC = () => {
  // 굳이 꼭 React.FC를 사용하지 않고 인자에 각각 타입을 지정해 주는 방법 사용가능하다.
  const [todo, setTodo] = useState<string>('') // 초기 상태 타입 지정
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo('')
    }
  }

  return (
    <div className='App'>
      <span className='heading'>🖇️ TODO 🖍️</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default App
