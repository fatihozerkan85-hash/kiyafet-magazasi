import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  // State yönetimi
  const [urunler, setUrunler] = useState([]);
  const [kategoriler, setKategoriler] = useState([]);
  const [sepet, setSepet] = useState([]);
  const [secilenSayfa, setSecilenSayfa] = useState('ana');
  const [secilenUrun, setSecilenUrun] = useState(null);
  const [kullanici, setKullanici] = useState(null);
  const [aramaMetni, setAramaMetni] = useState('');
  const [siparisler, setSiparisler] = useState([]);
  const [favoriler, setFavoriler] = useState([]);
  const [dil, setDil] = useState('tr');
  const [ceviriler, setCeviriler] = useState({});
  
  // Form state'leri
  const [girisFormu, setGirisFormu] = useState({ email: '', sifre: '' });
  const [kayitFormu, setKayitFormu] = useState({ email: '', sifre: '', ad: '', soyad: '', telefon: '' });
  const [kartBilgileri, setKartBilgileri] = useState({
    cardHolderName: '', cardNumber: '', expireMonth: '', expireYear: '', cvc: ''
  });
  const [kullaniciBilgileri, setKullaniciBilgileri] = useState({
    ad: '', soyad: '', email: '', telefon: '', adres: '', il: 'Istanbul', postaKodu: ''
  });
  const [odemeTipi, setOdemeTipi] = useState('kart');
  const [kuponKodu, setKuponKodu] = useState('');
  const [uygulanmisKupon, setUygulanmisKupon] = useState(null);
  
  // Filtre state'leri
  const [filtreler, setFiltreler] = useState({
    kategori: '',
    minFiyat: '',
    maxFiyat: '',
    beden: '',
    renk: '',
    marka: '',
    siralama: ''
  });

  // Kullanıcıyı localStorage'dan yükle
  useEffect(() => {
    const kaydedilmisKullanici = localStorage.getItem('kullanici');
    if (kaydedilmisKullanici) {
      setKullanici(JSON.parse(kaydedilmisKullanici));
    }
    
    // Dil çevirilerini yükle
    dilYukle('tr');
  }, []);

  // Ürünleri yükle
  useEffect(() => {
    urunleriYukle();
    kategorileriYukle();
  }, []);

  const urunleriYukle = () => {
    fetch(`${API_URL}/api/urunler`)
      .then(res => res.json())
      .then(data => setUrunler(data))
      .catch(err => console.error(err));
  };

  const kategorileriYukle = () => {
    fetch(`${API_URL}/api/kategoriler`)
      .then(res => res.json())
      .then(data => setKategoriler(data))
      .catch(err => console.error(err));
  };

  // Dil yükleme
  const dilYukle = async (yeniDil) => {
    try {
      const response = await fetch(`${API_URL}/api/ceviri/${yeniDil}`);
      const data = await response.json();
      setCeviriler(data);
      setDil(yeniDil);
    } catch (error) {
      console.error('Dil yüklenemedi:', error);
    }
  };

  // Kullanıcı girişi
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
        alert('Giriş başarılı!');
        setSecilenSayfa('ana');
      } else {
        alert(sonuc.mesaj);
      }
    } catch (error) {
      alert('Giriş yapılamadı');
    }
  };

  // Kullanıcı kaydı
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
        alert('Kayıt başarılı!');
        setSecilenSayfa('ana');
      } else {
        alert(sonuc.mesaj);
      }
    } catch (error) {
      alert('Kayıt yapılamadı');
    }
  };

  // Çıkış yap
  const cikisYap = () => {
    setKullanici(null);
    localStorage.removeItem('kullanici');
    setSecilenSayfa('ana');
  };

  // Ürün arama
  const aramaYap = async () => {
    if (!aramaMetni.trim()) {
      urunleriYukle();
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/urunler/ara?q=${encodeURIComponent(aramaMetni)}`);
      const sonuclar = await response.json();
      setUrunler(sonuclar);
    } catch (error) {
      console.error('Arama hatası:', error);
    }
  };

  // Filtrele
  const urunleriFiltrele = async () => {
    const params = new URLSearchParams();
    Object.keys(filtreler).forEach(key => {
      if (filtreler[key]) params.append(key, filtreler[key]);
    });
    
    try {
      const response = await fetch(`${API_URL}/api/urunler/filtrele?${params}`);
      const sonuclar = await response.json();
      setUrunler(sonuclar);
    } catch (error) {
      console.error('Filtreleme hatası:', error);
    }
  };

  // Favorilere ekle/çıkar
  const favoriToggle = async (urunId) => {
    if (!kullanici) {
      alert('Favorilere eklemek için giriş yapmalısınız!');
      setSecilenSayfa('giris');
      return;
    }

    const favoriMi = favoriler.some(f => f.urunId === urunId);
    
    try {
      if (favoriMi) {
        await fetch(`${API_URL}/api/favori-cikar/${kullanici.id}/${urunId}`, { method: 'DELETE' });
        setFavoriler(favoriler.filter(f => f.urunId !== urunId));
        alert('Favorilerden çıkarıldı');
      } else {
        await fetch(`${API_URL}/api/favori-ekle`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ kullaniciId: kullanici.id, urunId })
        });
        setFavoriler([...favoriler, { urunId }]);
        alert('Favorilere eklendi');
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
        alert(`Kupon uygulandı! ${sonuc.indirimTutari} ₺ indirim`);
      } else {
        alert(sonuc.mesaj);
      }
    } catch (error) {
      alert('Kupon kontrol edilemedi');
    }
  };

  // Sepete ekle
  const sepeteEkle = (urun) => {
    setSepet(prev => [...prev, { ...urun, adet: 1 }]);
    alert('Ürün sepete eklendi!');
  };

  // Ödeme yap
  const odemeYap = async () => {
    if (!kullanici) {
      alert('Ödeme yapmak için giriş yapmalısınız!');
      setSecilenSayfa('giris');
      return;
    }

    try {
      let response;
      
      if (odemeTipi === 'kart') {
        response = await fetch(`${API_URL}/api/odeme`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sepet, kullanici: { ...kullanici, ...kullaniciBilgileri }, kartBilgileri })
        });
      } else if (odemeTipi === 'havale') {
        response = await fetch(`${API_URL}/api/odeme/havale`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ kullaniciId: kullanici.id, sepet, adres: kullaniciBilgileri.adres })
        });
      } else if (odemeTipi === 'kapida') {
        response = await fetch(`${API_URL}/api/odeme/kapida`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ kullaniciId: kullanici.id, sepet, adres: kullaniciBilgileri.adres })
        });
      }

      const sonuc = await response.json();

      if (sonuc.basarili) {
        alert('🎉 ' + sonuc.mesaj);
        setSepet([]);
        setSecilenSayfa('siparislerim');
      } else {
        alert('❌ ' + sonuc.mesaj);
      }
    } catch (error) {
      alert('Ödeme işlemi sırasında bir hata oluştu.');
    }
  };

  const sepetAdet = sepet.reduce((sum, item) => sum + item.adet, 0);
  const sepetToplam = sepet.reduce((sum, item) => sum + item.fiyat, 0);
  const indirimliToplam = uygulanmisKupon ? parseFloat(uygulanmisKupon.yeniToplam) : sepetToplam;

  return (
    <div className="App" style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <header style={{ 
        background: 'white', 
        padding: '15px 20px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <h1 style={{ margin: 0, cursor: 'pointer', fontSize: 24, color: '#667eea' }} onClick={() => setSecilenSayfa('ana')}>
            KIYAFET MAĞAZASI
          </h1>
          
          {/* Arama */}
          <div style={{ flex: 1, maxWidth: 400, display: 'flex', gap: 5 }}>
            <input
              type="text"
              placeholder={dil === 'tr' ? 'Ürün ara...' : 'Search products...'}
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && aramaYap()}
              style={{ flex: 1, padding: '10px 15px', borderRadius: 25, border: '1px solid #ddd', fontSize: 14 }}
            />
            <button onClick={aramaYap} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: 25, cursor: 'pointer' }}>
              🔍
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
            {/* Dil Seçici */}
            <select value={dil} onChange={(e) => dilYukle(e.target.value)} style={{ padding: '8px', borderRadius: 5, border: '1px solid #ddd', cursor: 'pointer' }}>
              <option value="tr">🇹🇷 TR</option>
              <option value="en">🇬🇧 EN</option>
            </select>
            
            {kullanici ? (
              <>
                <span style={{ fontSize: 14 }}>Merhaba, {kullanici.ad}</span>
                <button onClick={() => setSecilenSayfa('favorilerim')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>
                  ❤️
                </button>
                <button onClick={() => setSecilenSayfa('siparislerim')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                  Siparişlerim
                </button>
                {kullanici.rol === 'admin' && (
                  <button onClick={() => setSecilenSayfa('admin')} style={{ background: '#ff6b6b', color: 'white', padding: '8px 15px', borderRadius: 5, border: 'none', cursor: 'pointer', fontSize: 14 }}>
                    Admin
                  </button>
                )}
                <button onClick={cikisYap} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                  Çıkış
                </button>
              </>
            ) : (
              <button onClick={() => setSecilenSayfa('giris')} style={{ background: '#667eea', color: 'white', padding: '8px 20px', borderRadius: 5, border: 'none', cursor: 'pointer' }}>
                {dil === 'tr' ? 'Giriş Yap' : 'Login'}
              </button>
            )}
            
            <button 
              onClick={() => setSecilenSayfa('sepet')}
              style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', position: 'relative' }}
            >
              🛒
              {sepetAdet > 0 && (
                <span style={{
                  position: 'absolute', top: -5, right: -5, background: '#e74c3c',
                  color: 'white', borderRadius: '50%', width: 20, height: 20,
                  fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {sepetAdet}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Ana İçerik - Devam edecek... */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
        {/* Sayfalar buraya gelecek */}
        <p>Sayfa: {secilenSayfa}</p>
        <p>Kullanıcı: {kullanici ? kullanici.ad : 'Giriş yapılmadı'}</p>
        <p>Sepet: {sepetAdet} ürün</p>
        <p>Dil: {dil === 'tr' ? 'Türkçe' : 'English'}</p>
      </div>
    </div>
  );
}

export default App;
