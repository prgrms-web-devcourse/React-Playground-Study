import { useRef, useState } from 'react'
import { generateId } from '~/utils/common'

type Todo = {
  id: string
  content: string
}

function App() {
  const [inputValue, setInputValue] = useState('')
  const [todoList, setTodoList] = useState<Todo[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!inputRef.current) {
      return
    }

    e.preventDefault()

    setTodoList((prev) => [...prev, { id: generateId(), content: inputValue }])
    setInputValue('')

    inputRef.current.focus()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleRemoveButtonClick = ({ id, content }: Todo) => {
    confirm(`${content}\n정말 삭제하시겠습니까..?`) && setTodoList((todos) => todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="container">
      <h1 className=" text-center text-2xl text-indigo-300">
        <span className="material-symbols-outlined">lightbulb</span>여기는 준일팀이 함께 만들어가는 TodoList 공간입니다!
      </h1>

      <form onSubmit={handleFormSubmit}>
        <input ref={inputRef} onChange={handleInputChange} value={inputValue} placeholder="할 일을 추가해주세요!" />

        <button>추가</button>
      </form>

      <ul>
        {todoList.map(({ id, content }) => (
          <li key={id} className="flex gap-1">
            <p>{content}</p>

            <button onClick={() => handleRemoveButtonClick({ id, content })}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
