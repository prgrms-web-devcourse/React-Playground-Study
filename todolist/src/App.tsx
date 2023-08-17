import { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('')

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(inputValue)
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
    </div>
  )
}

export default App
