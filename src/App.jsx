import React, { lazy, Suspense } from 'react'
import {
  Switch,
  Route,
  BrowserRouter as Router,
  NavLink
} from 'react-router-dom'
import TodoList from './components/TodoList'
import './App.css'
import logo from './logo.svg'

const About = lazy(() => import('./components/About'))

function App() {
  return (
    <div>
      <Router>
        <div className="header">
          <div className="container">
            <div className="brand">
              <img src={logo} className="logo" />
              <h2>React-RxJs TodoList</h2>
            </div>
            <div className="menu">
              <NavLink exact to="/">
                <div className="menu-item">Home</div>
              </NavLink>
              <NavLink exact to="/about">
                <div className="menu-item">About</div>
              </NavLink>
            </div>
          </div>
        </div>

        <Switch>
          <Route path="/" exact component={TodoList} />
          <Route
            path="/about"
            exact
            render={() => (
              <Suspense
                fallback={
                  <div className="container">
                    <h1>Loading…</h1>
                  </div>
                }
              >
                <About />
              </Suspense>
            )}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
