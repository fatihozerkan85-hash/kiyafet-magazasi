const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS ayarları - hem local hem production için
app.use(cors({
  origin: function(origin, callback) {
    // İzin verilen origin'ler
    const allowedOrigins = [
      'http://localhost:3000',
      'https://kiyafet-magazasi.vercel.app',
      'https://www.aslbutique.com.tr',
      'https://aslbutique.com.tr',
      'http://www.aslbutique.com.tr',
      'http://aslbutique.com.tr'
    ];
    
    // Vercel domain'lerini kontrol et
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.includes('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Örnek ürün verisi
const urunler = [
  {
    id: '1',
    ad: 'Çiçek Desenli Elbise',
    adEn: 'Floral Dress',
    aciklama: 'Yazlık çiçek desenli şık elbise',
    aciklamaEn: 'Stylish summer floral dress',
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
    adEn: 'Classic Jeans',
    aciklama: 'Rahat kesim kot pantolon',
    aciklamaEn: 'Comfortable fit denim pants',
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
    adEn: 'White Shirt',
    aciklama: 'Ofis için ideal şık gömlek',
    aciklamaEn: 'Elegant shirt ideal for office',
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
    adEn: 'Leather Jacket',
    aciklama: 'Suni deri şık ceket',
    aciklamaEn: 'Stylish faux leather jacket',
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
    adEn: 'Sports Shoes',
    aciklama: 'Rahat günlük spor ayakkabı',
    aciklamaEn: 'Comfortable daily sports shoes',
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
    adEn: 'Leather Bag',
    aciklama: 'Şık kadın omuz çantası',
    aciklamaEn: 'Elegant women shoulder bag',
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
    adEn: 'Sports Leggings',
    aciklama: 'Yoga ve fitness için ideal tayt',
    aciklamaEn: 'Ideal leggings for yoga and fitness',
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
    adEn: 'Summer Dress',
    aciklama: 'Hafif kumaş yaz elbisesi',
    aciklamaEn: 'Light fabric summer dress',
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
    adEn: 'Cargo Pants',
    aciklama: 'Çok cepli rahat pantolon',
    aciklamaEn: 'Multi-pocket comfortable pants',
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
    adEn: 'Patterned Shirt',
    aciklama: 'Çiçek desenli yazlık gömlek',
    aciklamaEn: 'Floral patterned summer shirt',
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
    adEn: 'Bomber Jacket',
    aciklama: 'Spor bomber ceket',
    aciklamaEn: 'Sports bomber jacket',
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
    adEn: 'Classic Boots',
    aciklama: 'Deri kış botu',
    aciklamaEn: 'Leather winter boots',
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
    adEn: 'Sunglasses',
    aciklama: 'UV korumalı güneş gözlüğü',
    aciklamaEn: 'UV protected sunglasses',
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
    adEn: 'Sports Sweatshirt',
    aciklama: 'Kapüşonlu spor sweatshirt',
    aciklamaEn: 'Hooded sports sweatshirt',
    fiyat: 229.99,
    kategori: 'Spor',
    beden: ['S', 'M', 'L', 'XL', 'XXL'],
    renk: ['Siyah', 'Gri', 'Lacivert'],
    resimler: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop'],
    stokDurumu: true,
    marka: 'Sport Wear'
  }
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

// ============================================
// 12. KAMPANYA YÖNETİMİ
// ============================================

// Aktif Kampanyaları Getir (Müşteri)
app.get('/api/kampanyalar', (req, res) => {
  const aktifKampanyalar = kampanyalar
    .filter(k => k.aktif)
    .sort((a, b) => a.sira - b.sira);
  res.json(aktifKampanyalar);
});

// Tüm Kampanyaları Getir (Admin)
app.get('/api/admin/kampanyalar', (req, res) => {
  const tumKampanyalar = kampanyalar.sort((a, b) => a.sira - b.sira);
  res.json(tumKampanyalar);
});

// Kampanya Ekle (Admin)
app.post('/api/admin/kampanya', (req, res) => {
  const { baslik, aciklama, resim, link, baslangicTarihi, bitisTarihi, renk } = req.body;
  
  const yeniKampanya = {
    id: 'K' + Date.now(),
    baslik,
    aciklama,
    resim,
    link: link || '/kategori/Tümü',
    aktif: true,
    baslangicTarihi: new Date(baslangicTarihi),
    bitisTarihi: new Date(bitisTarihi),
    renk: renk || '#667eea',
    sira: kampanyalar.length + 1
  };
  
  kampanyalar.push(yeniKampanya);
  res.json({ basarili: true, mesaj: 'Kampanya eklendi', kampanya: yeniKampanya });
});

// Kampanya Güncelle (Admin)
app.put('/api/admin/kampanya/:id', (req, res) => {
  const { id } = req.params;
  const { baslik, aciklama, resim, link, aktif, baslangicTarihi, bitisTarihi, renk, sira } = req.body;
  
  const kampanya = kampanyalar.find(k => k.id === id);
  
  if (!kampanya) {
    return res.status(404).json({ basarili: false, mesaj: 'Kampanya bulunamadı' });
  }
  
  if (baslik) kampanya.baslik = baslik;
  if (aciklama) kampanya.aciklama = aciklama;
  if (resim) kampanya.resim = resim;
  if (link) kampanya.link = link;
  if (typeof aktif !== 'undefined') kampanya.aktif = aktif;
  if (baslangicTarihi) kampanya.baslangicTarihi = new Date(baslangicTarihi);
  if (bitisTarihi) kampanya.bitisTarihi = new Date(bitisTarihi);
  if (renk) kampanya.renk = renk;
  if (sira) kampanya.sira = sira;
  
  res.json({ basarili: true, mesaj: 'Kampanya güncellendi', kampanya });
});

// Kampanya Sil (Admin)
app.delete('/api/admin/kampanya/:id', (req, res) => {
  const { id } = req.params;
  const index = kampanyalar.findIndex(k => k.id === id);
  
  if (index === -1) {
    return res.status(404).json({ basarili: false, mesaj: 'Kampanya bulunamadı' });
  }
  
  kampanyalar.splice(index, 1);
  res.json({ basarili: true, mesaj: 'Kampanya silindi' });
});

// Kampanya Aktif/Pasif (Admin)
app.patch('/api/admin/kampanya/:id/toggle', (req, res) => {
  const { id } = req.params;
  const kampanya = kampanyalar.find(k => k.id === id);
  
  if (!kampanya) {
    return res.status(404).json({ basarili: false, mesaj: 'Kampanya bulunamadı' });
  }
  
  kampanya.aktif = !kampanya.aktif;
  res.json({ basarili: true, mesaj: `Kampanya ${kampanya.aktif ? 'aktif' : 'pasif'} edildi`, kampanya });
});

// ============================================
// KATEGORİ YÖNETİMİ API'LERİ
// ============================================

// Tüm Kategorileri Getir
app.get('/api/kategoriler', (req, res) => {
  const aktifKategoriler = kategoriler
    .filter(k => k.aktif)
    .sort((a, b) => a.sira - b.sira);
  res.json(aktifKategoriler);
});

// Tüm Kategorileri Getir (Admin)
app.get('/api/admin/kategoriler', (req, res) => {
  const tumKategoriler = kategoriler.sort((a, b) => a.sira - b.sira);
  res.json(tumKategoriler);
});

// Kategori Ekle (Admin)
app.post('/api/admin/kategori', (req, res) => {
  const { ad, adEn, emoji } = req.body;
  
  const yeniKategori = {
    id: 'K' + Date.now(),
    ad,
    adEn: adEn || ad,
    emoji: emoji || '📦',
    sira: kategoriler.length + 1,
    aktif: true
  };
  
  kategoriler.push(yeniKategori);
  res.json({ basarili: true, mesaj: 'Kategori eklendi', kategori: yeniKategori });
});

// Kategori Güncelle (Admin)
app.put('/api/admin/kategori/:id', (req, res) => {
  const { id } = req.params;
  const { ad, adEn, emoji, sira, aktif } = req.body;
  
  const kategori = kategoriler.find(k => k.id === id);
  
  if (!kategori) {
    return res.status(404).json({ basarili: false, mesaj: 'Kategori bulunamadı' });
  }
  
  if (ad) kategori.ad = ad;
  if (adEn) kategori.adEn = adEn;
  if (emoji) kategori.emoji = emoji;
  if (sira !== undefined) kategori.sira = sira;
  if (aktif !== undefined) kategori.aktif = aktif;
  
  res.json({ basarili: true, mesaj: 'Kategori güncellendi', kategori });
});

// Kategori Sil (Admin)
app.delete('/api/admin/kategori/:id', (req, res) => {
  const { id } = req.params;
  const index = kategoriler.findIndex(k => k.id === id);
  
  if (index === -1) {
    return res.status(404).json({ basarili: false, mesaj: 'Kategori bulunamadı' });
  }
  
  // "Tümü" kategorisi silinemez
  if (kategoriler[index].ad === 'Tümü') {
    return res.status(400).json({ basarili: false, mesaj: 'Tümü kategorisi silinemez' });
  }
  
  kategoriler.splice(index, 1);
  res.json({ basarili: true, mesaj: 'Kategori silindi' });
});

// Kategori Aktif/Pasif (Admin)
app.patch('/api/admin/kategori/:id/toggle', (req, res) => {
  const { id } = req.params;
  const kategori = kategoriler.find(k => k.id === id);
  
  if (!kategori) {
    return res.status(404).json({ basarili: false, mesaj: 'Kategori bulunamadı' });
  }
  
  kategori.aktif = !kategori.aktif;
  res.json({ basarili: true, mesaj: `Kategori ${kategori.aktif ? 'aktif' : 'pasif'} edildi`, kategori });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    mesaj: 'Kıyafet Mağazası API çalışıyor',
    version: '1.0.0',
    endpoints: {
      urunler: '/api/urunler',
      kampanyalar: '/api/kampanyalar',
      giris: '/api/giris',
      kayit: '/api/kayit'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend sunucu ${PORT} portunda çalışıyor`);
});

// Vercel için export
module.exports = app;

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

// Kampanya Banner'ları
const kampanyalar = [
  {
    id: 'K1',
    baslik: '❄️ KIŞ SEZONUNUN SON FIRSATLARI',
    aciklama: 'Tüm kış ürünlerinde %70\'e varan indirimler',
    resim: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=500&fit=crop',
    link: '/kategori/Ceket',
    aktif: true,
    baslangicTarihi: new Date('2024-03-01'),
    bitisTarihi: new Date('2024-03-31'),
    renk: '#2c3e50',
    sira: 1
  },
  {
    id: 'K2',
    baslik: '👗 Yeni Sezon Koleksiyonu',
    aciklama: 'En yeni trendler şimdi mağazamızda',
    resim: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=500&fit=crop',
    link: '/kategori/Elbise',
    aktif: true,
    baslangicTarihi: new Date('2024-03-01'),
    bitisTarihi: new Date('2024-04-30'),
    renk: '#e74c3c',
    sira: 2
  },
  {
    id: 'K3',
    baslik: '🚚 Ücretsiz Kargo',
    aciklama: '200 TL ve üzeri alışverişlerde kargo bedava',
    resim: 'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=1920&h=500&fit=crop',
    link: '/kategori/Tümü',
    aktif: true,
    baslangicTarihi: new Date('2024-03-01'),
    bitisTarihi: new Date('2024-12-31'),
    renk: '#28a745',
    sira: 3
  }
];

// Kategoriler
const kategoriler = [
  { id: 'K1', ad: 'Tümü', adEn: 'All', emoji: '🛍️', resim: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop', sira: 1, aktif: true },
  { id: 'K2', ad: 'Elbise', adEn: 'Dress', emoji: '👗', resim: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop', sira: 2, aktif: true },
  { id: 'K3', ad: 'Pantolon', adEn: 'Pants', emoji: '👖', resim: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=300&fit=crop', sira: 3, aktif: true },
  { id: 'K4', ad: 'Gömlek', adEn: 'Shirt', emoji: '👔', resim: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop', sira: 4, aktif: true },
  { id: 'K5', ad: 'Ceket', adEn: 'Jacket', emoji: '🧥', resim: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', sira: 5, aktif: true },
  { id: 'K6', ad: 'Ayakkabı', adEn: 'Shoes', emoji: '👟', resim: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop', sira: 6, aktif: true },
  { id: 'K7', ad: 'Aksesuar', adEn: 'Accessories', emoji: '👜', resim: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=300&fit=crop', sira: 7, aktif: true },
  { id: 'K8', ad: 'Spor', adEn: 'Sports', emoji: '🏃', resim: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop', sira: 8, aktif: true }
];

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

// ============================================
// 10. RESİM UPLOAD SİSTEMİ (Cloudinary Simülasyonu)
// ============================================

// Resim upload endpoint (Base64 simülasyonu)
app.post('/api/admin/resim-yukle', (req, res) => {
  const { resimBase64, dosyaAdi } = req.body;
  
  // Gerçek projede Cloudinary veya AWS S3 kullanılır
  // Şimdilik base64'ü direkt döndürüyoruz
  
  const resimUrl = resimBase64; // Simülasyon
  
  res.json({
    basarili: true,
    mesaj: 'Resim yüklendi',
    url: resimUrl,
    // Gerçek projede Cloudinary URL'i döner:
    // url: 'https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg'
  });
});

// Cloudinary config bilgisi (simülasyon)
app.get('/api/admin/resim-config', (req, res) => {
  res.json({
    basarili: true,
    mesaj: 'Resim upload için base64 kullanın veya Cloudinary entegre edin',
    cloudinaryInfo: {
      cloudName: 'your-cloud-name',
      uploadPreset: 'your-upload-preset',
      apiKey: 'your-api-key'
    }
  });
});

// ============================================
// 11. SİPARİŞ DURUMU GÜNCELLEME
// ============================================

// Sipariş durumları
const siparisDurumlari = [
  'odeme-bekleniyor',
  'hazirlaniyor',
  'kargoya-verildi',
  'kargoda',
  'teslim-edildi',
  'iptal-edildi'
];

// Sipariş durumu güncelle (geliştirilmiş)
app.put('/api/admin/siparis/:id/durum', (req, res) => {
  const { id } = req.params;
  const { durum, kargoFirmasi, kargoTakipNo, aciklama } = req.body;
  
  const siparis = siparisler.find(s => s.id === id);
  
  if (!siparis) {
    return res.status(404).json({ basarili: false, mesaj: 'Sipariş bulunamadı' });
  }
  
  // Durum geçmişi
  if (!siparis.durumGecmisi) {
    siparis.durumGecmisi = [];
  }
  
  siparis.durumGecmisi.push({
    durum: siparis.durum,
    tarih: new Date(),
    aciklama: aciklama || ''
  });
  
  // Yeni durum
  siparis.durum = durum;
  siparis.guncellemeTarihi = new Date();
  
  if (kargoFirmasi) siparis.kargoFirmasi = kargoFirmasi;
  if (kargoTakipNo) siparis.kargoTakipNo = kargoTakipNo;
  
  // Email bildirimi gönder (simülasyon)
  emailBildirimiGonder(siparis, durum);
  
  // SMS bildirimi gönder (simülasyon)
  smsBildirimiGonder(siparis, durum);
  
  res.json({
    basarili: true,
    mesaj: 'Sipariş durumu güncellendi',
    siparis
  });
});

// Sipariş durumu geçmişi
app.get('/api/admin/siparis/:id/gecmis', (req, res) => {
  const { id } = req.params;
  const siparis = siparisler.find(s => s.id === id);
  
  if (!siparis) {
    return res.status(404).json({ basarili: false, mesaj: 'Sipariş bulunamadı' });
  }
  
  res.json({
    basarili: true,
    gecmis: siparis.durumGecmisi || []
  });
});

// ============================================
// 12. EMAIL BİLDİRİMLERİ (Nodemailer Simülasyonu)
// ============================================

function emailBildirimiGonder(siparis, durum) {
  const emailSablonlari = {
    'hazirlaniyor': {
      konu: 'Siparişiniz Hazırlanıyor',
      icerik: `Merhaba,\n\nSipariş No: ${siparis.id}\nSiparişiniz hazırlanmaya başlandı.\n\nTeşekkür ederiz!`
    },
    'kargoya-verildi': {
      konu: 'Siparişiniz Kargoya Verildi',
      icerik: `Merhaba,\n\nSipariş No: ${siparis.id}\nKargo Firması: ${siparis.kargoFirmasi}\nTakip No: ${siparis.kargoTakipNo}\n\nSiparişiniz kargoya verildi.`
    },
    'teslim-edildi': {
      konu: 'Siparişiniz Teslim Edildi',
      icerik: `Merhaba,\n\nSipariş No: ${siparis.id}\nSiparişiniz teslim edildi.\n\nBizi tercih ettiğiniz için teşekkür ederiz!`
    }
  };
  
  const sablon = emailSablonlari[durum];
  
  if (sablon) {
    console.log('📧 EMAIL GÖNDERİLDİ:');
    console.log('Konu:', sablon.konu);
    console.log('İçerik:', sablon.icerik);
    console.log('---');
  }
  
  // Gerçek projede Nodemailer kullanılır:
  /*
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  transporter.sendMail({
    from: 'noreply@kiyafetmagazasi.com',
    to: siparis.kullanici.email,
    subject: sablon.konu,
    text: sablon.icerik
  });
  */
}

// Email gönder endpoint (manuel)
app.post('/api/admin/email-gonder', (req, res) => {
  const { alici, konu, icerik } = req.body;
  
  console.log('📧 EMAIL GÖNDERİLDİ:');
  console.log('Alıcı:', alici);
  console.log('Konu:', konu);
  console.log('İçerik:', icerik);
  
  res.json({
    basarili: true,
    mesaj: 'Email gönderildi (simülasyon)',
    emailId: 'E' + Date.now()
  });
});

// ============================================
// 13. SMS ENTEGRASYONU (Netgsm/İletimerkezi Simülasyonu)
// ============================================

function smsBildirimiGonder(siparis, durum) {
  const smsSablonlari = {
    'hazirlaniyor': `Siparişiniz hazırlanıyor. Sipariş No: ${siparis.id}`,
    'kargoya-verildi': `Siparişiniz kargoya verildi. Takip No: ${siparis.kargoTakipNo}`,
    'teslim-edildi': `Siparişiniz teslim edildi. Bizi tercih ettiğiniz için teşekkürler!`
  };
  
  const mesaj = smsSablonlari[durum];
  
  if (mesaj && siparis.kullanici && siparis.kullanici.telefon) {
    console.log('📱 SMS GÖNDERİLDİ:');
    console.log('Telefon:', siparis.kullanici.telefon);
    console.log('Mesaj:', mesaj);
    console.log('---');
  }
  
  // Gerçek projede Netgsm veya İletimerkezi API kullanılır:
  /*
  const axios = require('axios');
  
  // Netgsm örneği:
  axios.post('https://api.netgsm.com.tr/sms/send/get', {
    usercode: process.env.NETGSM_USER,
    password: process.env.NETGSM_PASS,
    gsmno: siparis.kullanici.telefon,
    message: mesaj,
    msgheader: 'KIYAFET'
  });
  
  // İletimerkezi örneği:
  axios.post('https://api.iletimerkezi.com/v1/send-sms', {
    username: process.env.ILETIMERKEZI_USER,
    password: process.env.ILETIMERKEZI_PASS,
    text: mesaj,
    receipents: [siparis.kullanici.telefon],
    sender: 'KIYAFET'
  });
  */
}

// SMS gönder endpoint (manuel)
app.post('/api/admin/sms-gonder', (req, res) => {
  const { telefon, mesaj } = req.body;
  
  console.log('📱 SMS GÖNDERİLDİ:');
  console.log('Telefon:', telefon);
  console.log('Mesaj:', mesaj);
  
  res.json({
    basarili: true,
    mesaj: 'SMS gönderildi (simülasyon)',
    smsId: 'S' + Date.now()
  });
});

// SMS ayarları
app.get('/api/admin/sms-ayarlar', (req, res) => {
  res.json({
    basarili: true,
    mesaj: 'SMS entegrasyonu için Netgsm veya İletimerkezi kullanın',
    providers: [
      {
        name: 'Netgsm',
        website: 'https://www.netgsm.com.tr',
        apiDoc: 'https://www.netgsm.com.tr/dokuman'
      },
      {
        name: 'İletimerkezi',
        website: 'https://www.iletimerkezi.com',
        apiDoc: 'https://www.iletimerkezi.com/api-dokumantasyon'
      }
    ]
  });
});

// ============================================
// 14. BİLDİRİM GEÇMİŞİ
// ============================================

const bildirimGecmisi = [];

// Bildirim kaydet
function bildirimKaydet(tip, alici, icerik, durum) {
  bildirimGecmisi.push({
    id: 'B' + Date.now(),
    tip, // 'email' veya 'sms'
    alici,
    icerik,
    durum, // 'gonderildi', 'basarisiz'
    tarih: new Date()
  });
}

// Bildirim geçmişi
app.get('/api/admin/bildirim-gecmisi', (req, res) => {
  const { tip, limit } = req.query;
  
  let gecmis = [...bildirimGecmisi];
  
  if (tip) {
    gecmis = gecmis.filter(b => b.tip === tip);
  }
  
  if (limit) {
    gecmis = gecmis.slice(0, parseInt(limit));
  }
  
  res.json({
    basarili: true,
    bildirimler: gecmis.reverse()
  });
});

// ============================================
// 15. GELİŞMİŞ RAPORLAMA
// ============================================

// Satış Raporu (Günlük, Haftalık, Aylık)
app.get('/api/admin/rapor/satis', (req, res) => {
  const { period } = req.query; // 'gunluk', 'haftalik', 'aylik'
  
  const now = new Date();
  let baslangic;
  
  switch(period) {
    case 'gunluk':
      baslangic = new Date(now.setHours(0, 0, 0, 0));
      break;
    case 'haftalik':
      baslangic = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'aylik':
      baslangic = new Date(now.setMonth(now.getMonth() - 1));
      break;
    default:
      baslangic = new Date(now.setMonth(now.getMonth() - 1));
  }
  
  const filtreliSiparisler = siparisler.filter(s => 
    new Date(s.olusturmaTarihi) >= baslangic
  );
  
  const toplamSatis = filtreliSiparisler.length;
  const toplamGelir = filtreliSiparisler.reduce((sum, s) => sum + s.toplamTutar, 0);
  const ortalamaSepetutu = toplamSatis > 0 ? toplamGelir / toplamSatis : 0;
  
  // Günlük dağılım
  const gunlukDagilim = {};
  filtreliSiparisler.forEach(s => {
    const gun = new Date(s.olusturmaTarihi).toLocaleDateString('tr-TR');
    if (!gunlukDagilim[gun]) {
      gunlukDagilim[gun] = { adet: 0, tutar: 0 };
    }
    gunlukDagilim[gun].adet++;
    gunlukDagilim[gun].tutar += s.toplamTutar;
  });
  
  res.json({
    basarili: true,
    period,
    toplamSatis,
    toplamGelir: toplamGelir.toFixed(2),
    ortalamaSepet: ortalamaSepetutu.toFixed(2),
    gunlukDagilim
  });
});

// En Çok Satan Ürünler
app.get('/api/admin/rapor/en-cok-satanlar', (req, res) => {
  const { limit } = req.query;
  
  const urunSatislari = {};
  
  siparisler.forEach(siparis => {
    siparis.urunler.forEach(urun => {
      if (!urunSatislari[urun.id]) {
        urunSatislari[urun.id] = {
          urun: urun,
          adet: 0,
          gelir: 0
        };
      }
      urunSatislari[urun.id].adet++;
      urunSatislari[urun.id].gelir += urun.fiyat;
    });
  });
  
  const sirali = Object.values(urunSatislari)
    .sort((a, b) => b.adet - a.adet)
    .slice(0, parseInt(limit) || 10);
  
  res.json({
    basarili: true,
    enCokSatanlar: sirali
  });
});

// Kategori Bazlı Satışlar
app.get('/api/admin/rapor/kategori-satis', (req, res) => {
  const kategoriSatislari = {};
  
  siparisler.forEach(siparis => {
    siparis.urunler.forEach(urun => {
      const kategori = urun.kategori;
      if (!kategoriSatislari[kategori]) {
        kategoriSatislari[kategori] = {
          kategori,
          adet: 0,
          gelir: 0
        };
      }
      kategoriSatislari[kategori].adet++;
      kategoriSatislari[kategori].gelir += urun.fiyat;
    });
  });
  
  const sirali = Object.values(kategoriSatislari)
    .sort((a, b) => b.gelir - a.gelir);
  
  res.json({
    basarili: true,
    kategoriSatislari: sirali
  });
});

// Gelir Grafiği (Son 30 gün)
app.get('/api/admin/rapor/gelir-grafik', (req, res) => {
  const son30Gun = [];
  const bugun = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const tarih = new Date(bugun);
    tarih.setDate(tarih.getDate() - i);
    const tarihStr = tarih.toLocaleDateString('tr-TR');
    
    const gunlukSiparisler = siparisler.filter(s => {
      const siparisTarih = new Date(s.olusturmaTarihi).toLocaleDateString('tr-TR');
      return siparisTarih === tarihStr;
    });
    
    const gunlukGelir = gunlukSiparisler.reduce((sum, s) => sum + s.toplamTutar, 0);
    
    son30Gun.push({
      tarih: tarihStr,
      gelir: gunlukGelir,
      siparisSayisi: gunlukSiparisler.length
    });
  }
  
  res.json({
    basarili: true,
    grafik: son30Gun
  });
});

// ============================================
// 16. MÜŞTERİ SEGMENTASYONU
// ============================================

// Müşteri Segmentleri
app.get('/api/admin/musteri-segmentleri', (req, res) => {
  const segmentler = {
    vip: [],      // 5+ sipariş veya 5000+ TL harcama
    sadik: [],    // 3-4 sipariş
    yeni: [],     // 1-2 sipariş
    pasif: []     // 90+ gün sipariş yok
  };
  
  const bugun = new Date();
  
  kullanicilar.forEach(kullanici => {
    const kullaniciSiparisleri = siparisler.filter(s => s.kullaniciId === kullanici.id);
    const siparisSayisi = kullaniciSiparisleri.length;
    const toplamHarcama = kullaniciSiparisleri.reduce((sum, s) => sum + s.toplamTutar, 0);
    
    // Son sipariş tarihi
    const sonSiparis = kullaniciSiparisleri.length > 0 
      ? new Date(Math.max(...kullaniciSiparisleri.map(s => new Date(s.olusturmaTarihi))))
      : null;
    
    const gunFarki = sonSiparis 
      ? Math.floor((bugun - sonSiparis) / (1000 * 60 * 60 * 24))
      : 999;
    
    const musteriData = {
      ...kullanici,
      siparisSayisi,
      toplamHarcama: toplamHarcama.toFixed(2),
      sonSiparisTarihi: sonSiparis,
      gunFarki
    };
    
    // Segmentlere ayır
    if (siparisSayisi >= 5 || toplamHarcama >= 5000) {
      segmentler.vip.push(musteriData);
    } else if (siparisSayisi >= 3) {
      segmentler.sadik.push(musteriData);
    } else if (siparisSayisi >= 1 && gunFarki <= 90) {
      segmentler.yeni.push(musteriData);
    } else if (gunFarki > 90) {
      segmentler.pasif.push(musteriData);
    }
  });
  
  res.json({
    basarili: true,
    segmentler: {
      vip: { adet: segmentler.vip.length, musteriler: segmentler.vip },
      sadik: { adet: segmentler.sadik.length, musteriler: segmentler.sadik },
      yeni: { adet: segmentler.yeni.length, musteriler: segmentler.yeni },
      pasif: { adet: segmentler.pasif.length, musteriler: segmentler.pasif }
    }
  });
});

// Müşteri Detay Analizi
app.get('/api/admin/musteri-analiz/:id', (req, res) => {
  const { id } = req.params;
  const kullanici = kullanicilar.find(k => k.id === id);
  
  if (!kullanici) {
    return res.status(404).json({ basarili: false, mesaj: 'Müşteri bulunamadı' });
  }
  
  const kullaniciSiparisleri = siparisler.filter(s => s.kullaniciId === id);
  const toplamHarcama = kullaniciSiparisleri.reduce((sum, s) => sum + s.toplamTutar, 0);
  const ortalamaSepet = kullaniciSiparisleri.length > 0 
    ? toplamHarcama / kullaniciSiparisleri.length 
    : 0;
  
  // En çok aldığı kategoriler
  const kategoriTercihleri = {};
  kullaniciSiparisleri.forEach(siparis => {
    siparis.urunler.forEach(urun => {
      kategoriTercihleri[urun.kategori] = (kategoriTercihleri[urun.kategori] || 0) + 1;
    });
  });
  
  res.json({
    basarili: true,
    kullanici,
    istatistikler: {
      siparisSayisi: kullaniciSiparisleri.length,
      toplamHarcama: toplamHarcama.toFixed(2),
      ortalamaSepet: ortalamaSepet.toFixed(2),
      kategoriTercihleri,
      sonSiparisler: kullaniciSiparisleri.slice(-5).reverse()
    }
  });
});

// Segment'e Toplu Email/SMS Gönder
app.post('/api/admin/segment-bildirim', (req, res) => {
  const { segment, tip, mesaj } = req.body; // segment: 'vip', 'sadik', 'yeni', 'pasif'
  
  // Segment müşterilerini al
  // Email veya SMS gönder
  
  console.log(`📧 ${segment} segmentine ${tip} gönderildi: ${mesaj}`);
  
  res.json({
    basarili: true,
    mesaj: `${segment} segmentine bildirim gönderildi`,
    gonderimSayisi: 0 // Simülasyon
  });
});

// ============================================
// 17. ÇOKLU DİL DESTEĞİ (Geliştirilmiş)
// ============================================

const dilMetinleri = {
  tr: {
    // Genel
    'site_title': 'Kıyafet Mağazası',
    'welcome': 'Hoş Geldiniz',
    'search': 'Ara',
    'login': 'Giriş Yap',
    'register': 'Kayıt Ol',
    'logout': 'Çıkış Yap',
    
    // Ürünler
    'products': 'Ürünler',
    'all_products': 'Tüm Ürünler',
    'product_detail': 'Ürün Detayı',
    'add_to_cart': 'Sepete Ekle',
    'buy_now': 'Hemen Al',
    'out_of_stock': 'Stokta Yok',
    'in_stock': 'Stokta Var',
    
    // Sepet
    'cart': 'Sepet',
    'my_cart': 'Sepetim',
    'cart_empty': 'Sepetiniz boş',
    'continue_shopping': 'Alışverişe Devam',
    'checkout': 'Ödeme',
    'total': 'Toplam',
    'subtotal': 'Ara Toplam',
    'shipping': 'Kargo',
    'free_shipping': 'Ücretsiz Kargo',
    
    // Sipariş
    'order': 'Sipariş',
    'my_orders': 'Siparişlerim',
    'order_success': 'Siparişiniz alındı',
    'order_number': 'Sipariş Numarası',
    'order_date': 'Sipariş Tarihi',
    'order_status': 'Sipariş Durumu',
    
    // Kategoriler
    'categories': 'Kategoriler',
    'all': 'Tümü',
    'dress': 'Elbise',
    'pants': 'Pantolon',
    'shirt': 'Gömlek',
    'jacket': 'Ceket',
    'shoes': 'Ayakkabı',
    'accessories': 'Aksesuar',
    'sports': 'Spor',
    
    // Kampanya
    'campaigns': 'Kampanyalar',
    'discount': 'İndirim',
    'special_offer': 'Özel Teklif',
    
    // Kupon
    'coupon': 'Kupon',
    'apply_coupon': 'Kupon Uygula',
    'coupon_applied': 'Kupon uygulandı',
    'invalid_coupon': 'Geçersiz kupon',
    
    // Hesap
    'account': 'Hesabım',
    'profile': 'Profil',
    'favorites': 'Favorilerim',
    'addresses': 'Adreslerim',
    
    // Form
    'name': 'Ad',
    'surname': 'Soyad',
    'email': 'E-posta',
    'phone': 'Telefon',
    'password': 'Şifre',
    'address': 'Adres',
    'city': 'Şehir',
    'save': 'Kaydet',
    'cancel': 'İptal',
    'delete': 'Sil',
    'edit': 'Düzenle',
    
    // Mesajlar
    'success': 'Başarılı',
    'error': 'Hata',
    'loading': 'Yükleniyor',
    'no_results': 'Sonuç bulunamadı'
  },
  en: {
    // General
    'site_title': 'Clothing Store',
    'welcome': 'Welcome',
    'search': 'Search',
    'login': 'Login',
    'register': 'Register',
    'logout': 'Logout',
    
    // Products
    'products': 'Products',
    'all_products': 'All Products',
    'product_detail': 'Product Detail',
    'add_to_cart': 'Add to Cart',
    'buy_now': 'Buy Now',
    'out_of_stock': 'Out of Stock',
    'in_stock': 'In Stock',
    
    // Cart
    'cart': 'Cart',
    'my_cart': 'My Cart',
    'cart_empty': 'Your cart is empty',
    'continue_shopping': 'Continue Shopping',
    'checkout': 'Checkout',
    'total': 'Total',
    'subtotal': 'Subtotal',
    'shipping': 'Shipping',
    'free_shipping': 'Free Shipping',
    
    // Order
    'order': 'Order',
    'my_orders': 'My Orders',
    'order_success': 'Order received',
    'order_number': 'Order Number',
    'order_date': 'Order Date',
    'order_status': 'Order Status',
    
    // Categories
    'categories': 'Categories',
    'all': 'All',
    'dress': 'Dress',
    'pants': 'Pants',
    'shirt': 'Shirt',
    'jacket': 'Jacket',
    'shoes': 'Shoes',
    'accessories': 'Accessories',
    'sports': 'Sports',
    
    // Campaign
    'campaigns': 'Campaigns',
    'discount': 'Discount',
    'special_offer': 'Special Offer',
    
    // Coupon
    'coupon': 'Coupon',
    'apply_coupon': 'Apply Coupon',
    'coupon_applied': 'Coupon applied',
    'invalid_coupon': 'Invalid coupon',
    
    // Account
    'account': 'My Account',
    'profile': 'Profile',
    'favorites': 'Favorites',
    'addresses': 'Addresses',
    
    // Form
    'name': 'Name',
    'surname': 'Surname',
    'email': 'Email',
    'phone': 'Phone',
    'password': 'Password',
    'address': 'Address',
    'city': 'City',
    'save': 'Save',
    'cancel': 'Cancel',
    'delete': 'Delete',
    'edit': 'Edit',
    
    // Messages
    'success': 'Success',
    'error': 'Error',
    'loading': 'Loading',
    'no_results': 'No results found'
  }
};

// Dil metinlerini getir
app.get('/api/dil/:kod', (req, res) => {
  const { kod } = req.params;
  const metinler = dilMetinleri[kod] || dilMetinleri['tr'];
  
  res.json({
    basarili: true,
    dil: kod,
    metinler
  });
});

// Desteklenen diller
app.get('/api/diller', (req, res) => {
  res.json({
    basarili: true,
    diller: [
      { kod: 'tr', ad: 'Türkçe', bayrak: '🇹🇷' },
      { kod: 'en', ad: 'English', bayrak: '🇬🇧' }
    ]
  });
});

console.log('✅ Tüm yeni özellikler yüklendi!');
console.log('📦 Kupon kodları: HOSGELDIN, YENISEZON, 50TL');
console.log('📧 Email bildirimleri: Aktif (simülasyon)');
console.log('📱 SMS entegrasyonu: Aktif (simülasyon)');
console.log('📸 Resim upload: Aktif (base64)');
console.log('📊 Gelişmiş raporlama: Aktif');
console.log('👥 Müşteri segmentasyonu: Aktif');
console.log('🌍 Çoklu dil desteği: Türkçe, English');
