import React, { useState } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'

type Props = {
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    )
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    )
    setEditMode(!editMode)
  }

  return (
    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
      {editMode ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className='todo__single--test'
        />
      ) : todo.isDone ? (
        <s className='todos__single--text'>{todo.todo}</s>
      ) : (
        <span className='todos__single--text'>{todo.todo}</span>
      )}

      <div>
        <span className='icon'>
          <AiFillEdit
            onClick={() => {
              // isEditMode가 false이고 isDone이 false면
              if (!editMode && !todo.isDone) {
                setEditMode(!editMode)
              }
            }}
          />
        </span>
        <span className='icon'>
          <AiFillDelete onClick={(e) => handleDelete(todo.id)} />
        </span>
        <span className='icon'>
          <MdDone onClick={(e) => handleDone(todo.id)} />
        </span>
      </div>
    </form>
  )
}

export default SingleTodo
