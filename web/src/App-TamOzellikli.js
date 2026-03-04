import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  // Temel state'ler
  const [urunler, setUrunler] = useState([]);
  const [sepet, setSepet] = useState([]);
  const [secilenSayfa, setSecilenSayfa] = useState('ana');
  const [secilenUrun, setSecilenUrun] = useState(null);
  const [kullanici, setKullanici] = useState(null);
  const [aramaMetni, setAramaMetni] = useState('');
  
  // Yeni özellikler için state'ler
  const [favoriler, setFavoriler] = useState([]);
  const [siparisler, setSiparisler] = useState([]);
  const [kuponKodu, setKuponKodu] = useState('');
  const [uygulanmisKupon, setUygulanmisKupon] = useState(null);
  const [yorumlar, setYorumlar] = useState([]);
  
  // Form state'leri
  const [girisFormu, setGirisFormu] = useState({ email: '', sifre: '' });
  const [kayitFormu, setKayitFormu] = useState({ email: '', sifre: '', ad: '', soyad: '', telefon: '' });
  const [kartBilgileri, setKartBilgileri] = useState({
    cardHolderName: '', cardNumber: '', expireMonth: '', expireYear: '', cvc: ''
  });
  const [odemeTipi, setOdemeTipi] = useState('kart');

  // Ürünleri yükle
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

  // Giriş yap
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

  // Kayıt ol
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

  // Çıkış yap
  const cikisYap = () => {
    setKullanici(null);
    setFavoriler([]);
    localStorage.removeItem('kullanici');
    setSecilenSayfa('ana');
    alert('👋 Çıkış yapıldı');
  };

  // Favorileri yükle
  const favorileriYukle = async (kullaniciId) => {
    try {
      const response = await fetch(`${API_URL}/api/favorilerim/${kullaniciId}`);
      const data = await response.json();
      setFavoriler(data);
    } catch (error) {
      console.error('Favoriler yüklenemedi:', error);
    }
  };

  // Favori toggle
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
      console.error('Favori hatası:', error);
    }
  };

  // Kupon uygula
  const kuponUygula = async () => {
    const toplamTutar = sepet.reduce((sum, item) => sum + item.fiyat, 0);
    
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

  // Siparişleri yükle
  const siparisleriYukle = async () => {
    if (!kullanici) return;
    
    try {
      const response = await fetch(`${API_URL}/api/siparislerim/${kullanici.id}`);
      const data = await response.json();
      setSiparisler(data);
    } catch (error) {
      console.error('Siparişler yüklenemedi:', error);
    }
  };

  // Yorumları yükle
  const yorumlariYukle = async (urunId) => {
    try {
      const response = await fetch(`${API_URL}/api/yorumlar/${urunId}`);
      const data = await response.json();
      setYorumlar(data);
    } catch (error) {
      console.error('Yorumlar yüklenemedi:', error);
    }
  };

  // Sepete ekle
  const sepeteEkle = (urun) => {
    setSepet([...sepet, { ...urun, adet: 1 }]);
    alert('✅ Ürün sepete eklendi!');
  };

  // Sepetten çıkar
  const sepettenCikar = (index) => {
    setSepet(sepet.filter((_, i) => i !== index));
  };

  // Ödeme yap
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
          body: JSON.stringify({ 
            sepet, 
            kullanici, 
            kartBilgileri 
          })
        });
      } else if (odemeTipi === 'havale') {
        response = await fetch(`${API_URL}/api/odeme/havale`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            kullaniciId: kullanici.id, 
            sepet, 
            adres: 'Test Adres'
          })
        });
      } else {
        response = await fetch(`${API_URL}/api/odeme/kapida`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            kullaniciId: kullanici.id, 
            sepet, 
            adres: 'Test Adres'
          })
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

  const sepetToplam = sepet.reduce((sum, item) => sum + (item.fiyat * (item.adet || 1)), 0);
  const indirimliToplam = uygulanmisKupon ? parseFloat(uygulanmisKupon.yeniToplam) : sepetToplam;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <header style={{ background: 'white', padding: '15px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0, cursor: 'pointer', fontSize: 24, color: '#667eea' }} onClick={() => setSecilenSayfa('ana')}>
            KIYAFET MAĞAZASI
          </h1>
          
          <div style={{ flex: 1, maxWidth: 400, display: 'flex', gap: 5 }}>
            <input
              type="text"
              placeholder="Ürün ara..."
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)}
              style={{ flex: 1, padding: '10px 15px', borderRadius: 25, border: '1px solid #ddd', fontSize: 14 }}
            />
            <button onClick={() => {
              if (aramaMetni.trim()) {
                fetch(`${API_URL}/api/urunler/ara?q=${encodeURIComponent(aramaMetni)}`)
                  .then(res => res.json())
                  .then(data => setUrunler(data));
              }
            }} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: 25, cursor: 'pointer' }}>
              🔍
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: 15, alignItems: 'center', flexWrap: 'wrap' }}>
            {kullanici ? (
              <>
                <span style={{ fontSize: 14 }}>Merhaba, {kullanici.ad}</span>
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
                <button onClick={() => setSecilenSayfa('giris')} style={{ background: '#667eea', color: 'white', padding: '8px 20px', borderRadius: 5, border: 'none', cursor: 'pointer' }}>
                  🔐 Giriş
                </button>
                <button onClick={() => setSecilenSayfa('kayit')} style={{ background: '#28a745', color: 'white', padding: '8px 20px', borderRadius: 5, border: 'none', cursor: 'pointer' }}>
                  📝 Kayıt
                </button>
              </>
            )}
            
            <button onClick={() => setSecilenSayfa('sepet')} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', position: 'relative' }}>
              🛒
              {sepet.length > 0 && (
                <span style={{ position: 'absolute', top: -5, right: -5, background: '#e74c3c', color: 'white', borderRadius: '50%', width: 20, height: 20, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {sepet.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
