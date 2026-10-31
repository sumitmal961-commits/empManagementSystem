import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import RefreshHandler from './components/RefreshHandler'
import { Navigate, Route, Routes } from 'react-router-dom'

import EmpManagementApp from './components/EmpManagementApp'
import EmpDetails from './components/EmpDetails'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />
  }

  return (
    <>



      <div>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
         
          <Route path='/employee' element={<PrivateRoute element={<EmpManagementApp />} />} />
          <Route path='/employee/:id' element={<EmpDetails />} />
        </Routes>
      </div>
    </>
  )
}

export default App
