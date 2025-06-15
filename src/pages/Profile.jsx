import { useNavigate } from "react-router-dom"

export default function Profile({ username }) {
  const navigate = useNavigate();

  return (
    <div className="profile">
      <img className="profile-avatar" src="https://randomuser.me/api/portraits/women/92.jpg" alt="Profile Photo" />
      <h2>@{username}</h2>
      <p>Hakkımda: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ratione deleniti praesentium distinctio eveniet dolorem.</p>
      <ul className="profile-info">
        <li>Tweet: 42</li>
        <li>Takipçi: 100</li>
        <li>Takip: 80</li>
      </ul>
      <button className="back-to-feed" onClick={() => navigate('/')}>Anasayfa</button>
      <button className="back-to-feed" onClick={() => navigate('/feed')}>Geri dön</button>
    </div>
  )
}