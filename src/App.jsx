import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginApp from './LoginApp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Feed from './pages/Feed'

export default function App() {

  return (
    <Routes>
      {/* Bunlar örnek route olduğu için yorum satırı */}
      {/* <Route path='/' element={<Login />} /> */}
      {/* <Route path='/dashboard' element={<Dashboard />} /> */}

      <Route path='/' element={<LoginApp />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/feed' element={<Feed />} />
    </Routes>
  )
}