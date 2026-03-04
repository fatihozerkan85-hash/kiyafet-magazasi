import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [urunler, setUrunler] = useState([]);
  const [sepet, setSepet] = useState([]);
  const [secilenSayfa, setSecilenSayfa] = useState('ana');
  const [secilenUrun, setSecilenUrun] = useState(null);
  const [kullanici, setKullanici] = useState(null);
  const [aramaMetni, setAramaMetni] = useState('');
  const [girisFormu, setGirisFormu] = useState({ email: '', sifre: '' });
  const [kayitFormu, setKayitFormu] = useState({ email: '', sifre: '', ad: '', soyad: '', telefon: '' });
  const [favoriler, setFavoriler] = useState([]);
  const [siparisler, setSiparisler] = useState([]);
  const [kuponKodu, setKuponKodu] = useState('');
  const [uygulanmisKupon, setUygulanmisKupon] = useState(null);
  const [kartBilgileri, setKartBilgileri] = useState({
    cardHolderName: '', cardNumber: '', expireMonth: '', expireYear: '', cvc: ''
  });
  const [odemeTipi, setOdemeTipi] = useState('kart');

  useEffect(() => {
    fetch(`${API_URL}/api/urunler`)
      .then(res => res.json())
      .then(data => setUrunler(data))
      .catch(err => console.error(err));
      
    // Kullanıcıyı localStorage'dan yükle
    const kaydedilmisKullanici = localStorage.getItem('kullanici');
    if (kaydedilmisKullanici) {
      const kullaniciData = JSON.parse(kaydedilmisKullanici);
      setKullanici(kullaniciData);
      favorileriYukle(kullaniciData.id);
    }
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
        localStorage.setItem('kullanici', JSON.stringify(sonuc.kullanici));
        favorileriYukle(sonuc.kullanici.id);
        alert('✅ Giriş başarılı!');
        setSecilenSayfa('ana');
      } else {
        alert('❌ ' + sonuc.mesaj);
      }
    } catch (error) {
      alert('❌ Giriş yapılamadı');
    }
  };

  const kayitOl = async () => {
    try {
      const response = await fetch(`${API_URL}/api/kayit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kayitFormu)
      });
      const sonuc = await response.json();
      if (sonuc.basarili) {
        setKullanici(sonuc.kullanici);
        localStorage.setItem('kullanici', JSON.stringify(sonuc.kullanici));
        alert('✅ Kayıt başarılı!');
        setSecilenSayfa('ana');
      } else {
        alert('❌ ' + sonuc.mesaj);
      }
    } catch (error) {
      alert('❌ Kayıt yapılamadı');
    }
  };

  const cikisYap = () => {
    setKullanici(null);
    setFavoriler([]);
    localStorage.removeItem('kullanici');
    setSecilenSayfa('ana');
    alert('👋 Çıkış yapıldı');
  };

  const favorileriYukle = async (kullaniciId) => {
    try {
      const response = await fetch(`${API_URL}/api/favorilerim/${kullaniciId}`);
      const data = await response.json();
      setFavoriler(data);
    } catch (error) {
      console.error(error);
    }
  };

  const favoriToggle = async (urunId) => {
    if (!kullanici) {
      alert('⚠️ Favorilere eklemek için giriş yapmalısınız!');
      setSecilenSayfa('giris');
      return;
    }
    const favoriMi = favoriler.some(f => f.urunId === urunId);
    try {
      if (favoriMi) {
        await fetch(`${API_URL}/api/favori-cikar/${kullanici.id}/${urunId}`, { method: 'DELETE' });
        setFavoriler(favoriler.filter(f => f.urunId !== urunId));
        alert('💔 Favorilerden çıkarıldı');
      } else {
        await fetch(`${API_URL}/api/favori-ekle`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ kullaniciId: kullanici.id, urunId })
        });
        favorileriYukle(kullanici.id);
        alert('❤️ Favorilere eklendi');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const kuponUygula = async () => {
    const toplamTutar = sepet.reduce((sum, item) => sum + (item.fiyat * (item.adet || 1)), 0);
    try {
      const response = await fetch(`${API_URL}/api/kupon-kontrol`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kod: kuponKodu, toplamTutar })
      });
      const sonuc = await response.json();
      if (sonuc.basarili) {
        setUygulanmisKupon(sonuc);
        alert(`🎟️ Kupon uygulandı! ${sonuc.indirimTutari} ₺ indirim`);
      } else {
        alert('❌ ' + sonuc.mesaj);
      }
    } catch (error) {
      alert('❌ Kupon kontrol edilemedi');
    }
  };

  const siparisleriYukle = async () => {
    if (!kullanici) return;
    try {
      const response = await fetch(`${API_URL}/api/siparislerim/${kullanici.id}`);
      const data = await response.json();
      setSiparisler(data);
    } catch (error) {
      console.error(error);
    }
  };

  const sepettenCikar = (index) => {
    setSepet(sepet.filter((_, i) => i !== index));
  };

  const odemeYap = async () => {
    if (!kullanici) {
      alert('⚠️ Ödeme yapmak için giriş yapmalısınız!');
      setSecilenSayfa('giris');
      return;
    }
    try {
      let response;
      if (odemeTipi === 'kart') {
        response = await fetch(`${API_URL}/api/odeme`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sepet, kullanici, kartBilgileri })
        });
      } else if (odemeTipi === 'havale') {
        response = await fetch(`${API_URL}/api/odeme/havale`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ kullaniciId: kullanici.id, sepet, adres: 'Test Adres' })
        });
      } else {
        response = await fetch(`${API_URL}/api/odeme/kapida`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ kullaniciId: kullanici.id, sepet, adres: 'Test Adres' })
        });
      }
      const sonuc = await response.json();
      if (sonuc.basarili) {
        alert('🎉 ' + sonuc.mesaj);
        setSepet([]);
        setUygulanmisKupon(null);
        setSecilenSayfa('siparislerim');
        siparisleriYukle();
      } else {
        alert('❌ ' + sonuc.mesaj);
      }
    } catch (error) {
      alert('❌ Ödeme işlemi sırasında bir hata oluştu.');
    }
  };

  const sepeteEkle = (urun) => {
    setSepet([...sepet, { ...urun, adet: 1 }]);
    alert('✅ Ürün sepete eklendi!');
  };

  const sepetToplam = sepet.reduce((sum, item) => sum + (item.fiyat * (item.adet || 1)), 0);
  const indirimliToplam = uygulanmisKupon ? parseFloat(uygulanmisKupon.yeniToplam) : sepetToplam;

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
              <>
                <span>Merhaba, {kullanici.ad}</span>
                <button onClick={() => { setSecilenSayfa('favorilerim'); favorileriYukle(kullanici.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>
                  ❤️ {favoriler.length > 0 && `(${favoriler.length})`}
                </button>
                <button onClick={() => { setSecilenSayfa('siparislerim'); siparisleriYukle(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                  📦 Siparişlerim
                </button>
                <button onClick={cikisYap} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                  🚪 Çıkış
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setSecilenSayfa('giris')} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                  🔐 Giriş
                </button>
                <button onClick={() => setSecilenSayfa('kayit')} style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                  📝 Kayıt
                </button>
              </>
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
              onKeyPress={(e) => e.key === 'Enter' && girisYap()}
              style={{ width: '100%', padding: 12, marginBottom: 20, border: '1px solid #ddd', borderRadius: 8 }}
            />
            <button onClick={girisYap} style={{ width: '100%', padding: 15, background: '#667eea', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16, fontWeight: 600 }}>
              Giriş Yap
            </button>
            <div style={{ textAlign: 'center', marginTop: 15, fontSize: 14 }}>
              Hesabınız yok mu? <button onClick={() => setSecilenSayfa('kayit')} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', textDecoration: 'underline' }}>Kayıt Ol</button>
            </div>
            <div style={{ marginTop: 20, padding: 15, background: '#fff3cd', borderRadius: 8, fontSize: 13 }}>
              <strong>Test Hesabı:</strong><br/>
              Email: admin@kiyafet.com<br/>
              Şifre: admin123
            </div>
          </div>
        )}

        {secilenSayfa === 'kayit' && (
          <div style={{ maxWidth: 400, margin: '50px auto', background: 'white', padding: 40, borderRadius: 12 }}>
            <h2>📝 Kayıt Ol</h2>
            <input
              type="text"
              placeholder="Ad"
              value={kayitFormu.ad}
              onChange={(e) => setKayitFormu({...kayitFormu, ad: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8 }}
            />
            <input
              type="text"
              placeholder="Soyad"
              value={kayitFormu.soyad}
              onChange={(e) => setKayitFormu({...kayitFormu, soyad: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8 }}
            />
            <input
              type="email"
              placeholder="Email"
              value={kayitFormu.email}
              onChange={(e) => setKayitFormu({...kayitFormu, email: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8 }}
            />
            <input
              type="tel"
              placeholder="Telefon"
              value={kayitFormu.telefon}
              onChange={(e) => setKayitFormu({...kayitFormu, telefon: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8 }}
            />
            <input
              type="password"
              placeholder="Şifre"
              value={kayitFormu.sifre}
              onChange={(e) => setKayitFormu({...kayitFormu, sifre: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 20, border: '1px solid #ddd', borderRadius: 8 }}
            />
            <button onClick={kayitOl} style={{ width: '100%', padding: 15, background: '#28a745', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16, fontWeight: 600 }}>
              Kayıt Ol
            </button>
            <div style={{ textAlign: 'center', marginTop: 15, fontSize: 14 }}>
              Zaten hesabınız var mı? <button onClick={() => setSecilenSayfa('giris')} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', textDecoration: 'underline' }}>Giriş Yap</button>
            </div>
          </div>
        )}

        {secilenSayfa === 'ana' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
            {urunler.map(urun => (
              <div key={urun.id} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ position: 'relative' }}>
                  <img src={urun.resimler[0]} alt={urun.ad} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
                  <button 
                    onClick={() => favoriToggle(urun.id)} 
                    style={{ position: 'absolute', top: 10, right: 10, background: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 20, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                  >
                    {favoriler.some(f => f.urunId === urun.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div style={{ padding: 15 }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: 16 }}>{urun.ad}</h3>
                  <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: 14 }}>{urun.aciklama}</p>
                  <p style={{ margin: '0 0 15px 0', fontSize: 20, fontWeight: 'bold', color: '#667eea' }}>{urun.fiyat} ₺</p>
                  <button onClick={() => sepeteEkle(urun)} style={{ width: '100%', padding: 12, background: '#667eea', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                    🛒 Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {secilenSayfa === 'sepet' && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12 }}>
            <h2>🛒 Sepetim</h2>
            {sepet.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 50 }}>
                <p style={{ fontSize: 18, color: '#666' }}>Sepetiniz boş</p>
                <button onClick={() => setSecilenSayfa('ana')} style={{ padding: '12px 30px', background: '#667eea', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 20 }}>
                  Alışverişe Başla
                </button>
              </div>
            ) : (
              <>
                {sepet.map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: 20, padding: 20, borderBottom: '1px solid #eee', alignItems: 'center' }}>
                    <img src={item.resimler[0]} alt={item.ad} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 10px 0' }}>{item.ad}</h3>
                      <p style={{ margin: 0, fontSize: 18, fontWeight: 'bold', color: '#667eea' }}>{item.fiyat} ₺</p>
                    </div>
                    <button onClick={() => sepettenCikar(index)} style={{ padding: '10px 20px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                      🗑️ Sil
                    </button>
                  </div>
                ))}
                <div style={{ marginTop: 30, padding: 20, background: '#f8f9fa', borderRadius: 8 }}>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
                    <input
                      type="text"
                      placeholder="Kupon Kodu (HOSGELDIN, YENISEZON, 50TL)"
                      value={kuponKodu}
                      onChange={(e) => setKuponKodu(e.target.value)}
                      style={{ flex: 1, padding: 12, border: '1px solid #ddd', borderRadius: 8 }}
                    />
                    <button onClick={kuponUygula} style={{ padding: '12px 30px', background: '#28a745', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                      Uygula
                    </button>
                  </div>
                  {uygulanmisKupon && (
                    <div style={{ padding: 15, background: '#d4edda', borderRadius: 8, marginBottom: 15, color: '#155724' }}>
                      🎟️ Kupon uygulandı: {uygulanmisKupon.indirimTutari} ₺ indirim
                    </div>
                  )}
                  <div style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'right', marginBottom: 20 }}>
                    Toplam: <span style={{ color: '#667eea' }}>{indirimliToplam.toFixed(2)} ₺</span>
                  </div>
                  <button onClick={() => setSecilenSayfa('odeme')} style={{ width: '100%', padding: 15, background: '#667eea', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16, fontWeight: 600 }}>
                    Ödemeye Geç
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {secilenSayfa === 'favorilerim' && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12 }}>
            <h2>❤️ Favorilerim</h2>
            {favoriler.length === 0 ? (
              <p>Henüz favori ürününüz yok</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
                {favoriler.map(fav => {
                  const urun = urunler.find(u => u.id === fav.urunId);
                  if (!urun) return null;
                  return (
                    <div key={fav.id} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <img src={urun.resimler[0]} alt={urun.ad} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
                      <div style={{ padding: 15 }}>
                        <h3>{urun.ad}</h3>
                        <p style={{ fontSize: 20, fontWeight: 'bold', color: '#667eea' }}>{urun.fiyat} ₺</p>
                        <button onClick={() => sepeteEkle(urun)} style={{ width: '100%', padding: 12, background: '#667eea', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 10 }}>
                          Sepete Ekle
                        </button>
                        <button onClick={() => favoriToggle(urun.id)} style={{ width: '100%', padding: 12, background: '#e74c3c', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                          Favorilerden Çıkar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {secilenSayfa === 'siparislerim' && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12 }}>
            <h2>📦 Siparişlerim</h2>
            {siparisler.length === 0 ? (
              <p>Henüz siparişiniz yok</p>
            ) : (
              siparisler.map(siparis => (
                <div key={siparis.id} style={{ padding: 20, borderBottom: '1px solid #eee', marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <strong>Sipariş No: {siparis.id}</strong>
                    <span style={{ padding: '5px 15px', background: '#667eea', color: 'white', borderRadius: 5, fontSize: 14 }}>
                      {siparis.durum}
                    </span>
                  </div>
                  <p>Toplam: {siparis.toplamTutar} ₺</p>
                  <p style={{ fontSize: 13, color: '#666' }}>
                    Tarih: {new Date(siparis.olusturmaTarihi).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {secilenSayfa === 'odeme' && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12 }}>
            <h2>💳 Ödeme</h2>
            <div style={{ marginBottom: 30 }}>
              <h3>Ödeme Yöntemi Seçin</h3>
              <div style={{ display: 'flex', gap: 15, marginTop: 15 }}>
                <button onClick={() => setOdemeTipi('kart')} style={{ flex: 1, padding: 15, background: odemeTipi === 'kart' ? '#667eea' : '#f0f0f0', color: odemeTipi === 'kart' ? 'white' : '#333', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                  💳 Kredi Kartı
                </button>
                <button onClick={() => setOdemeTipi('havale')} style={{ flex: 1, padding: 15, background: odemeTipi === 'havale' ? '#667eea' : '#f0f0f0', color: odemeTipi === 'havale' ? 'white' : '#333', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                  🏦 Havale/EFT
                </button>
                <button onClick={() => setOdemeTipi('kapida')} style={{ flex: 1, padding: 15, background: odemeTipi === 'kapida' ? '#667eea' : '#f0f0f0', color: odemeTipi === 'kapida' ? 'white' : '#333', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                  🚪 Kapıda Ödeme
                </button>
              </div>
            </div>

            {odemeTipi === 'kart' && (
              <div style={{ marginBottom: 30 }}>
                <h3>Kart Bilgileri</h3>
                <input type="text" placeholder="Kart Üzerindeki İsim" value={kartBilgileri.cardHolderName} onChange={(e) => setKartBilgileri({...kartBilgileri, cardHolderName: e.target.value})} style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8 }} />
                <input type="text" placeholder="Kart Numarası" value={kartBilgileri.cardNumber} onChange={(e) => setKartBilgileri({...kartBilgileri, cardNumber: e.target.value})} style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 15 }}>
                  <input type="text" placeholder="Ay" value={kartBilgileri.expireMonth} onChange={(e) => setKartBilgileri({...kartBilgileri, expireMonth: e.target.value})} style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }} />
                  <input type="text" placeholder="Yıl" value={kartBilgileri.expireYear} onChange={(e) => setKartBilgileri({...kartBilgileri, expireYear: e.target.value})} style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }} />
                  <input type="text" placeholder="CVC" value={kartBilgileri.cvc} onChange={(e) => setKartBilgileri({...kartBilgileri, cvc: e.target.value})} style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }} />
                </div>
                <div style={{ marginTop: 15, padding: 15, background: '#fff3cd', borderRadius: 8, fontSize: 13 }}>
                  <strong>Test Kartı:</strong> 5528790000000008, 12/30, CVC: 123
                </div>
              </div>
            )}

            <div style={{ padding: 20, background: '#f8f9fa', borderRadius: 8, marginBottom: 20 }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'right' }}>
                Toplam: <span style={{ color: '#667eea' }}>{indirimliToplam.toFixed(2)} ₺</span>
              </div>
            </div>

            <button onClick={odemeYap} style={{ width: '100%', padding: 15, background: '#28a745', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16, fontWeight: 600 }}>
              🎉 Ödemeyi Tamamla
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
