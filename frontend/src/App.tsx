import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Link } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hi, I'm Ratnesh!</h1>
      <div className="card">
        <p>
          This is my submisssion for the Nexora Full Stack Developer Assessment.
          <br />
          Visit the <Link to="/products">Products</Link> page to get started.
        </p>
      </div>
      <p className="read-the-docs">
        Read the project readme on GitHub for more details.
      </p>
    </>
  )
}

export default App
