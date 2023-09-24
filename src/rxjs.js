import { useEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs'

export const FILTER_ALL = 'FILTER_ALL'
export const FILTER_COMPLETED = 'FILTER_COMPLETED'
export const FILTER_UNCOMPLETED = 'FILTER_UNCOMPLETED'

let todos = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos'))
  : []

export const todos$ = new BehaviorSubject(todos)

export const filter$ = new BehaviorSubject(FILTER_ALL)

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

export const updateFilter = (filter) => {
  filter$.next(filter)
}

export const useTodos = () => {
  const [todosS, setTodosS] = useState(todos)
  const [filteredTodos, setFilteredTodos] = useState([])
  const [filter, setFilter] = useState(FILTER_ALL)

  useEffect(() => {
    todos$.subscribe((todos) => {
      setTodosS([...todos])
      setFilteredTodos([...todos])
      localStorage.setItem('todos', JSON.stringify(todos))
    })

    filter$.subscribe((filterMode) => {
      setFilter(filterMode)
      setFilteredTodos(
        todos.filter((todo) => {
          switch (filterMode) {
            case FILTER_ALL:
              return true
            case FILTER_COMPLETED:
              return todo.completed
            case FILTER_UNCOMPLETED:
              return !todo.completed
          }
        })
      )
    })
  }, [])

  return [todosS, filteredTodos]
}
