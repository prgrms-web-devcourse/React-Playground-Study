import { useCallback, useState } from 'react'
import './styles.css'

interface Props {
  handleAdd: (value: string) => void // return 하지 않는 경우
}

//const InputFeild: React.FC<Props> = () => 해도 된다.
const InputFeild = ({ handleAdd }: Props) => {
  const [value, setValue] = useState<string>('')

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      handleAdd(value)
      setValue('')
      e.preventDefault()
    },
    [value, handleAdd]
  )

  return (
    <form className='input' onSubmit={onSubmit}>
      <input
        type='input'
        value={value} // 해당 입력 필드의 기본값을 나타낸다.
        onChange={onChange}
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
