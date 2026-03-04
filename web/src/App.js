import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  // State yönetimi
  const [urunler, setUrunler] = useState([]);
  const [tumUrunler, setTumUrunler] = useState([]);
  const [kategoriler, setKategoriler] = useState([]);
  const [sepet, setSepet] = useState([]);
  const [secilenSayfa, setSecilenSayfa] = useState('ana');
  const [secilenUrun, setSecilenUrun] = useState(null);
  const [kullanici, setKullanici] = useState(null);
  const [aramaMetni, setAramaMetni] = useState('');
  const [siparisler, setSiparisler] = useState([]);
  const [favoriler, setFavoriler] = useState([]);
  const [dil, setDil] = useState('tr');
  const [yorumlar, setYorumlar] = useState([]);
  const [destekMesajlari, setDestekMesajlari] = useState([]);
  
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
  const [yorumFormu, setYorumFormu] = useState({ puan: 5, yorum: '' });
  const [destekMesaj, setDestekMesaj] = useState('');
  
  // Filtre state'leri
  const [filtreler, setFiltreler] = useState({
    kategori: '',
    minFiyat: '',
    maxFiyat: '',
    siralama: ''
  });
  const [filtreAcik, setFiltreAcik] = useState(false);

  // Kullanıcıyı localStorage'dan yükle
  useEffect(() => {
    const kaydedilmisKullanici = localStorage.getItem('kullanici');
    if (kaydedilmisKullanici) {
      const kullaniciData = JSON.parse(kaydedilmisKullanici);
      setKullanici(kullaniciData);
      favorileriYukle(kullaniciData.id);
    }
  }, []);

  // Ürünleri yükle
  useEffect(() => {
    urunleriYukle();
    kategorileriYukle();
  }, []);

  const urunleriYukle = async () => {
    try {
      const response = await fetch(`${API_URL}/api/urunler`);
      const data = await response.json();
      setUrunler(data);
      setTumUrunler(data);
    } catch (err) {
      console.error(err);
    }
  };

  const kategorileriYukle = async () => {
    try {
      const response = await fetch(`${API_URL}/api/kategoriler`);
      const data = await response.json();
      setKategoriler(data);
    } catch (err) {
      console.error(err);
    }
  };

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

  const aramaYap = async () => {
    if (!aramaMetni.trim()) {
      setUrunler(tumUrunler);
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

  const urunleriFiltrele = async () => {
    const params = new URLSearchParams();
    Object.keys(filtreler).forEach(key => {
      if (filtreler[key]) params.append(key, filtreler[key]);
    });
    
    try {
      const response = await fetch(`${API_URL}/api/urunler/filtrele?${params}`);
      const sonuclar = await response.json();
      setUrunler(sonuclar);
      setFiltreAcik(false);
    } catch (error) {
      console.error('Filtreleme hatası:', error);
    }
  };

  const filtreleriTemizle = () => {
    setFiltreler({ kategori: '', minFiyat: '', maxFiyat: '', siralama: '' });
    setUrunler(tumUrunler);
    setFiltreAcik(false);
  };

  const favorileriYukle = async (kullaniciId) => {
    try {
      const response = await fetch(`${API_URL}/api/favorilerim/${kullaniciId}`);
      const data = await response.json();
      setFavoriler(data);
    } catch (error) {
      console.error('Favoriler yüklenemedi:', error);
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
      console.error('Favori hatası:', error);
    }
  };

  const kuponUygula = async () => {
    const toplamTutar = sepet.reduce((sum, item) => sum + (item.fiyat * item.adet), 0);
    
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

  const yorumEkle = async () => {
    if (!kullanici) {
      alert('⚠️ Yorum yapmak için giriş yapmalısınız!');
      setSecilenSayfa('giris');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/yorum`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urunId: secilenUrun.id,
          kullaniciId: kullanici.id,
          kullaniciAd: kullanici.ad + ' ' + kullanici.soyad,
          puan: yorumFormu.puan,
          yorum: yorumFormu.yorum
        })
      });
      const sonuc = await response.json();
      
      if (sonuc.basarili) {
        alert('✅ Yorumunuz eklendi!');
        yorumlariYukle(secilenUrun.id);
        setYorumFormu({ puan: 5, yorum: '' });
      }
    } catch (error) {
      alert('❌ Yorum eklenemedi');
    }
  };

  const yorumlariYukle = async (urunId) => {
    try {
      const response = await fetch(`${API_URL}/api/yorumlar/${urunId}`);
      const data = await response.json();
      setYorumlar(data);
    } catch (error) {
      console.error('Yorumlar yüklenemedi:', error);
    }
  };

  const destekMesajGonder = async () => {
    if (!kullanici) {
      alert('⚠️ Mesaj göndermek için giriş yapmalısınız!');
      return;
    }

    try {
      await fetch(`${API_URL}/api/destek-mesaj`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kullaniciId: kullanici.id, mesaj: destekMesaj })
      });
      
      setDestekMesaj('');
      setTimeout(() => destekMesajlariYukle(), 1500);
    } catch (error) {
      console.error('Mesaj gönderilemedi:', error);
    }
  };

  const destekMesajlariYukle = async () => {
    if (!kullanici) return;
    
    try {
      const response = await fetch(`${API_URL}/api/destek-mesajlar/${kullanici.id}`);
      const data = await response.json();
      setDestekMesajlari(data);
    } catch (error) {
      console.error('Mesajlar yüklenemedi:', error);
    }
  };

  const sepeteEkle = (urun) => {
    setSepet(prev => [...prev, { ...urun, adet: 1 }]);
    alert('✅ Ürün sepete eklendi!');
  };

  const sepettenCikar = (index) => {
    setSepet(prev => prev.filter((_, i) => i !== index));
  };

  const adetArtir = (index) => {
    setSepet(prev => prev.map((item, i) => 
      i === index ? { ...item, adet: item.adet + 1 } : item
    ));
  };

  const adetAzalt = (index) => {
    setSepet(prev => prev.map((item, i) => 
      i === index && item.adet > 1 ? { ...item, adet: item.adet - 1 } : item
    ));
  };

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

  const odemeYap = async () => {
    if (!kullanici) {
      alert('⚠️ Ödeme yapmak için giriş yapmalısınız!');
      setSecilenSayfa('giris');
      return;
    }

    try {
      let response;
      
      if (odemeTipi === 'kart') {
        if (!kartBilgileri.cardHolderName || !kartBilgileri.cardNumber) {
          alert('⚠️ Lütfen kart bilgilerini doldurun!');
          return;
        }
        
        response = await fetch(`${API_URL}/api/odeme`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            sepet, 
            kullanici: { ...kullanici, ...kullaniciBilgileri }, 
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
            adres: kullaniciBilgileri.adres || 'Test Adres'
          })
        });
      } else if (odemeTipi === 'kapida') {
        response = await fetch(`${API_URL}/api/odeme/kapida`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            kullaniciId: kullanici.id, 
            sepet, 
            adres: kullaniciBilgileri.adres || 'Test Adres'
          })
        });
      }

      const sonuc = await response.json();

      if (sonuc.basarili) {
        if (odemeTipi === 'havale' && sonuc.havaleBilgileri) {
          alert(`✅ ${sonuc.mesaj}\n\nHavale Bilgileri:\nBanka: ${sonuc.havaleBilgileri.banka}\nIBAN: ${sonuc.havaleBilgileri.iban}\nTutar: ${sonuc.havaleBilgileri.tutar} ₺\nAçıklama: ${sonuc.havaleBilgileri.aciklama}`);
        } else {
          alert('🎉 ' + sonuc.mesaj);
        }
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

  const sepetAdet = sepet.reduce((sum, item) => sum + item.adet, 0);
  const sepetToplam = sepet.reduce((sum, item) => sum + (item.fiyat * item.adet), 0);
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
              onKeyPress={(e) => e.key === 'Enter' && aramaYap()}
              style={{ flex: 1, padding: '10px 15px', borderRadius: 25, border: '1px solid #ddd', fontSize: 14 }}
            />
            <button onClick={aramaYap} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: 25, cursor: 'pointer' }}>
              🔍
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: 15, alignItems: 'center', flexWrap: 'wrap' }}>
            {kullanici ? (
              <>
                <span style={{ fontSize: 14 }}>Merhaba, {kullanici.ad}</span>
                <button onClick={() => { setSecilenSayfa('favorilerim'); favorileriYukle(kullanici.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }} title="Favorilerim">
                  ❤️ {favoriler.length > 0 && <span style={{ fontSize: 12 }}>({favoriler.length})</span>}
                </button>
                <button onClick={() => { setSecilenSayfa('siparislerim'); siparisleriYukle(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                  📦 Siparişlerim
                </button>
                <button onClick={() => { setSecilenSayfa('destek'); destekMesajlariYukle(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }} title="Canlı Destek">
                  💬
                </button>
                {kullanici.rol === 'admin' && (
                  <button onClick={() => setSecilenSayfa('admin')} style={{ background: '#ff6b6b', color: 'white', padding: '8px 15px', borderRadius: 5, border: 'none', cursor: 'pointer', fontSize: 14 }}>
                    👑 Admin
                  </button>
                )}
                <button onClick={cikisYap} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                  🚪 Çıkış
                </button>
              </>
            ) : (
              <button onClick={() => setSecilenSayfa('giris')} style={{ background: '#667eea', color: 'white', padding: '8px 20px', borderRadius: 5, border: 'none', cursor: 'pointer' }}>
                🔐 Giriş Yap
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

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>

        {/* GİRİŞ SAYFASI */}
        {secilenSayfa === 'giris' && (
          <div style={{ maxWidth: 400, margin: '50px auto', background: 'white', padding: 40, borderRadius: 12, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 30 }}>🔐 Giriş Yap</h2>
            <input
              type="email"
              placeholder="Email"
              value={girisFormu.email}
              onChange={(e) => setGirisFormu({...girisFormu, email: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
            />
            <input
              type="password"
              placeholder="Şifre"
              value={girisFormu.sifre}
              onChange={(e) => setGirisFormu({...girisFormu, sifre: e.target.value})}
              onKeyPress={(e) => e.key === 'Enter' && girisYap()}
              style={{ width: '100%', padding: 12, marginBottom: 20, border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
            />
            <button onClick={girisYap} style={{ width: '100%', padding: 15, background: '#667eea', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16, fontWeight: 600, marginBottom: 15 }}>
              Giriş Yap
            </button>
            <div style={{ textAlign: 'center', color: '#666', fontSize: 14 }}>
              Hesabınız yok mu? <button onClick={() => setSecilenSayfa('kayit')} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', textDecoration: 'underline' }}>Kayıt Ol</button>
            </div>
            <div style={{ marginTop: 20, padding: 15, background: '#fff3cd', borderRadius: 8, fontSize: 13 }}>
              <strong>Test Hesabı:</strong><br/>
              Email: admin@kiyafet.com<br/>
              Şifre: admin123
            </div>
          </div>
        )}

        {/* KAYIT SAYFASI */}
        {secilenSayfa === 'kayit' && (
          <div style={{ maxWidth: 400, margin: '50px auto', background: 'white', padding: 40, borderRadius: 12, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 30 }}>📝 Kayıt Ol</h2>
            <input
              type="text"
              placeholder="Ad"
              value={kayitFormu.ad}
              onChange={(e) => setKayitFormu({...kayitFormu, ad: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
            />
            <input
              type="text"
              placeholder="Soyad"
              value={kayitFormu.soyad}
              onChange={(e) => setKayitFormu({...kayitFormu, soyad: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
            />
            <input
              type="email"
              placeholder="Email"
              value={kayitFormu.email}
              onChange={(e) => setKayitFormu({...kayitFormu, email: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
            />
            <input
              type="tel"
              placeholder="Telefon"
              value={kayitFormu.telefon}
              onChange={(e) => setKayitFormu({...kayitFormu, telefon: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
            />
            <input
              type="password"
              placeholder="Şifre"
              value={kayitFormu.sifre}
              onChange={(e) => setKayitFormu({...kayitFormu, sifre: e.target.value})}
              style={{ width: '100%', padding: 12, marginBottom: 20, border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
            />
            <button onClick={kayitOl} style={{ width: '100%', padding: 15, background: '#28a745', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16, fontWeight: 600, marginBottom: 15 }}>
              Kayıt Ol
            </button>
            <div style={{ textAlign: 'center', color: '#666', fontSize: 14 }}>
              Zaten hesabınız var mı? <button onClick={() => setSecilenSayfa('giris')} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', textDecoration: 'underline' }}>Giriş Yap</button>
            </div>
          </div>
        )}

        {/* ANA SAYFA */}
        {secilenSayfa === 'ana' && (
          <div>
            <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>🛍️ Ürünler</h2>
              <button onClick={() => setFiltreAcik(!filtreAcik)} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                🔧 Filtrele
              </button>
            </div>

            {filtreAcik && (
              <div style={{ background: 'white', padding: 20, borderRadius: 12, marginBottom: 20, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 15 }}>
                  <select value={filtreler.kategori} onChange={(e) => setFiltreler({...filtreler, kategori: e.target.value})} style={{ padding: 10, borderRadius: 5, border: '1px solid #ddd' }}>
                    <option value="">Tüm Kategoriler</option>
                    <option value="elbise">Elbise</option>
                    <option value="pantolon">Pantolon</option>
                    <option value="bluz">Bluz</option>
                    <option value="etek">Etek</option>
                  </select>
                  <input type="number" placeholder="Min Fiyat" value={filtreler.minFiyat} onChange={(e) => setFiltreler({...filtreler, minFiyat: e.target.value})} style={{ padding: 10, borderRadius: 5, border: '1px solid #ddd' }} />
                  <input type="number" placeholder="Max Fiyat" value={filtreler.maxFiyat} onChange={(e) => setFiltreler({...filtreler, maxFiyat: e.target.value})} style={{ padding: 10, borderRadius: 5, border: '1px solid #ddd' }} />
                  <select value={filtreler.siralama} onChange={(e) => setFiltreler({...filtreler, siralama: e.target.value})} style={{ padding: 10, borderRadius: 5, border: '1px solid #ddd' }}>
                    <option value="">Sıralama</option>
                    <option value="fiyat-artan">Fiyat (Düşük-Yüksek)</option>
                    <option value="fiyat-azalan">Fiyat (Yüksek-Düşük)</option>
                    <option value="puan">En Yüksek Puan</option>
                    <option value="yeni">En Yeni</option>
                  </select>
                </div>
                <div style={{ marginTop: 15, display: 'flex', gap: 10 }}>
                  <button onClick={urunleriFiltrele} style={{ flex: 1, padding: 12, background: '#28a745', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                    Uygula
                  </button>
                  <button onClick={filtreleriTemizle} style={{ flex: 1, padding: 12, background: '#dc3545', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                    Temizle
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
              {urunler.map(urun => (
                <div key={urun.id} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div onClick={() => { setSecilenUrun(urun); setSecilenSayfa('urun-detay'); yorumlariYukle(urun.id); }} style={{ position: 'relative' }}>
                    <img src={urun.resimler[0]} alt={urun.ad} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
                    {urun.eskiFiyat && (
                      <div style={{ position: 'absolute', top: 10, right: 10, background: '#e74c3c', color: 'white', padding: '5px 10px', borderRadius: 5, fontSize: 12, fontWeight: 'bold' }}>
                        İNDİRİM
                      </div>
                    )}
                  </div>
                  <div style={{ padding: 15 }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: 16 }}>{urun.ad}</h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: 14 }}>{urun.aciklama}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <div>
                        <span style={{ fontSize: 20, fontWeight: 'bold', color: '#667eea' }}>{urun.fiyat} ₺</span>
                        {urun.eskiFiyat && (
                          <span style={{ fontSize: 14, color: '#999', textDecoration: 'line-through', marginLeft: 10 }}>{urun.eskiFiyat} ₺</span>
                        )}
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); favoriToggle(urun.id); }} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>
                        {favoriler.some(f => f.urunId === urun.id) ? '❤️' : '🤍'}
                      </button>
                    </div>
                    {urun.ortalamaPuan > 0 && (
                      <div style={{ marginBottom: 10, fontSize: 14 }}>
                        {'⭐'.repeat(Math.round(urun.ortalamaPuan))} ({urun.ortalamaPuan})
                      </div>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); sepeteEkle(urun); }} style={{ width: '100%', padding: 12, background: '#667eea', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                      🛒 Sepete Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEPET SAYFASI */}
        {secilenSayfa === 'sepet' && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: 30 }}>🛒 Sepetim</h2>
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
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <button onClick={() => adetAzalt(index)} style={{ padding: '5px 15px', background: '#ddd', border: 'none', borderRadius: 5, cursor: 'pointer' }}>-</button>
                      <span style={{ fontSize: 18, fontWeight: 'bold' }}>{item.adet}</span>
                      <button onClick={() => adetArtir(index)} style={{ padding: '5px 15px', background: '#ddd', border: 'none', borderRadius: 5, cursor: 'pointer' }}>+</button>
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
                      placeholder="Kupon Kodu"
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

        {/* ÖDEME SAYFASI */}
        {secilenSayfa === 'odeme' && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: 30 }}>💳 Ödeme</h2>
            
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

            <div style={{ marginBottom: 30 }}>
              <h3>Teslimat Bilgileri</h3>
              <input type="text" placeholder="Adres" value={kullaniciBilgileri.adres} onChange={(e) => setKullaniciBilgileri({...kullaniciBilgileri, adres: e.target.value})} style={{ width: '100%', padding: 12, marginBottom: 15, border: '1px solid #ddd', borderRadius: 8 }} />
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 15 }}>
                <input type="text" placeholder="İl" value={kullaniciBilgileri.il} onChange={(e) => setKullaniciBilgileri({...kullaniciBilgileri, il: e.target.value})} style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }} />
                <input type="text" placeholder="Posta Kodu" value={kullaniciBilgileri.postaKodu} onChange={(e) => setKullaniciBilgileri({...kullaniciBilgileri, postaKodu: e.target.value})} style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }} />
              </div>
            </div>

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

        {/* Diğer sayfalar için placeholder */}
        {secilenSayfa === 'favorilerim' && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12 }}>
            <h2>❤️ Favorilerim</h2>
            <p>Favori ürünleriniz burada görünecek.</p>
          </div>
        )}

        {secilenSayfa === 'siparislerim' && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12 }}>
            <h2>📦 Siparişlerim</h2>
            <p>Siparişleriniz burada görünecek.</p>
          </div>
        )}

        {secilenSayfa === 'destek' && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12 }}>
            <h2>💬 Canlı Destek</h2>
            <p>Destek sistemi burada olacak.</p>
          </div>
        )}

        {secilenSayfa === 'urun-detay' && secilenUrun && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12 }}>
            <h2>{secilenUrun.ad}</h2>
            <p>{secilenUrun.aciklama}</p>
            <p style={{ fontSize: 24, fontWeight: 'bold', color: '#667eea' }}>{secilenUrun.fiyat} ₺</p>
            <button onClick={() => sepeteEkle(secilenUrun)} style={{ padding: '15px 30px', background: '#667eea', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
              🛒 Sepete Ekle
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
