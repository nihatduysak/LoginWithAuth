import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;

    if (username.value === 'admin' && password.value === '123456') {
      localStorage.token = 'Fake-token-123'
      navigate('/dashboard');
    } else {
      setError('Hatalı kullanıcı bilgisi');
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2>Giriş Yap</h2>
        <input type="text" name="username" placeholder="Kullanıcı Adı" />
        <input type="password" name="password" placeholder="Şifre" />
        <button>Giriş</button>
        {error && <p>{error}</p>}
      </form>
    </>
  )
}