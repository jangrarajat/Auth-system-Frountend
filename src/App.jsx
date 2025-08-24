import { useState } from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import RefeshHandler from './components/RefeshHandler'

function App() {

  const [isAuthed, setIsAuthed] = useState(false)

  const PrivateRoute = ({ element }) => {
    return isAuthed ? element : <Navigate to="/login" />
  }

  return (
    <div className='App'>
      <RefeshHandler setIsAuthed={setIsAuthed} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  )
}

export default App
