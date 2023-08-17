import { useState } from 'react'

type Todo = {
  id: number
  content: string
}

function App() {
  const [inputValue, setInputValue] = useState('')
  const [todoList, setTodoList] = useState<Todo[]>([])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTodoList((prev) => [...prev, { id: todoList.length + 1, content: inputValue }])
    setInputValue('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="container">
      <h1 className=" text-center text-2xl text-indigo-300">
        <span className="material-symbols-outlined">lightbulb</span>여기는 준일팀이 함께 만들어가는 TodoList 공간입니다!
      </h1>

      <form onSubmit={handleFormSubmit}>
        <input onChange={handleInputChange} value={inputValue} placeholder="할 일을 추가해주세요!" />

        <button>추가</button>
      </form>

      <ul>
        {todoList.map(({ id, content }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
