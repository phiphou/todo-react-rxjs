import React, { useState } from 'react'
import {
  FILTER_ALL,
  FILTER_COMPLETED,
  FILTER_UNCOMPLETED,
  updateFilter
} from '../rxjs'

const TodoFilter = () => {
  const [filter, setFilter] = useState(FILTER_ALL)

  const onChangeValue = (event) => {
    setFilter(event.target.value)
    updateFilter(event.target.value)
  }

  return (
    <div className="filter">
      <div onChange={onChangeValue}>
        <input
          type="radio"
          value={FILTER_ALL}
          name="filter"
          defaultChecked={filter === FILTER_ALL}
        />{' '}
        All
        <input type="radio" value={FILTER_COMPLETED} name="filter" /> Completed
        <input type="radio" value={FILTER_UNCOMPLETED} name="filter" />{' '}
        Uncompleted
      </div>
    </div>
  )
}

export default TodoFilter
