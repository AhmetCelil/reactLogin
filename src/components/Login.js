import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8091/kullanici-giris/giris-yap',
        {
          email,
          kullaniciSifre: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const token = response.data;

      // Token'ı Local Storage'a kaydet
      localStorage.setItem('jwtToken', token);

      // Session Başlat
      sessionStorage.setItem('isAuthenticated', 'true');

      // Başarılı girişte yönlendirme
      window.location.href = '/profile'; 
    } catch (err) {
      setError('Geçersiz e-posta veya şifre');
      console.error('Giriş Hatası:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>E-posta:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}

export default Login;
