import { useNavigate } from "react-router-dom"
import '/src/twitter.css'

export default function Navbar({ username }) {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/profile');
  }

  return (
    <div className="navbar">
      <div className="navbar-center">
        <span 
        className="navbar-profile-link"
        onClick={goToProfile}
        style={{ cursor: 'pointer' }}
        >Profilim</span>
      </div>
      <div className="navbar-right-side">
        <span 
        onClick={goToProfile}
        style={{ cursor: 'pointer' }} 
        >{username}</span>
      </div>
      <img 
        src="https://randomuser.me/api/portraits/women/92.jpg" 
        alt="Avatar" 
        onClick={goToProfile}
        style={{ cursor: 'pointer', width: '50px' }}
        />
    </div>
  )
}