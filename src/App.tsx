
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'
import Add from './pages/Add'
import Edit from './pages/Edit'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="products" element={<List />} />
        <Route path="products/add" element={<Add />} />
        <Route path="products/:id/edit" element={<Edit />} />
      </Routes>
    </>
  )
}

export default App
