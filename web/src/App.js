import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [urunler, setUrunler] = useState([]);
  const [sepet, setSepet] = useState([]);
  const [secilenSayfa, setSecilenSayfa] = useState('ana');
  const [kullanici, setKullanici] = useState(null);
  const [aramaMetni, setAramaMetni] = useState('');
  const [girisFormu, setGirisFormu] = useState({ email: '', sifre: '' });

  useEffect(() => {
    fetch(`${API_URL}/api/urunler`)
      .then(res => res.json())
      .then(data => setUrunler(data))
      .catch(err => console.error(err));
  }, []);

  const girisYap = async () => {
    try {
      const response = await fetch(`${API_URL}/api/giris`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(girisFormu)
      });
      const sonuc = await response.json();
      if (sonuc.basarili) {
        setKullanici(sonuc.kullanici);
        alert('Giriş başarılı!');
        setSecilenSayfa('ana');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sepeteEkle = (urun) => {
    setSepet([...sepet, urun]);
    alert('Ürün sepete eklendi!');
  };

  return (
    <div className="App" style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'white', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, color: '#667eea', cursor: 'pointer' }} onClick={() => setSecilenSayfa('ana')}>
            KIYAFET MAĞAZASI
          </h1>
          <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Ürün ara..."
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)}
              style={{ padding: '10px', borderRadius: 5, border: '1px solid #ddd' }}
            />
            {kullanici ? (
              <span>Merhaba, {kullanici.ad}</span>
            ) : (
              <button onClick={() => setSecilenSayfa('giris')} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                Giriş Yap
              </button>
            )}
            <button onClick={() => setSecilenSayfa('sepet')} style={{ fontSize: 24, background: 'none', border: 'none', cursor: 'pointer' }}>
              🛒 ({sepet.length})
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '20px auto', padding: 20 }}>
        {secilenSayfa === 'giris' && (
          <div style={{ maxWidth: 400, margin: '50px auto', background: 'white', padding: 40, borderRadius: 12 }}>
            <h2>Giriş Yap</h2>
            <input
              type="email"
              placeholder="Email"
              value={girisFormu.email}
              onChange={(e) => setGirisFormu({...girisFormu, email: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8 }}
            />
            <input
              type="password"
              placeholder="Şifre"
              value={girisFormu.sifre}
              onChange={(e) => setGirisFormu({...girisFormu, sifre: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 20, border: '1px solid #ddd', borderRadius: 8 }}
            />
            <button onClick={girisYap} style={{ width: '100%', padding: 15, background: '#667eea', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
              Giriş Yap
            </button>
            <div style={{ marginTop: 20, padding: 15, background: '#fff3cd', borderRadius: 8, fontSize: 13 }}>
              Test: admin@kiyafet.com / admin123
            </div>
          </div>
        )}

        {secilenSayfa === 'ana' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
            {urunler.map(urun => (
              <div key={urun.id} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img src={urun.resimler[0]} alt={urun.ad} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
                <div style={{ padding: 15 }}>
                  <h3>{urun.ad}</h3>
                  <p style={{ color: '#666' }}>{urun.aciklama}</p>
                  <p style={{ fontSize: 20, fontWeight: 'bold', color: '#667eea' }}>{urun.fiyat} ₺</p>
                  <button onClick={() => sepeteEkle(urun)} style={{ width: '100%', padding: 12, background: '#667eea', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {secilenSayfa === 'sepet' && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12 }}>
            <h2>Sepetim</h2>
            {sepet.length === 0 ? (
              <p>Sepetiniz boş</p>
            ) : (
              <>
                {sepet.map((item, index) => (
                  <div key={index} style={{ padding: 20, borderBottom: '1px solid #eee' }}>
                    <h3>{item.ad}</h3>
                    <p>{item.fiyat} ₺</p>
                  </div>
                ))}
                <div style={{ marginTop: 20, fontSize: 24, fontWeight: 'bold' }}>
                  Toplam: {sepet.reduce((sum, item) => sum + item.fiyat, 0)} ₺
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
