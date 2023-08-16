import React from 'react'
import './styles.css'

interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
}

//const InputFeild: React.FC<Props> = () => 해도 된다.
const InputFeild = ({ todo, setTodo }: Props) => {
  return (
    <form className='input'>
      <input
        type='input'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder='Enter a task'
        className='input__box'
      />
      <button className='input_submit' type='submit'>
        Go
      </button>
    </form>
  )
}

export default InputFeild
