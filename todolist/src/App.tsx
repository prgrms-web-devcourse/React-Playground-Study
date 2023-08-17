import { useRef, useState } from 'react'
import { generateId } from '~/utils/common'
import Button from '~/components/common/Button'

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
      <h1 className=" my-10 text-center text-2xl text-indigo-300">
        <span className="material-symbols-outlined">lightbulb</span>여기는 준일팀이 함께 만들어가는 TodoList 공간입니다!
      </h1>

      <form onSubmit={handleFormSubmit} className="relative mb-10">
        <input
          ref={inputRef}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="할 일을 추가해주세요!"
          className="relative w-full rounded-xl border-2 border-indigo-300 p-2 pr-10 placeholder-slate-300"
        />

        <Button className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center">
          <span className="material-symbols-outlined text-indigo-300">add_circle</span>
        </Button>
      </form>

      <ul className="flex flex-col gap-5">
        {todoList.map(({ id, content }) => (
          <li key={id} className="flex">
            <p className="flex-1 text-2xl text-slate-500">{content}</p>

            <Button
              className="flex items-center justify-center"
              onClick={() => handleRemoveButtonClick({ id, content })}
            >
              <span className="material-symbols-outlined">delete</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
