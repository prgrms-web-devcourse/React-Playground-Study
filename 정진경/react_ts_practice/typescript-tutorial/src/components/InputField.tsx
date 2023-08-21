import React from 'react'
import './styles.css'

interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handleAdd: (e: React.FormEvent) => void // return 하지 않는 경우
}

//const InputFeild: React.FC<Props> = () => 해도 된다.
const InputFeild = ({ todo, setTodo, handleAdd }: Props) => {
  return (
    <form className='input' onSubmit={handleAdd}>
      <input
        type='input'
        value={todo} // 해당 입력 필드의 기본값을 나타낸다.
        onChange={(e) => setTodo(e.target.value)}
        placeholder='Enter a todo'
        className='input__box'
      />
      <button className='input_submit' type='submit'>
        Go
      </button>
    </form>
  )
}

export default InputFeild
