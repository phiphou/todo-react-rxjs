import React from 'react'
import { deleteTodo, ToggleTodo } from '../rxjs'

const Todo = ({ todo }) => {
  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => ToggleTodo(todo.id)}
      />
      <div className={todo.completed ? 'todoLabel completed' : 'todoLabel'}>
        {todo.name}
      </div>
      <button className="deleteBtn" onClick={() => deleteTodo(todo.id)}>
        X
      </button>
    </div>
  )
}

export default Todo
