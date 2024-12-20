import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [locationData, setLocationData] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);

  // Konum Bilgisi Sorgula
  const fetchLocationData = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get("http://localhost:8091/kullanici-giris/konum", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLocationData(response.data.konumBilgileri);
    } catch (error) {
      console.error("Konum Sorgulama Hatası:", error);
    }
  };

  // Oturum Süresi Göster
  const fetchRemainingTime = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get("http://localhost:8091/oturum-suresi", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRemainingTime(response.data);
    } catch (error) {
      console.error("Oturum Süresi Hatası:", error);
    }
  };

  useEffect(() => {
    fetchLocationData();
    fetchRemainingTime();

    // Her 10 saniyede bir süreyi güncelle
    const interval = setInterval(fetchRemainingTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Profil Sayfası</h2>
      <h3>Oturum Süresi: {Math.floor(remainingTime / 1000)} saniye</h3>
      
      <h3>Konum Bilgileri:</h3>
      <ul>
        {locationData.map((konum, index) => (
          <li key={index}>
            <strong>Email:</strong> {konum.email} | 
            <strong>Enlem:</strong> {konum.enlem} | 
            <strong>Boylam:</strong> {konum.boylam}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
