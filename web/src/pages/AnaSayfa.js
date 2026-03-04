import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AnaSayfa.css';

function AnaSayfa() {
  const [urunler, setUrunler] = useState([]);
  const [kategoriler, setKategoriler] = useState([]);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    fetch(`${API_URL}/api/urunler`)
      .then(res => res.json())
      .then(data => setUrunler(data))
      .catch(err => console.error(err));

    fetch(`${API_URL}/api/kategoriler`)
      .then(res => res.json())
      .then(data => setKategoriler(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ana-sayfa">
      <section className="hero">
        <div className="hero-content">
          <h2>Yeni Sezon Koleksiyonu</h2>
          <p>En şık kıyafetler şimdi indirimde!</p>
          <button className="cta-btn">Alışverişe Başla</button>
        </div>
      </section>

      <div className="container">
        <section className="kategoriler-section">
          <h2>Kategoriler</h2>
          <div className="kategoriler-grid">
            {kategoriler.map(kategori => (
              <div key={kategori.id} className="kategori-card">
                <img src={kategori.resim} alt={kategori.ad} />
                <h3>{kategori.ad}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="urunler-section">
          <h2>Öne Çıkan Ürünler</h2>
          <div className="urunler-grid">
            {urunler.map(urun => (
              <Link to={`/urun/${urun.id}`} key={urun.id} className="urun-card">
                <div className="urun-resim">
                  <img src={urun.resimler[0]} alt={urun.ad} />
                  {urun.eskiFiyat && <span className="indirim-badge">İndirim</span>}
                </div>
                <div className="urun-bilgi">
                  <p className="marka">{urun.marka}</p>
                  <h3>{urun.ad}</h3>
                  <div className="fiyat">
                    <span className="yeni-fiyat">{urun.fiyat} ₺</span>
                    {urun.eskiFiyat && (
                      <span className="eski-fiyat">{urun.eskiFiyat} ₺</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AnaSayfa;
