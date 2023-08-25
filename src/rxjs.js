import { useEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs'

let todos = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos'))
  : []

export const todos$ = new BehaviorSubject(todos)

export const addTodo = (text) => {
  todos = [
    {
      id: new Date().getTime(),
      name: text,
      completed: false
    },
    ...todos
  ]
  todos$.next(todos)
}

export const ToggleTodo = (id) => {
  todos = todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  )
  todos$.next(todos)
}

export const deleteTodo = (id) => {
  todos = todos.filter((t) => t.id !== id)
  todos$.next(todos)
}

export const clearCompleted = () => {
  todos = todos.filter((todo) => !todo.completed)
  todos$.next(todos)
}

export const clearAll = () => {
  todos = []
  localStorage.removeItem('todos')
  todos$.next(todos)
}

export const useTodos = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    todos$.subscribe((todos) => {
      setTodos([...todos])
      localStorage.setItem('todos', JSON.stringify(todos))
    })
  }, [])

  return todos
}
