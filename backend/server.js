const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS ayarları - hem local hem production için
app.use(cors({
  origin: ['http://localhost:3000', 'https://kiyafet-magazasi.vercel.app', 'https://*.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Örnek ürün verisi
const urunler = [
  {
    id: '1',
    ad: 'Çiçek Desenli Elbise',
    aciklama: 'Yazlık çiçek desenli şık elbise',
    fiyat: 299.99,
    eskiFiyat: 399.99,
    kategori: 'Elbise',
    beden: ['S', 'M', 'L', 'XL'],
    renk: ['Mavi', 'Pembe', 'Beyaz'],
    resimler: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Moda Dünyası'
  },
  {
    id: '2',
    ad: 'Klasik Jean Pantolon',
    aciklama: 'Rahat kesim kot pantolon',
    fiyat: 199.99,
    kategori: 'Pantolon',
    beden: ['36', '38', '40', '42'],
    renk: ['Mavi', 'Siyah'],
    resimler: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Denim Co'
  },
  {
    id: '3',
    ad: 'Beyaz Gömlek',
    aciklama: 'Ofis için ideal şık gömlek',
    fiyat: 149.99,
    eskiFiyat: 199.99,
    kategori: 'Gömlek',
    beden: ['S', 'M', 'L'],
    renk: ['Beyaz', 'Siyah', 'Krem'],
    resimler: ['https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Elegant Style'
  },
  {
    id: '4',
    ad: 'Deri Ceket',
    aciklama: 'Suni deri şık ceket',
    fiyat: 599.99,
    kategori: 'Ceket',
    beden: ['S', 'M', 'L', 'XL'],
    renk: ['Siyah', 'Kahverengi'],
    resimler: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Leather Style'
  },
  {
    id: '5',
    ad: 'Spor Ayakkabı',
    aciklama: 'Rahat günlük spor ayakkabı',
    fiyat: 349.99,
    kategori: 'Ayakkabı',
    beden: ['38', '39', '40', '41', '42', '43'],
    renk: ['Beyaz', 'Siyah', 'Gri'],
    resimler: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Sport Pro'
  },
  {
    id: '6',
    ad: 'Deri Çanta',
    aciklama: 'Şık kadın omuz çantası',
    fiyat: 449.99,
    eskiFiyat: 599.99,
    kategori: 'Aksesuar',
    beden: ['Tek Beden'],
    renk: ['Siyah', 'Kahverengi', 'Bej'],
    resimler: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Luxury Bags'
  },
  {
    id: '7',
    ad: 'Spor Tayt',
    aciklama: 'Yoga ve fitness için ideal tayt',
    fiyat: 129.99,
    kategori: 'Spor',
    beden: ['S', 'M', 'L', 'XL'],
    renk: ['Siyah', 'Lacivert', 'Mor'],
    resimler: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Active Wear'
  },
  {
    id: '8',
    ad: 'Yaz Elbisesi',
    aciklama: 'Hafif kumaş yaz elbisesi',
    fiyat: 249.99,
    kategori: 'Elbise',
    beden: ['S', 'M', 'L'],
    renk: ['Sarı', 'Turuncu', 'Yeşil'],
    resimler: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Summer Style'
  },
  {
    id: '9',
    ad: 'Kargo Pantolon',
    aciklama: 'Çok cepli rahat pantolon',
    fiyat: 279.99,
    kategori: 'Pantolon',
    beden: ['36', '38', '40', '42', '44'],
    renk: ['Haki', 'Siyah', 'Bej'],
    resimler: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Urban Style'
  },
  {
    id: '10',
    ad: 'Desenli Gömlek',
    aciklama: 'Çiçek desenli yazlık gömlek',
    fiyat: 169.99,
    kategori: 'Gömlek',
    beden: ['S', 'M', 'L', 'XL'],
    renk: ['Mavi', 'Pembe', 'Beyaz'],
    resimler: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Casual Shirts'
  },
  {
    id: '11',
    ad: 'Bomber Ceket',
    aciklama: 'Spor bomber ceket',
    fiyat: 399.99,
    kategori: 'Ceket',
    beden: ['S', 'M', 'L', 'XL'],
    renk: ['Siyah', 'Lacivert', 'Yeşil'],
    resimler: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Street Style'
  },
  {
    id: '12',
    ad: 'Klasik Bot',
    aciklama: 'Deri kış botu',
    fiyat: 499.99,
    kategori: 'Ayakkabı',
    beden: ['38', '39', '40', '41', '42'],
    renk: ['Siyah', 'Kahverengi'],
    resimler: ['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Boot Master'
  },
  {
    id: '13',
    ad: 'Güneş Gözlüğü',
    aciklama: 'UV korumalı güneş gözlüğü',
    fiyat: 199.99,
    kategori: 'Aksesuar',
    beden: ['Tek Beden'],
    renk: ['Siyah', 'Kahverengi', 'Altın'],
    resimler: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Sun Style'
  },
  {
    id: '14',
    ad: 'Spor Sweatshirt',
    aciklama: 'Kapüşonlu spor sweatshirt',
    fiyat: 229.99,
    kategori: 'Spor',
    beden: ['S', 'M', 'L', 'XL', 'XXL'],
    renk: ['Siyah', 'Gri', 'Lacivert'],
    resimler: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Sport Wear'
  }
];

const kategoriler = [
  { id: '1', ad: 'Elbise', resim: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=200&fit=crop' },
  { id: '2', ad: 'Pantolon', resim: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=200&fit=crop' },
  { id: '3', ad: 'Bluz', resim: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=300&h=200&fit=crop' },
  { id: '4', ad: 'Etek', resim: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=300&h=200&fit=crop' }
];

// API Routes
app.get('/api/urunler', (req, res) => {
  const { kategori, minFiyat, maxFiyat } = req.query;
  let filtreliUrunler = [...urunler];
  
  if (kategori) {
    filtreliUrunler = filtreliUrunler.filter(u => u.kategori === kategori);
  }
  
  res.json(filtreliUrunler);
});

app.get('/api/urunler/:id', (req, res) => {
  const urun = urunler.find(u => u.id === req.params.id);
  if (urun) {
    res.json(urun);
  } else {
    res.status(404).json({ mesaj: 'Ürün bulunamadı' });
  }
});

app.get('/api/kategoriler', (req, res) => {
  res.json(kategoriler);
});

app.post('/api/siparis', (req, res) => {
  const siparis = req.body;
  res.json({ mesaj: 'Siparişiniz alındı', siparisId: Date.now().toString() });
});

app.listen(PORT, () => {
  console.log(`Backend sunucu ${PORT} portunda çalışıyor`);
});

// iyzico Ödeme Entegrasyonu
const Iyzipay = require('iyzipay');

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || 'sandbox-test',
  secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-test',
  uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com'
});

// Ödeme endpoint'i
app.post('/api/odeme', (req, res) => {
  const { sepet, kullanici, kartBilgileri } = req.body;
  
  // Toplam tutarı hesapla
  const toplamTutar = sepet.reduce((sum, item) => sum + item.fiyat, 0);
  
  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: Date.now().toString(),
    price: toplamTutar.toFixed(2),
    paidPrice: toplamTutar.toFixed(2),
    currency: Iyzipay.CURRENCY.TRY,
    installment: '1',
    basketId: 'B' + Date.now(),
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    
    // Kart bilgileri
    paymentCard: {
      cardHolderName: kartBilgileri.cardHolderName,
      cardNumber: kartBilgileri.cardNumber.replace(/\s/g, ''),
      expireMonth: kartBilgileri.expireMonth,
      expireYear: kartBilgileri.expireYear,
      cvc: kartBilgileri.cvc,
      registerCard: '0'
    },
    
    // Alıcı bilgileri
    buyer: {
      id: 'BY' + Date.now(),
      name: kullanici.ad || 'Test',
      surname: kullanici.soyad || 'User',
      gsmNumber: kullanici.telefon || '+905555555555',
      email: kullanici.email || 'test@test.com',
      identityNumber: '11111111111',
      lastLoginDate: new Date().toISOString().split('T')[0] + ' 12:00:00',
      registrationDate: new Date().toISOString().split('T')[0] + ' 12:00:00',
      registrationAddress: kullanici.adres || 'Test Adres',
      ip: req.ip || '85.34.78.112',
      city: kullanici.il || 'Istanbul',
      country: 'Turkey',
      zipCode: kullanici.postaKodu || '34000'
    },
    
    // Teslimat adresi
    shippingAddress: {
      contactName: (kullanici.ad || 'Test') + ' ' + (kullanici.soyad || 'User'),
      city: kullanici.il || 'Istanbul',
      country: 'Turkey',
      address: kullanici.adres || 'Test Adres',
      zipCode: kullanici.postaKodu || '34000'
    },
    
    // Fatura adresi
    billingAddress: {
      contactName: (kullanici.ad || 'Test') + ' ' + (kullanici.soyad || 'User'),
      city: kullanici.il || 'Istanbul',
      country: 'Turkey',
      address: kullanici.adres || 'Test Adres',
      zipCode: kullanici.postaKodu || '34000'
    },
    
    // Sepet ürünleri
    basketItems: sepet.map((item, index) => ({
      id: item.id || 'P' + index,
      name: item.ad.substring(0, 50), // Max 50 karakter
      category1: item.kategori || 'Giyim',
      category2: item.marka || 'Genel',
      itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
      price: item.fiyat.toFixed(2)
    }))
  };

  iyzipay.payment.create(request, (err, result) => {
    if (err) {
      console.error('iyzico Hatası:', err);
      return res.status(400).json({ 
        basarili: false, 
        mesaj: 'Ödeme işlemi başarısız oldu',
        hata: err 
      });
    }
    
    console.log('iyzico Sonuç:', result);
    
    if (result.status === 'success') {
      // Ödeme başarılı
      res.json({ 
        basarili: true, 
        mesaj: 'Ödeme başarılı! Siparişiniz alındı.',
        siparisId: result.paymentId,
        conversationId: result.conversationId
      });
    } else {
      // Ödeme başarısız
      res.status(400).json({ 
        basarili: false, 
        mesaj: result.errorMessage || 'Ödeme işlemi başarısız oldu',
        hataKodu: result.errorCode
      });
    }
  });
});

// Test endpoint'i - iyzico bağlantısını kontrol et
app.get('/api/odeme-test', (req, res) => {
  res.json({
    mesaj: 'iyzico entegrasyonu hazır',
    apiKey: process.env.IYZICO_API_KEY ? 'Ayarlandı' : 'Ayarlanmadı',
    baseUrl: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com'
  });
});

// Basit veritabanı simülasyonu (gerçek projede MongoDB/PostgreSQL kullanın)
const kullanicilar = [];
const siparisler = [];
let siparisIdCounter = 1000;

// Kullanıcı Kayıt
app.post('/api/kayit', (req, res) => {
  const { email, sifre, ad, soyad, telefon } = req.body;
  
  // Email kontrolü
  const mevcutKullanici = kullanicilar.find(k => k.email === email);
  if (mevcutKullanici) {
    return res.status(400).json({ basarili: false, mesaj: 'Bu email zaten kayıtlı' });
  }
  
  const yeniKullanici = {
    id: 'U' + Date.now(),
    email,
    sifre, // Gerçek projede hash'lenmiş olmalı!
    ad,
    soyad,
    telefon,
    rol: 'kullanici', // 'kullanici' veya 'admin'
    kayitTarihi: new Date()
  };
  
  kullanicilar.push(yeniKullanici);
  
  res.json({
    basarili: true,
    mesaj: 'Kayıt başarılı',
    kullanici: {
      id: yeniKullanici.id,
      email: yeniKullanici.email,
      ad: yeniKullanici.ad,
      soyad: yeniKullanici.soyad,
      rol: yeniKullanici.rol
    }
  });
});

// Kullanıcı Girişi
app.post('/api/giris', (req, res) => {
  const { email, sifre } = req.body;
  
  const kullanici = kullanicilar.find(k => k.email === email && k.sifre === sifre);
  
  if (!kullanici) {
    return res.status(401).json({ basarili: false, mesaj: 'Email veya şifre hatalı' });
  }
  
  res.json({
    basarili: true,
    mesaj: 'Giriş başarılı',
    kullanici: {
      id: kullanici.id,
      email: kullanici.email,
      ad: kullanici.ad,
      soyad: kullanici.soyad,
      rol: kullanici.rol
    }
  });
});

// Admin kullanıcı oluştur (ilk çalıştırmada)
if (kullanicilar.length === 0) {
  kullanicilar.push({
    id: 'U-ADMIN',
    email: 'admin@kiyafet.com',
    sifre: 'admin123',
    ad: 'Admin',
    soyad: 'User',
    telefon: '5555555555',
    rol: 'admin',
    kayitTarihi: new Date()
  });
  console.log('Admin kullanıcı oluşturuldu: admin@kiyafet.com / admin123');
}

// Ürün Arama
app.get('/api/urunler/ara', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.json(urunler);
  }
  
  const aramaKelimesi = q.toLowerCase();
  const sonuclar = urunler.filter(urun => 
    urun.ad.toLowerCase().includes(aramaKelimesi) ||
    urun.aciklama.toLowerCase().includes(aramaKelimesi) ||
    urun.marka.toLowerCase().includes(aramaKelimesi) ||
    urun.kategori.toLowerCase().includes(aramaKelimesi)
  );
  
  res.json(sonuclar);
});

// Sipariş Oluştur (ödeme başarılı olduğunda)
app.post('/api/siparis-olustur', (req, res) => {
  const { kullaniciId, sepet, adres, toplamTutar } = req.body;
  
  const yeniSiparis = {
    id: 'S' + siparisIdCounter++,
    kullaniciId,
    urunler: sepet,
    toplamTutar,
    adres,
    durum: 'hazirlaniyor',
    olusturmaTarihi: new Date(),
    guncellemeTarihi: new Date()
  };
  
  siparisler.push(yeniSiparis);
  
  res.json({
    basarili: true,
    mesaj: 'Sipariş oluşturuldu',
    siparis: yeniSiparis
  });
});

// Kullanıcının Siparişlerini Getir
app.get('/api/siparislerim/:kullaniciId', (req, res) => {
  const { kullaniciId } = req.params;
  
  const kullaniciSiparisleri = siparisler
    .filter(s => s.kullaniciId === kullaniciId)
    .sort((a, b) => new Date(b.olusturmaTarihi) - new Date(a.olusturmaTarihi));
  
  res.json(kullaniciSiparisleri);
});

// ADMIN: Tüm Siparişleri Getir
app.get('/api/admin/siparisler', (req, res) => {
  const tumSiparisler = siparisler.sort((a, b) => 
    new Date(b.olusturmaTarihi) - new Date(a.olusturmaTarihi)
  );
  
  res.json(tumSiparisler);
});

// ADMIN: Sipariş Durumu Güncelle
app.put('/api/admin/siparis/:id', (req, res) => {
  const { id } = req.params;
  const { durum } = req.body;
  
  const siparis = siparisler.find(s => s.id === id);
  
  if (!siparis) {
    return res.status(404).json({ basarili: false, mesaj: 'Sipariş bulunamadı' });
  }
  
  siparis.durum = durum;
  siparis.guncellemeTarihi = new Date();
  
  res.json({
    basarili: true,
    mesaj: 'Sipariş durumu güncellendi',
    siparis
  });
});

// ADMIN: Ürün Ekle
app.post('/api/admin/urun', (req, res) => {
  const yeniUrun = {
    id: (urunler.length + 1).toString(),
    ...req.body,
    stokDurumu: true
  };
  
  urunler.push(yeniUrun);
  
  res.json({
    basarili: true,
    mesaj: 'Ürün eklendi',
    urun: yeniUrun
  });
});

// ADMIN: Ürün Güncelle
app.put('/api/admin/urun/:id', (req, res) => {
  const { id } = req.params;
  const index = urunler.findIndex(u => u.id === id);
  
  if (index === -1) {
    return res.status(404).json({ basarili: false, mesaj: 'Ürün bulunamadı' });
  }
  
  urunler[index] = { ...urunler[index], ...req.body };
  
  res.json({
    basarili: true,
    mesaj: 'Ürün güncellendi',
    urun: urunler[index]
  });
});

// ADMIN: Ürün Sil
app.delete('/api/admin/urun/:id', (req, res) => {
  const { id } = req.params;
  const index = urunler.findIndex(u => u.id === id);
  
  if (index === -1) {
    return res.status(404).json({ basarili: false, mesaj: 'Ürün bulunamadı' });
  }
  
  urunler.splice(index, 1);
  
  res.json({
    basarili: true,
    mesaj: 'Ürün silindi'
  });
});

// ADMIN: İstatistikler
app.get('/api/admin/istatistikler', (req, res) => {
  const toplamSiparis = siparisler.length;
  const toplamGelir = siparisler.reduce((sum, s) => sum + s.toplamTutar, 0);
  const toplamKullanici = kullanicilar.length;
  const toplamUrun = urunler.length;
  
  const durumlar = {
    hazirlaniyor: siparisler.filter(s => s.durum === 'hazirlaniyor').length,
    kargoda: siparisler.filter(s => s.durum === 'kargoda').length,
    teslimEdildi: siparisler.filter(s => s.durum === 'teslim-edildi').length
  };
  
  res.json({
    toplamSiparis,
    toplamGelir: toplamGelir.toFixed(2),
    toplamKullanici,
    toplamUrun,
    durumlar
  });
});

// Alternatif Ödeme: Havale/EFT
app.post('/api/odeme/havale', (req, res) => {
  const { kullaniciId, sepet, adres } = req.body;
  const toplamTutar = sepet.reduce((sum, item) => sum + item.fiyat, 0);
  
  const yeniSiparis = {
    id: 'S' + siparisIdCounter++,
    kullaniciId,
    urunler: sepet,
    toplamTutar,
    adres,
    durum: 'odeme-bekleniyor',
    odemeTipi: 'havale',
    olusturmaTarihi: new Date()
  };
  
  siparisler.push(yeniSiparis);
  
  res.json({
    basarili: true,
    mesaj: 'Sipariş oluşturuldu. Havale bilgileri email ile gönderildi.',
    siparis: yeniSiparis,
    havaleBilgileri: {
      banka: 'Türkiye İş Bankası',
      iban: 'TR00 0000 0000 0000 0000 0000 00',
      alici: 'Kıyafet Mağazası',
      tutar: toplamTutar.toFixed(2),
      aciklama: yeniSiparis.id
    }
  });
});

// Alternatif Ödeme: Kapıda Ödeme
app.post('/api/odeme/kapida', (req, res) => {
  const { kullaniciId, sepet, adres } = req.body;
  const toplamTutar = sepet.reduce((sum, item) => sum + item.fiyat, 0);
  
  const yeniSiparis = {
    id: 'S' + siparisIdCounter++,
    kullaniciId,
    urunler: sepet,
    toplamTutar,
    adres,
    durum: 'hazirlaniyor',
    odemeTipi: 'kapida',
    olusturmaTarihi: new Date()
  };
  
  siparisler.push(yeniSiparis);
  
  res.json({
    basarili: true,
    mesaj: 'Siparişiniz alındı. Ödemeyi kapıda yapabilirsiniz.',
    siparis: yeniSiparis
  });
});

// ============================================
// YENİ ÖZELLİKLER
// ============================================

// Veritabanı simülasyonu - yeni koleksiyonlar
const yorumlar = [];
const favoriler = [];
const kuponlar = [];
const kargoTakip = [];
const canlıDestekMesajları = [];

// Başlangıç kuponları
kuponlar.push(
  { kod: 'HOSGELDIN', indirimTipi: 'yuzde', indirimMiktari: 10, aktif: true, kullanimSayisi: 0 },
  { kod: 'YENISEZON', indirimTipi: 'yuzde', indirimMiktari: 15, aktif: true, kullanimSayisi: 0 },
  { kod: '50TL', indirimTipi: 'sabit', indirimMiktari: 50, aktif: true, kullanimSayisi: 0 }
);

// Ürünlere stok ve çoklu resim ekle
urunler.forEach(urun => {
  urun.stokMiktari = 50;
  if (urun.resimler.length === 1) {
    urun.resimler.push(urun.resimler[0], urun.resimler[0], urun.resimler[0]);
  }
  urun.yorumlar = [];
  urun.ortalamaPuan = 0;
});

// ============================================
// 1. ÜRÜN YORUMLARI VE PUANLAMA
// ============================================

// Yorum Ekle
app.post('/api/yorum', (req, res) => {
  const { urunId, kullaniciId, kullaniciAd, puan, yorum } = req.body;
  
  const yeniYorum = {
    id: 'Y' + Date.now(),
    urunId,
    kullaniciId,
    kullaniciAd,
    puan,
    yorum,
    tarih: new Date(),
    onaylandi: true
  };
  
  yorumlar.push(yeniYorum);
  
  // Ürünün ortalama puanını güncelle
  const urun = urunler.find(u => u.id === urunId);
  if (urun) {
    const urunYorumlari = yorumlar.filter(y => y.urunId === urunId);
    const toplamPuan = urunYorumlari.reduce((sum, y) => sum + y.puan, 0);
    urun.ortalamaPuan = (toplamPuan / urunYorumlari.length).toFixed(1);
    urun.yorumSayisi = urunYorumlari.length;
  }
  
  res.json({ basarili: true, mesaj: 'Yorum eklendi', yorum: yeniYorum });
});

// Ürün Yorumlarını Getir
app.get('/api/yorumlar/:urunId', (req, res) => {
  const { urunId } = req.params;
  const urunYorumlari = yorumlar
    .filter(y => y.urunId === urunId && y.onaylandi)
    .sort((a, b) => new Date(b.tarih) - new Date(a.tarih));
  
  res.json(urunYorumlari);
});

// ============================================
// 2. KUPON/İNDİRİM KODU
// ============================================

// Kupon Kontrol Et
app.post('/api/kupon-kontrol', (req, res) => {
  const { kod, toplamTutar } = req.body;
  
  const kupon = kuponlar.find(k => k.kod.toUpperCase() === kod.toUpperCase() && k.aktif);
  
  if (!kupon) {
    return res.status(404).json({ basarili: false, mesaj: 'Geçersiz kupon kodu' });
  }
  
  let indirimTutari = 0;
  if (kupon.indirimTipi === 'yuzde') {
    indirimTutari = (toplamTutar * kupon.indirimMiktari) / 100;
  } else {
    indirimTutari = kupon.indirimMiktari;
  }
  
  const yeniToplam = Math.max(0, toplamTutar - indirimTutari);
  
  res.json({
    basarili: true,
    mesaj: 'Kupon uygulandı',
    kupon: kupon,
    indirimTutari: indirimTutari.toFixed(2),
    yeniToplam: yeniToplam.toFixed(2)
  });
});

// Admin: Kupon Oluştur
app.post('/api/admin/kupon', (req, res) => {
  const { kod, indirimTipi, indirimMiktari } = req.body;
  
  const yeniKupon = {
    id: 'K' + Date.now(),
    kod: kod.toUpperCase(),
    indirimTipi,
    indirimMiktari,
    aktif: true,
    kullanimSayisi: 0,
    olusturmaTarihi: new Date()
  };
  
  kuponlar.push(yeniKupon);
  
  res.json({ basarili: true, mesaj: 'Kupon oluşturuldu', kupon: yeniKupon });
});

// Kuponları Listele
app.get('/api/admin/kuponlar', (req, res) => {
  res.json(kuponlar);
});

// ============================================
// 3. FİLTRE VE SIRALAMA
// ============================================

// Gelişmiş Ürün Filtreleme
app.get('/api/urunler/filtrele', (req, res) => {
  const { kategori, minFiyat, maxFiyat, beden, renk, marka, siralama } = req.query;
  
  let filtreliUrunler = [...urunler];
  
  // Kategori filtresi
  if (kategori) {
    filtreliUrunler = filtreliUrunler.filter(u => u.kategori === kategori);
  }
  
  // Fiyat filtresi
  if (minFiyat) {
    filtreliUrunler = filtreliUrunler.filter(u => u.fiyat >= parseFloat(minFiyat));
  }
  if (maxFiyat) {
    filtreliUrunler = filtreliUrunler.filter(u => u.fiyat <= parseFloat(maxFiyat));
  }
  
  // Beden filtresi
  if (beden) {
    filtreliUrunler = filtreliUrunler.filter(u => u.beden.includes(beden));
  }
  
  // Renk filtresi
  if (renk) {
    filtreliUrunler = filtreliUrunler.filter(u => u.renk.includes(renk));
  }
  
  // Marka filtresi
  if (marka) {
    filtreliUrunler = filtreliUrunler.filter(u => u.marka === marka);
  }
  
  // Sıralama
  if (siralama === 'fiyat-artan') {
    filtreliUrunler.sort((a, b) => a.fiyat - b.fiyat);
  } else if (siralama === 'fiyat-azalan') {
    filtreliUrunler.sort((a, b) => b.fiyat - a.fiyat);
  } else if (siralama === 'puan') {
    filtreliUrunler.sort((a, b) => (b.ortalamaPuan || 0) - (a.ortalamaPuan || 0));
  } else if (siralama === 'yeni') {
    filtreliUrunler.sort((a, b) => b.id - a.id);
  }
  
  res.json(filtreliUrunler);
});

// Filtre Seçeneklerini Getir
app.get('/api/filtre-secenekleri', (req, res) => {
  const kategoriler = [...new Set(urunler.map(u => u.kategori))];
  const markalar = [...new Set(urunler.map(u => u.marka))];
  const bedenler = [...new Set(urunler.flatMap(u => u.beden))];
  const renkler = [...new Set(urunler.flatMap(u => u.renk))];
  
  const minFiyat = Math.min(...urunler.map(u => u.fiyat));
  const maxFiyat = Math.max(...urunler.map(u => u.fiyat));
  
  res.json({
    kategoriler,
    markalar,
    bedenler,
    renkler,
    fiyatAraligi: { min: minFiyat, max: maxFiyat }
  });
});

// ============================================
// 4. FAVORİ ÜRÜNLER
// ============================================

// Favorilere Ekle
app.post('/api/favori-ekle', (req, res) => {
  const { kullaniciId, urunId } = req.body;
  
  const mevcutFavori = favoriler.find(f => f.kullaniciId === kullaniciId && f.urunId === urunId);
  
  if (mevcutFavori) {
    return res.status(400).json({ basarili: false, mesaj: 'Ürün zaten favorilerde' });
  }
  
  favoriler.push({
    id: 'F' + Date.now(),
    kullaniciId,
    urunId,
    eklemeTarihi: new Date()
  });
  
  res.json({ basarili: true, mesaj: 'Favorilere eklendi' });
});

// Favorilerden Çıkar
app.delete('/api/favori-cikar/:kullaniciId/:urunId', (req, res) => {
  const { kullaniciId, urunId } = req.params;
  
  const index = favoriler.findIndex(f => f.kullaniciId === kullaniciId && f.urunId === urunId);
  
  if (index === -1) {
    return res.status(404).json({ basarili: false, mesaj: 'Favori bulunamadı' });
  }
  
  favoriler.splice(index, 1);
  
  res.json({ basarili: true, mesaj: 'Favorilerden çıkarıldı' });
});

// Favorileri Getir
app.get('/api/favorilerim/:kullaniciId', (req, res) => {
  const { kullaniciId } = req.params;
  
  const kullaniciFavorileri = favoriler
    .filter(f => f.kullaniciId === kullaniciId)
    .map(f => {
      const urun = urunler.find(u => u.id === f.urunId);
      return { ...f, urun };
    });
  
  res.json(kullaniciFavorileri);
});

// ============================================
// 5. STOK YÖNETİMİ
// ============================================

// Stok Güncelle
app.put('/api/admin/stok/:urunId', (req, res) => {
  const { urunId } = req.params;
  const { stokMiktari } = req.body;
  
  const urun = urunler.find(u => u.id === urunId);
  
  if (!urun) {
    return res.status(404).json({ basarili: false, mesaj: 'Ürün bulunamadı' });
  }
  
  urun.stokMiktari = stokMiktari;
  urun.stokDurumu = stokMiktari > 0;
  
  res.json({ basarili: true, mesaj: 'Stok güncellendi', urun });
});

// Düşük Stoklu Ürünler
app.get('/api/admin/dusuk-stok', (req, res) => {
  const dusukStokluUrunler = urunler.filter(u => u.stokMiktari < 10);
  res.json(dusukStokluUrunler);
});

// ============================================
// 6. KARGO TAKİBİ
// ============================================

// Kargo Bilgisi Ekle
app.post('/api/admin/kargo', (req, res) => {
  const { siparisId, kargoFirmasi, takipNo } = req.body;
  
  const siparis = siparisler.find(s => s.id === siparisId);
  
  if (!siparis) {
    return res.status(404).json({ basarili: false, mesaj: 'Sipariş bulunamadı' });
  }
  
  const kargoInfo = {
    id: 'KT' + Date.now(),
    siparisId,
    kargoFirmasi,
    takipNo,
    durum: 'kargoya-verildi',
    guncellemeler: [
      { tarih: new Date(), durum: 'kargoya-verildi', aciklama: 'Kargoya verildi' }
    ]
  };
  
  kargoTakip.push(kargoInfo);
  siparis.durum = 'kargoda';
  siparis.kargoTakipNo = takipNo;
  
  res.json({ basarili: true, mesaj: 'Kargo bilgisi eklendi', kargo: kargoInfo });
});

// Kargo Durumu Sorgula
app.get('/api/kargo-takip/:takipNo', (req, res) => {
  const { takipNo } = req.params;
  
  const kargo = kargoTakip.find(k => k.takipNo === takipNo);
  
  if (!kargo) {
    return res.status(404).json({ basarili: false, mesaj: 'Kargo bulunamadı' });
  }
  
  res.json(kargo);
});

// ============================================
// 7. CANLI DESTEK
// ============================================

// Destek Mesajı Gönder
app.post('/api/destek-mesaj', (req, res) => {
  const { kullaniciId, mesaj } = req.body;
  
  const yeniMesaj = {
    id: 'M' + Date.now(),
    kullaniciId,
    mesaj,
    gonderen: 'kullanici',
    tarih: new Date(),
    okundu: false
  };
  
  canlıDestekMesajları.push(yeniMesaj);
  
  // Otomatik yanıt
  setTimeout(() => {
    const otomatikYanit = {
      id: 'M' + (Date.now() + 1),
      kullaniciId,
      mesaj: 'Merhaba! Size nasıl yardımcı olabilirim?',
      gonderen: 'destek',
      tarih: new Date(),
      okundu: false
    };
    canlıDestekMesajları.push(otomatikYanit);
  }, 1000);
  
  res.json({ basarili: true, mesaj: 'Mesaj gönderildi', mesajId: yeniMesaj.id });
});

// Destek Mesajlarını Getir
app.get('/api/destek-mesajlar/:kullaniciId', (req, res) => {
  const { kullaniciId } = req.params;
  
  const mesajlar = canlıDestekMesajları
    .filter(m => m.kullaniciId === kullaniciId)
    .sort((a, b) => new Date(a.tarih) - new Date(b.tarih));
  
  res.json(mesajlar);
});

// ============================================
// 8. EMAIL BİLDİRİMLERİ (Simülasyon)
// ============================================

// Email Gönder (Simülasyon)
app.post('/api/email-gonder', (req, res) => {
  const { alici, konu, icerik, tip } = req.body;
  
  console.log('📧 Email Gönderildi:');
  console.log('Alıcı:', alici);
  console.log('Konu:', konu);
  console.log('İçerik:', icerik);
  console.log('Tip:', tip);
  
  res.json({
    basarili: true,
    mesaj: 'Email gönderildi (simülasyon)',
    emailId: 'E' + Date.now()
  });
});

// Sipariş Onay Emaili
function siparisOnayEmailiGonder(siparis, kullanici) {
  const emailIcerik = `
    Merhaba ${kullanici.ad},
    
    Siparişiniz başarıyla alındı!
    
    Sipariş No: ${siparis.id}
    Toplam Tutar: ${siparis.toplamTutar} ₺
    
    Teşekkür ederiz!
  `;
  
  console.log('📧 Sipariş Onay Emaili:', emailIcerik);
}

// ============================================
// 9. DİL DESTEĞİ
// ============================================

const ceviriMetinleri = {
  tr: {
    'welcome': 'Hoş Geldiniz',
    'products': 'Ürünler',
    'cart': 'Sepet',
    'checkout': 'Ödeme',
    'login': 'Giriş Yap',
    'register': 'Kayıt Ol',
    'search': 'Ara',
    'add_to_cart': 'Sepete Ekle',
    'buy_now': 'Hemen Al',
    'total': 'Toplam',
    'order_success': 'Siparişiniz alındı'
  },
  en: {
    'welcome': 'Welcome',
    'products': 'Products',
    'cart': 'Cart',
    'checkout': 'Checkout',
    'login': 'Login',
    'register': 'Register',
    'search': 'Search',
    'add_to_cart': 'Add to Cart',
    'buy_now': 'Buy Now',
    'total': 'Total',
    'order_success': 'Order received'
  }
};

// Çeviri Getir
app.get('/api/ceviri/:dil', (req, res) => {
  const { dil } = req.params;
  const ceviri = ceviriMetinleri[dil] || ceviriMetinleri['tr'];
  res.json(ceviri);
});

console.log('✅ Tüm yeni özellikler yüklendi!');
console.log('📦 Kupon kodları: HOSGELDIN, YENISEZON, 50TL');
