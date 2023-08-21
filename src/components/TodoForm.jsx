import React, { useState } from 'react'
import { addTodo, clearAll, clearCompleted } from '../rxjs'

const TodoForm = ({}) => {
  const [todo, setTodo] = useState('')

  const todoAdd = (e) => {
    e.preventDefault()
    addTodo(todo)
    setTodo('')
  }

  return (
    <div>
      <form onSubmit={(e) => todoAdd(e)}>
        <input
          type="text"
          value={todo}
          placeholder="Thing to be done?"
          onInput={(e) => setTodo(e.target.value)}
        />
        <button type="submit" disabled={todo === ''}>
          Add Todo
        </button>
      </form>
      <div className="clearBtns">
        <button className="clearBtn" onClick={clearCompleted}>
          Clear completed
        </button>
        <button className="clearBtn" onClick={clearAll}>
          Clear all tasks
        </button>
      </div>
    </div>
  )
}

export default TodoForm
