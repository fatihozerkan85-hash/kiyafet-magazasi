import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UrunDetay.css';

function UrunDetay({ sepeteEkle }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [urun, setUrun] = useState(null);
  const [secilenBeden, setSecilenBeden] = useState('');
  const [secilenRenk, setSecilenRenk] = useState('');

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    fetch(`${API_URL}/api/urunler/${id}`)
      .then(res => res.json())
      .then(data => {
        setUrun(data);
        setSecilenBeden(data.beden[0]);
        setSecilenRenk(data.renk[0]);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSepeteEkle = () => {
    if (urun && secilenBeden && secilenRenk) {
      sepeteEkle(urun, secilenBeden, secilenRenk);
      alert('Ürün sepete eklendi!');
    }
  };

  if (!urun) return <div className="container">Yükleniyor...</div>;

  return (
    <div className="container urun-detay">
      <button onClick={() => navigate(-1)} className="geri-btn">← Geri</button>
      
      <div className="detay-grid">
        <div className="resim-bolumu">
          <img src={urun.resimler[0]} alt={urun.ad} />
        </div>
        
        <div className="bilgi-bolumu">
          <p className="marka">{urun.marka}</p>
          <h1>{urun.ad}</h1>
          <p className="aciklama">{urun.aciklama}</p>
          
          <div className="fiyat-bolumu">
            <span className="fiyat">{urun.fiyat} ₺</span>
            {urun.eskiFiyat && (
              <span className="eski-fiyat">{urun.eskiFiyat} ₺</span>
            )}
          </div>

          <div className="secim-bolumu">
            <div className="beden-secimi">
              <label>Beden:</label>
              <div className="secenekler">
                {urun.beden.map(beden => (
                  <button
                    key={beden}
                    className={`secenek-btn ${secilenBeden === beden ? 'aktif' : ''}`}
                    onClick={() => setSecilenBeden(beden)}
                  >
                    {beden}
                  </button>
                ))}
              </div>
            </div>

            <div className="renk-secimi">
              <label>Renk:</label>
              <div className="secenekler">
                {urun.renk.map(renk => (
                  <button
                    key={renk}
                    className={`secenek-btn ${secilenRenk === renk ? 'aktif' : ''}`}
                    onClick={() => setSecilenRenk(renk)}
                  >
                    {renk}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="sepete-ekle-btn" onClick={handleSepeteEkle}>
            Sepete Ekle
          </button>

          <div className="ozellikler">
            <h3>Ürün Özellikleri</h3>
            <ul>
              <li>Stok Durumu: {urun.stokDurumu ? 'Stokta Var' : 'Tükendi'}</li>
              <li>Kategori: {urun.kategori}</li>
              <li>Marka: {urun.marka}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrunDetay;
