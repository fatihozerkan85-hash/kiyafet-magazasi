import { useState, useEffect } from 'react';

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://kiyafet-magazasi-backend.vercel.app';

console.log('🔧 API_URL:', API_URL);
console.log('🌐 Hostname:', window.location.hostname);

function App() {
  const [urunler, setUrunler] = useState([]);
  const [sepet, setSepet] = useState([]);
  const [secilenSayfa, setSecilenSayfa] = useState('ana');
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
  const [secilenUrun, setSecilenUrun] = useState(null);
  const [yorumlar, setYorumlar] = useState([]);
  const [yeniYorum, setYeniYorum] = useState({ puan: 5, yorum: '' });
  const [kargoTakipNo, setKargoTakipNo] = useState('');
  const [secilenKategori, setSecilenKategori] = useState('Tümü');
  const [kampanyalar, setKampanyalar] = useState([]);
  const [aktifBanner, setAktifBanner] = useState(0);
  const [dil, setDil] = useState('tr');
  const [dilMetinleri, setDilMetinleri] = useState({});
  
  const kategoriler = [
    { id: 'Tümü', ad: 'Tümü', adEn: 'All', emoji: '🛍️' },
    { id: 'Elbise', ad: 'Elbise', adEn: 'Dress', emoji: '👗' },
    { id: 'Pantolon', ad: 'Pantolon', adEn: 'Pants', emoji: '👖' },
    { id: 'Gömlek', ad: 'Gömlek', adEn: 'Shirt', emoji: '👔' },
    { id: 'Ceket', ad: 'Ceket', adEn: 'Jacket', emoji: '🧥' },
    { id: 'Ayakkabı', ad: 'Ayakkabı', adEn: 'Shoes', emoji: '👟' },
    { id: 'Aksesuar', ad: 'Aksesuar', adEn: 'Accessories', emoji: '👜' },
    { id: 'Spor', ad: 'Spor Giyim', adEn: 'Sports', emoji: '🏃' }
  ];

  useEffect(() => {
    fetch(`${API_URL}/api/urunler`)
      .then(res => res.json())
      .then(data => setUrunler(data))
      .catch(err => console.error('Ürünler yüklenemedi:', err));
      
    // Kampanyaları yükle
    fetch(`${API_URL}/api/kampanyalar`)
      .then(res => res.json())
      .then(data => {
        console.log('Kampanyalar yüklendi:', data);
        setKampanyalar(data);
      })
      .catch(err => console.error('Kampanyalar yüklenemedi:', err));
      
    // Kullanıcıyı localStorage'dan yükle
    const kaydedilmisKullanici = localStorage.getItem('kullanici');
    if (kaydedilmisKullanici) {
      const kullaniciData = JSON.parse(kaydedilmisKullanici);
      setKullanici(kullaniciData);
      favorileriYukle(kullaniciData.id);
    }

    // Dil ayarını yükle
    const kaydedilmisDil = localStorage.getItem('dil') || 'tr';
    setDil(kaydedilmisDil);
    dilYukle(kaydedilmisDil);
  }, []);

  const dilYukle = async (dilKodu) => {
    try {
      const response = await fetch(`${API_URL}/api/dil/${dilKodu}`);
      const result = await response.json();
      if (result.basarili) {
        setDilMetinleri(result.metinler);
      }
    } catch (error) {
      console.error('Dil yüklenemedi:', error);
    }
  };

  const dilDegistir = (yeniDil) => {
    setDil(yeniDil);
    localStorage.setItem('dil', yeniDil);
    dilYukle(yeniDil);
  };

  const t = (key) => {
    return dilMetinleri[key] || key;
  };

  // Kategori renkleri
  const getCategoryColor = (kategoriId) => {
    const colors = {
      'Elbise': '#FFE5E5',
      'Pantolon': '#E5F3FF',
      'Gömlek': '#FFF5E5',
      'Ceket': '#F0E5FF',
      'Ayakkabı': '#E5FFF0',
      'Aksesuar': '#FFE5F5',
      'Spor': '#E5FFFF'
    };
    return colors[kategoriId] || '#F5F5F5';
  };

  const getCategoryColorDark = (kategoriId) => {
    const colors = {
      'Elbise': '#FFD0D0',
      'Pantolon': '#D0E8FF',
      'Gömlek': '#FFE8D0',
      'Ceket': '#E0D0FF',
      'Ayakkabı': '#D0FFE0',
      'Aksesuar': '#FFD0E8',
      'Spor': '#D0FFFF'
    };
    return colors[kategoriId] || '#E0E0E0';
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

  const urunDetayAc = async (urun) => {
    setSecilenUrun(urun);
    setSecilenSayfa('urun-detay');
    // Yorumları yükle
    try {
      const response = await fetch(`${API_URL}/api/yorumlar/${urun.id}`);
      const data = await response.json();
      setYorumlar(data);
    } catch (error) {
      console.error(error);
    }
  };

  const yorumEkle = async () => {
    if (!kullanici) {
      alert('⚠️ Yorum yapmak için giriş yapmalısınız!');
      setSecilenSayfa('giris');
      return;
    }
    if (!yeniYorum.yorum.trim()) {
      alert('⚠️ Lütfen yorum yazın!');
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
          puan: yeniYorum.puan,
          yorum: yeniYorum.yorum
        })
      });
      const sonuc = await response.json();
      if (sonuc.basarili) {
        alert('✅ Yorumunuz eklendi!');
        setYeniYorum({ puan: 5, yorum: '' });
        // Yorumları yeniden yükle
        const yorumResponse = await fetch(`${API_URL}/api/yorumlar/${secilenUrun.id}`);
        const yorumData = await yorumResponse.json();
        setYorumlar(yorumData);
        // Ürün listesini güncelle
        const urunResponse = await fetch(`${API_URL}/api/urunler`);
        const urunData = await urunResponse.json();
        setUrunler(urunData);
        const guncelUrun = urunData.find(u => u.id === secilenUrun.id);
        setSecilenUrun(guncelUrun);
      }
    } catch (error) {
      alert('❌ Yorum eklenemedi');
    }
  };

  const kargoTakipSorgula = async () => {
    if (!kargoTakipNo.trim()) {
      alert('⚠️ Lütfen takip numarası girin!');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/kargo-takip/${kargoTakipNo}`);
      const sonuc = await response.json();
      if (sonuc.basarili) {
        alert(`📦 Kargo Durumu: ${sonuc.durum}\n📍 Konum: ${sonuc.konum}\n📅 Son Güncelleme: ${new Date(sonuc.sonGuncelleme).toLocaleString('tr-TR')}`);
      } else {
        alert('❌ ' + sonuc.mesaj);
      }
    } catch (error) {
      alert('❌ Kargo takip sorgulanamadı');
    }
  };

  const yildizGoster = (puan) => {
    const yildizlar = [];
    for (let i = 1; i <= 5; i++) {
      yildizlar.push(
        <span key={i} style={{ color: i <= puan ? '#ffc107' : '#ddd', fontSize: 20 }}>
          ★
        </span>
      );
    }
    return yildizlar;
  };

  const filtreliUrunler = secilenKategori === 'Tümü' 
    ? urunler 
    : urunler.filter(urun => urun.kategori === secilenKategori);

  // Banner otomatik geçiş
  useEffect(() => {
    if (kampanyalar.length > 1) {
      const interval = setInterval(() => {
        setAktifBanner((prev) => (prev + 1) % kampanyalar.length);
      }, 5000); // 5 saniyede bir değişir
      return () => clearInterval(interval);
    }
  }, [kampanyalar.length]);

  return (
    <div className="App" style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'white', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img 
            src="/as.png" 
            alt="ASL Butique"
            onClick={() => setSecilenSayfa('ana')}
            style={{ 
              cursor: 'pointer',
              width: '100%',
              height: 140,
              objectFit: 'cover'
            }} 
          />
          <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
            {/* Dil Seçici */}
            <select 
              value={dil} 
              onChange={(e) => dilDegistir(e.target.value)}
              style={{ 
                padding: '10px 15px', 
                borderRadius: 8, 
                border: '2px solid #ddd', 
                cursor: 'pointer', 
                background: 'white',
                fontSize: 15,
                fontWeight: 600,
                color: '#333',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.borderColor = '#000000'}
              onMouseOut={(e) => e.target.style.borderColor = '#ddd'}
            >
              <option value="tr">🇹🇷 Türkçe</option>
              <option value="en">🇬🇧 English</option>
            </select>
            
            <input
              type="text"
              placeholder={t('search')}
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)}
              style={{ padding: '10px', borderRadius: 5, border: '1px solid #ddd' }}
            />
            {kullanici ? (
              <>
                <span>{t('welcome')}, {kullanici.ad}</span>
                <button onClick={() => { setSecilenSayfa('favorilerim'); favorileriYukle(kullanici.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>
                  ❤️ {favoriler.length > 0 && `(${favoriler.length})`}
                </button>
                <button onClick={() => { setSecilenSayfa('siparislerim'); siparisleriYukle(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                  📦 {t('my_orders')}
                </button>
                <button onClick={cikisYap} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                  🚪 {t('logout')}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setSecilenSayfa('giris')} style={{ padding: '10px 20px', background: '#000000', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                  🔐 {t('login')}
                </button>
                <button onClick={() => setSecilenSayfa('kayit')} style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                  📝 {t('register')}
                </button>
              </>
            )}
            <button onClick={() => setSecilenSayfa('sepet')} style={{ fontSize: 24, background: 'none', border: 'none', cursor: 'pointer' }}>
              🛒 ({sepet.length})
            </button>
          </div>
        </div>
      </header>

      {/* Kategori Menüsü */}
      <div style={{ background: 'white', borderBottom: '1px solid #eee', padding: '15px 0', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', gap: 15, overflowX: 'auto', paddingBottom: 5 }}>
            {kategoriler.map(kategori => (
              <button
                key={kategori.id}
                onClick={() => { setSecilenKategori(kategori.id); setSecilenSayfa('ana'); }}
                style={{
                  padding: '10px 20px',
                  background: secilenKategori === kategori.id ? '#000000' : 'transparent',
                  color: secilenKategori === kategori.id ? 'white' : '#333',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: secilenKategori === kategori.id ? 600 : 400,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  boxShadow: 'none'
                }}
                onMouseOver={(e) => {
                  if (secilenKategori !== kategori.id) {
                    e.target.style.color = '#000';
                  }
                }}
                onMouseOut={(e) => {
                  if (secilenKategori !== kategori.id) {
                    e.target.style.color = '#333';
                  }
                }}
              >
                {dil === 'en' ? kategori.adEn : kategori.ad}
              </button>
            ))}
          </div>
        </div>
      </div>

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
              onKeyDown={(e) => e.key === 'Enter' && girisYap()}
              style={{ width: '100%', padding: 12, marginBottom: 20, border: '1px solid #ddd', borderRadius: 8 }}
            />
            <button onClick={girisYap} style={{ width: '100%', padding: 15, background: '#000000', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16, fontWeight: 600 }}>
              Giriş Yap
            </button>
            <div style={{ textAlign: 'center', marginTop: 15, fontSize: 14 }}>
              Hesabınız yok mu? <button onClick={() => setSecilenSayfa('kayit')} style={{ background: 'none', border: 'none', color: '#000000', cursor: 'pointer', textDecoration: 'underline' }}>Kayıt Ol</button>
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
              Zaten hesabınız var mı? <button onClick={() => setSecilenSayfa('giris')} style={{ background: 'none', border: 'none', color: '#000000', cursor: 'pointer', textDecoration: 'underline' }}>Giriş Yap</button>
            </div>
          </div>
        )}

        {secilenSayfa === 'ana' && (
          <div>
            {/* Kampanya Banner'ları - Boyner Tarzı */}
            {kampanyalar.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                {kampanyalar.map((kampanya, index) => (
                  <div
                    key={kampanya.id}
                    style={{
                      display: index === aktifBanner ? 'block' : 'none',
                      position: 'relative',
                      height: 500,
                      backgroundImage: `url(${kampanya.resim})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      cursor: 'pointer',
                      marginBottom: 0
                    }}
                    onClick={() => {
                      if (kampanya.link.includes('/kategori/')) {
                        const kategori = kampanya.link.split('/kategori/')[1];
                        setSecilenKategori(kategori);
                      }
                    }}
                  >
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2))' }} />
                    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px', color: 'white', maxWidth: 1400, margin: '0 auto' }}>
                      <h1 style={{ fontSize: 56, fontWeight: 'bold', margin: '0 0 20px 0', textShadow: '2px 2px 8px rgba(0,0,0,0.3)', letterSpacing: '-1px' }}>
                        {kampanya.baslik}
                      </h1>
                      <p style={{ fontSize: 24, margin: '0 0 40px 0', maxWidth: 600, textShadow: '1px 1px 4px rgba(0,0,0,0.3)', lineHeight: 1.4 }}>
                        {kampanya.aciklama}
                      </p>
                      <button style={{ 
                        padding: '18px 50px', 
                        background: 'white', 
                        color: '#000', 
                        border: 'none', 
                        borderRadius: 4, 
                        fontSize: 16, 
                        fontWeight: 'bold', 
                        cursor: 'pointer', 
                        alignSelf: 'flex-start',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        Keşfet
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Banner Navigasyon */}
                {kampanyalar.length > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '30px 0', background: 'white' }}>
                    {kampanyalar.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setAktifBanner(index)}
                        style={{
                          width: index === aktifBanner ? 40 : 12,
                          height: 12,
                          borderRadius: 6,
                          border: 'none',
                          background: index === aktifBanner ? '#000' : '#ddd',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Kategori Grid - Boyner Tarzı */}
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 20px' }}>
              <h2 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 40, textAlign: 'center', color: '#000', letterSpacing: '-0.5px' }}>
                {dil === 'en' ? 'Shop by Category' : 'Kategoriler'}
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: 20,
                marginBottom: 60
              }}>
                {kategoriler.filter(k => k.id !== 'Tümü').map(kategori => (
                  <div
                    key={kategori.id}
                    onClick={() => { setSecilenKategori(kategori.id); window.scrollTo(0, 0); }}
                    style={{
                      position: 'relative',
                      height: 350,
                      borderRadius: 8,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                    }}
                  >
                    {/* Kategori Resmi (Placeholder) */}
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${getCategoryColor(kategori.id)} 0%, ${getCategoryColorDark(kategori.id)} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: 80 }}>{kategori.emoji}</span>
                    </div>
                    
                    {/* Kategori Bilgisi */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '25px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      color: 'white'
                    }}>
                      <h3 style={{ 
                        fontSize: 24, 
                        fontWeight: 'bold', 
                        margin: 0,
                        textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                      }}>
                        {dil === 'en' ? kategori.adEn : kategori.ad}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ürün Listesi - Modern Grid */}
            <div style={{ background: '#f8f9fa', padding: '60px 0' }}>
              <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                  <h2 style={{ fontSize: 32, fontWeight: 'bold', margin: 0, color: '#000' }}>
                    {dil === 'en' ? kategoriler.find(k => k.id === secilenKategori)?.adEn : secilenKategori}
                  </h2>
                  <span style={{ color: '#666', fontSize: 16 }}>
                    {filtreliUrunler.length} {dil === 'en' ? 'products' : 'ürün'}
                  </span>
                </div>

            {filtreliUrunler.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 80, background: 'white', borderRadius: 12 }}>
                <p style={{ fontSize: 20, color: '#666', marginBottom: 30 }}>Bu kategoride ürün bulunamadı</p>
                <button 
                  onClick={() => setSecilenKategori('Tümü')} 
                  style={{ padding: '14px 40px', background: '#000', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                  Tüm Ürünleri Gör
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                {filtreliUrunler.map(urun => (
              <div key={urun.id} style={{ background: 'white', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{ position: 'relative' }} onClick={() => urunDetayAc(urun)}>
                  <img src={urun.resimler[0]} alt={urun.ad} style={{ width: '100%', height: 400, objectFit: 'cover' }} />
                  <button 
                    onClick={(e) => { e.stopPropagation(); favoriToggle(urun.id); }} 
                    style={{ position: 'absolute', top: 15, right: 15, background: 'white', border: 'none', borderRadius: '50%', width: 44, height: 44, fontSize: 22, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {favoriler.some(f => f.urunId === urun.id) ? '❤️' : '🤍'}
                  </button>
                  {!urun.stokDurumu && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#000', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>STOKTA YOK</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{urun.marka}</span>
                  </div>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: 16, fontWeight: 600, color: '#000', lineHeight: 1.4, height: 44, overflow: 'hidden' }}>
                    {dil === 'en' && urun.adEn ? urun.adEn : urun.ad}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 12 }}>
                    {yildizGoster(urun.ortalamaPuan || 0)}
                    <span style={{ fontSize: 13, color: '#666' }}>
                      ({urun.yorumSayisi || 0})
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      {urun.eskiFiyat && (
                        <span style={{ fontSize: 14, color: '#999', textDecoration: 'line-through', marginRight: 8 }}>
                          {urun.eskiFiyat} ₺
                        </span>
                      )}
                      <span style={{ fontSize: 22, fontWeight: 'bold', color: '#000' }}>{urun.fiyat} ₺</span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); sepeteEkle(urun); }} 
                    disabled={!urun.stokDurumu || urun.stokMiktari === 0}
                    style={{ 
                      width: '100%', 
                      padding: 14, 
                      background: (!urun.stokDurumu || urun.stokMiktari === 0) ? '#e0e0e0' : '#000', 
                      color: (!urun.stokDurumu || urun.stokMiktari === 0) ? '#999' : 'white', 
                      border: 'none', 
                      borderRadius: 4, 
                      cursor: (!urun.stokDurumu || urun.stokMiktari === 0) ? 'not-allowed' : 'pointer', 
                      fontSize: 14, 
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      if (urun.stokDurumu && urun.stokMiktari > 0) {
                        e.target.style.background = '#333';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (urun.stokDurumu && urun.stokMiktari > 0) {
                        e.target.style.background = '#000';
                      }
                    }}
                  >
                    {(!urun.stokDurumu || urun.stokMiktari === 0) ? 'Stokta Yok' : 'Sepete Ekle'}
                  </button>
                </div>
              </div>
            ))}
              </div>
            )}
              </div>
            </div>
          </div>
        )}

        {secilenSayfa === 'sepet' && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12 }}>
            <h2>🛒 Sepetim</h2>
            {sepet.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 50 }}>
                <p style={{ fontSize: 18, color: '#666' }}>Sepetiniz boş</p>
                <button onClick={() => setSecilenSayfa('ana')} style={{ padding: '12px 30px', background: '#000000', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 20 }}>
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
                      <p style={{ margin: 0, fontSize: 18, fontWeight: 'bold', color: '#000000' }}>{item.fiyat} ₺</p>
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
                    Toplam: <span style={{ color: '#000000' }}>{indirimliToplam.toFixed(2)} ₺</span>
                  </div>
                  <button onClick={() => setSecilenSayfa('odeme')} style={{ width: '100%', padding: 15, background: '#000000', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16, fontWeight: 600 }}>
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
                        <p style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>{urun.fiyat} ₺</p>
                        <button onClick={() => sepeteEkle(urun)} style={{ width: '100%', padding: 12, background: '#000000', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 10 }}>
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
                    <span style={{ padding: '5px 15px', background: '#000000', color: 'white', borderRadius: 5, fontSize: 14 }}>
                      {siparis.durum}
                    </span>
                  </div>
                  <p>Toplam: {siparis.toplamTutar} ₺</p>
                  <p style={{ fontSize: 13, color: '#666' }}>
                    Tarih: {new Date(siparis.olusturmaTarihi).toLocaleDateString('tr-TR')}
                  </p>
                  {siparis.kargoTakipNo && (
                    <div style={{ marginTop: 10, padding: 15, background: '#f8f9fa', borderRadius: 8 }}>
                      <strong>📦 Kargo Takip No:</strong> {siparis.kargoTakipNo}
                      <button 
                        onClick={() => { setKargoTakipNo(siparis.kargoTakipNo); kargoTakipSorgula(); }}
                        style={{ marginLeft: 15, padding: '8px 15px', background: '#000000', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer', fontSize: 13 }}
                      >
                        🔍 Takip Et
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
            <div style={{ marginTop: 30, padding: 20, background: '#f8f9fa', borderRadius: 12 }}>
              <h3>🔍 Kargo Takip Sorgula</h3>
              <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                <input
                  type="text"
                  placeholder="Takip numarası girin (örn: KRG123456)"
                  value={kargoTakipNo}
                  onChange={(e) => setKargoTakipNo(e.target.value)}
                  style={{ flex: 1, padding: 12, border: '1px solid #ddd', borderRadius: 8 }}
                />
                <button onClick={kargoTakipSorgula} style={{ padding: '12px 30px', background: '#000000', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                  Sorgula
                </button>
              </div>
            </div>
          </div>
        )}

        {secilenSayfa === 'urun-detay' && secilenUrun && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12 }}>
            <button onClick={() => setSecilenSayfa('ana')} style={{ marginBottom: 20, padding: '10px 20px', background: '#f0f0f0', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
              ← Geri
            </button>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
              <div>
                <img src={secilenUrun.resimler[0]} alt={secilenUrun.ad} style={{ width: '100%', height: 500, objectFit: 'cover', borderRadius: 12, marginBottom: 15 }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  {secilenUrun.resimler.slice(0, 4).map((resim, index) => (
                    <img key={index} src={resim} alt={`${secilenUrun.ad} ${index + 1}`} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8, cursor: 'pointer', border: '2px solid #ddd' }} />
                  ))}
                </div>
              </div>

              <div>
                <h1 style={{ margin: '0 0 15px 0' }}>{dil === 'en' && secilenUrun.adEn ? secilenUrun.adEn : secilenUrun.ad}</h1>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                  {yildizGoster(secilenUrun.ortalamaPuan || 0)}
                  <span style={{ fontSize: 16, color: '#666' }}>
                    {secilenUrun.ortalamaPuan || 0} ({secilenUrun.yorumSayisi || 0} {dil === 'en' ? 'reviews' : 'yorum'})
                  </span>
                </div>

                <p style={{ fontSize: 32, fontWeight: 'bold', color: '#000000', margin: '0 0 20px 0' }}>
                  {secilenUrun.fiyat} ₺
                </p>

                <div style={{ padding: 15, background: '#f8f9fa', borderRadius: 8, marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <strong>{t('in_stock')}:</strong>
                    <span style={{ color: secilenUrun.stokMiktari > 10 ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                      {secilenUrun.stokMiktari > 0 ? `${secilenUrun.stokMiktari} ${dil === 'en' ? 'pcs' : 'adet'}` : t('out_of_stock')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <strong>{t('categories')}:</strong>
                    <span>{secilenUrun.kategori}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <strong>{dil === 'en' ? 'Brand' : 'Marka'}:</strong>
                    <span>{secilenUrun.marka}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{dil === 'en' ? 'Sizes' : 'Bedenler'}:</strong>
                    <span>{secilenUrun.beden.join(', ')}</span>
                  </div>
                </div>

                <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 20 }}>
                  {dil === 'en' && secilenUrun.aciklamaEn ? secilenUrun.aciklamaEn : secilenUrun.aciklama}
                </p>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button 
                    onClick={() => sepeteEkle(secilenUrun)} 
                    disabled={!secilenUrun.stokDurumu || secilenUrun.stokMiktari === 0}
                    style={{ flex: 1, padding: 15, background: (!secilenUrun.stokDurumu || secilenUrun.stokMiktari === 0) ? '#ccc' : '#000000', color: 'white', border: 'none', borderRadius: 8, cursor: (!secilenUrun.stokDurumu || secilenUrun.stokMiktari === 0) ? 'not-allowed' : 'pointer', fontSize: 16, fontWeight: 600 }}
                  >
                    {(!secilenUrun.stokDurumu || secilenUrun.stokMiktari === 0) ? '❌ Stokta Yok' : '🛒 Sepete Ekle'}
                  </button>
                  <button 
                    onClick={() => favoriToggle(secilenUrun.id)}
                    style={{ padding: 15, background: favoriler.some(f => f.urunId === secilenUrun.id) ? '#e74c3c' : '#f0f0f0', color: favoriler.some(f => f.urunId === secilenUrun.id) ? 'white' : '#333', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 20 }}
                  >
                    {favoriler.some(f => f.urunId === secilenUrun.id) ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 50, borderTop: '2px solid #eee', paddingTop: 30 }}>
              <h2>⭐ Müşteri Yorumları ({yorumlar.length})</h2>

              {kullanici && (
                <div style={{ padding: 20, background: '#f8f9fa', borderRadius: 12, marginBottom: 30 }}>
                  <h3>Yorum Yap</h3>
                  <div style={{ marginBottom: 15 }}>
                    <label style={{ display: 'block', marginBottom: 10, fontWeight: 'bold' }}>Puanınız:</label>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {[1, 2, 3, 4, 5].map(puan => (
                        <button
                          key={puan}
                          onClick={() => setYeniYorum({...yeniYorum, puan})}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 30, color: puan <= yeniYorum.puan ? '#ffc107' : '#ddd' }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Yorumunuzu yazın..."
                    value={yeniYorum.yorum}
                    onChange={(e) => setYeniYorum({...yeniYorum, yorum: e.target.value})}
                    style={{ width: '100%', padding: 15, border: '1px solid #ddd', borderRadius: 8, minHeight: 100, fontSize: 14, fontFamily: 'inherit' }}
                  />
                  <button onClick={yorumEkle} style={{ marginTop: 15, padding: '12px 30px', background: '#000000', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                    📝 Yorum Gönder
                  </button>
                </div>
              )}

              {yorumlar.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666', padding: 30 }}>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
              ) : (
                <div>
                  {yorumlar.map(yorum => (
                    <div key={yorum.id} style={{ padding: 20, borderBottom: '1px solid #eee', marginBottom: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <strong>{yorum.kullaniciAd}</strong>
                        <span style={{ fontSize: 13, color: '#999' }}>
                          {new Date(yorum.tarih).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        {yildizGoster(yorum.puan)}
                      </div>
                      <p style={{ color: '#666', lineHeight: 1.6 }}>{yorum.yorum}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {secilenSayfa === 'odeme' && (
          <div style={{ background: 'white', padding: 30, borderRadius: 12 }}>
            <h2>💳 Ödeme</h2>
            <div style={{ marginBottom: 30 }}>
              <h3>Ödeme Yöntemi Seçin</h3>
              <div style={{ display: 'flex', gap: 15, marginTop: 15 }}>
                <button onClick={() => setOdemeTipi('kart')} style={{ flex: 1, padding: 15, background: odemeTipi === 'kart' ? '#000000' : '#f0f0f0', color: odemeTipi === 'kart' ? 'white' : '#333', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                  💳 Kredi Kartı
                </button>
                <button onClick={() => setOdemeTipi('havale')} style={{ flex: 1, padding: 15, background: odemeTipi === 'havale' ? '#000000' : '#f0f0f0', color: odemeTipi === 'havale' ? 'white' : '#333', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                  🏦 Havale/EFT
                </button>
                <button onClick={() => setOdemeTipi('kapida')} style={{ flex: 1, padding: 15, background: odemeTipi === 'kapida' ? '#000000' : '#f0f0f0', color: odemeTipi === 'kapida' ? 'white' : '#333', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
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
                Toplam: <span style={{ color: '#000000' }}>{indirimliToplam.toFixed(2)} ₺</span>
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
// Ürün Detay Sayfası eklendi - urun-detay-sayfa.txt dosyasından kopyalanacak
