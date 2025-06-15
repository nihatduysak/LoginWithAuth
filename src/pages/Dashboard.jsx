import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <>
      <h2>Dashboard sayfası</h2>
      <p>Access Token : {localStorage.token}</p>
      <button onClick={handleLogout}>Çıkış</button>
    </>
  )
}