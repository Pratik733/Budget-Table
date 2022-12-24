import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Table from './components/table'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Table />
  )
}

export default App
