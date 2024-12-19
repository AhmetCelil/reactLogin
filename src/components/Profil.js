import React from 'react';

function Profile() {
  const token = localStorage.getItem('jwtToken');
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');

  return (
    <div className="profile-container">
      {isAuthenticated ? (
        <>
          <h2>Profil Sayfası</h2>
          <p>JWT Token: {token}</p>
        </>
      ) : (
        <p>Lütfen giriş yapın.</p>
      )}
    </div>
  );
}

export default Profile;
