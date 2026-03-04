import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
  
  // Form state'leri
  const [girisFormu, setGirisFormu] = useState({ email: '', sifre: '' });
  const [kayitFormu, setKayitFormu] = useState({ email: '', sifre: '', ad: '', soyad: '', telefon: '' });
  const [kartBilgileri, setKartBilgileri] = useState({
    cardHolderName: '', cardNumber: '', expireMonth: '', expireYear: '', cvc: ''
  });
  const [kullaniciBilgileri, setKullaniciBilgileri] = useState({
    ad: '', soyad: '', email: '', telefon: '', adres: '', il: 'Istanbul', postaKodu: ''
  });
  const [odemeTipi, setOdemeTipi] = useState('kart'); // 'kart', 'havale', 'kapida'

  // Kullanıcıyı localStorage'dan yükle
  useEffect(() => {
    const kaydedilmisKullanici = localStorage.getItem('kullanici');
    if (kaydedilmisKullanici) {
      setKullanici(JSON.parse(kaydedilmisKullanici));
    }
  }, []);

  // Ürünleri yükle
  useEffect(() => {
    fetch(`${API_URL}/api/urunler`)
      .then(res => res.json())
      .then(data => setUrunler(data))
      .catch(err => console.error(err));

    fetch(`${API_URL}/api/kategoriler`)
      .then(res => res.json())
      .then(data => setKategoriler(data))
      .catch(err => console.error(err));
  }, []);

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
      fetch(`${API_URL}/api/urunler`)
        .then(res => res.json())
        .then(data => setUrunler(data));
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

    if (odemeTipi === 'kart') {
      // Kart ile ödeme
      if (!kartBilgileri.cardHolderName || !kartBilgileri.cardNumber) {
        alert('Lütfen kart bilgilerini doldurun!');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/odeme`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sepet,
            kullanici: { ...kullanici, ...kullaniciBilgileri },
            kartBilgileri
          })
        });

        const sonuc = await response.json();

        if (sonuc.basarili) {
          alert('🎉 Ödeme başarılı! Siparişiniz alındı.');
          setSepet([]);
          setSecilenSayfa('siparislerim');
          siparisleriYukle();
        } else {
          alert('❌ Ödeme başarısız: ' + sonuc.mesaj);
        }
      } catch (error) {
        alert('Ödeme işlemi sırasında bir hata oluştu.');
      }
    } else if (odemeTipi === 'havale') {
      // Havale ile ödeme
      try {
        const response = await fetch(`${API_URL}/api/odeme/havale`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            kullaniciId: kullanici.id,
            sepet,
            adres: kullaniciBilgileri.adres || 'Test Adres'
          })
        });

        const sonuc = await response.json();

        if (sonuc.basarili) {
          alert(`✅ Sipariş oluşturuldu!\n\nHavale Bilgileri:\nBanka: ${sonuc.havaleBilgileri.banka}\nIBAN: ${sonuc.havaleBilgileri.iban}\nTutar: ${sonuc.havaleBilgileri.tutar} ₺\nAçıklama: ${sonuc.havaleBilgileri.aciklama}`);
          setSepet([]);
          setSecilenSayfa('siparislerim');
          siparisleriYukle();
        }
      } catch (error) {
        alert('Sipariş oluşturulamadı.');
      }
    } else if (odemeTipi === 'kapida') {
      // Kapıda ödeme
      try {
        const response = await fetch(`${API_URL}/api/odeme/kapida`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            kullaniciId: kullanici.id,
            sepet,
            adres: kullaniciBilgileri.adres || 'Test Adres'
          })
        });

        const sonuc = await response.json();

        if (sonuc.basarili) {
          alert('✅ Siparişiniz alındı! Ödemeyi kapıda yapabilirsiniz.');
          setSepet([]);
          setSecilenSayfa('siparislerim');
          siparisleriYukle();
        }
      } catch (error) {
        alert('Sipariş oluşturulamadı.');
      }
    }
  };

  const sepetAdet = sepet.reduce((sum, item) => sum + item.adet, 0);

  return (
    <div className="App">
      {/* Header */}
      <header style={{ 
        background: 'white', 
        padding: '20px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, cursor: 'pointer' }} onClick={() => setSecilenSayfa('ana')}>
            KIYAFET MAĞAZASI
          </h1>
          
          {/* Arama */}
          <div style={{ flex: 1, maxWidth: 400, margin: '0 20px' }}>
            <input
              type="text"
              placeholder="Ürün ara..."
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && aramaYap()}
              style={{ width: '100%', padding: '10px 15px', borderRadius: 25, border: '1px solid #ddd', fontSize: 14 }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
            {kullanici ? (
              <>
                <span style={{ fontSize: 14 }}>Merhaba, {kullanici.ad}</span>
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
                Giriş Yap
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

      {/* Ana Sayfa - devam edecek... */}
    </div>
  );
}

export default App;
