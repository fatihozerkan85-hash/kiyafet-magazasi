const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Bağlantısı - Vercel için optimize edilmiş ayarlar
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000, // 30 saniye timeout
  socketTimeoutMS: 45000,
  family: 4 // IPv4 kullan (Vercel uyumluluğu için)
})
  .then(() => console.log('✅ MongoDB Atlas\'a bağlandı!'))
  .catch(err => console.error('❌ MongoDB bağlantı hatası:', err));

// CORS ayarları
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://kiyafet-magazasi.vercel.app',
      'https://www.aslbutique.com.tr',
      'https://aslbutique.com.tr',
      'http://www.aslbutique.com.tr',
      'http://aslbutique.com.tr'
    ];
    
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

// ============================================
// MONGOOSE SCHEMAS
// ============================================

// Kategori Schema
const kategoriSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  adEn: { type: String, required: true },
  emoji: String,
  resim: String,
  sira: { type: Number, default: 0 },
  aktif: { type: Boolean, default: true }
}, { timestamps: true });

const Kategori = mongoose.model('Kategori', kategoriSchema);

// Ürün Schema
const urunSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  adEn: String,
  aciklama: String,
  aciklamaEn: String,
  fiyat: { type: Number, required: true },
  eskiFiyat: Number,
  kategori: { type: String, required: true },
  beden: [String],
  renk: [String],
  resimler: [String],
  stokDurumu: { type: Boolean, default: true },
  marka: String
}, { timestamps: true });

const Urun = mongoose.model('Urun', urunSchema);

// Kampanya Schema
const kampanyaSchema = new mongoose.Schema({
  baslik: { type: String, required: true },
  aciklama: String,
  resim: String,
  link: String,
  aktif: { type: Boolean, default: true },
  baslangicTarihi: Date,
  bitisTarihi: Date,
  renk: String,
  sira: { type: Number, default: 0 }
}, { timestamps: true });

const Kampanya = mongoose.model('Kampanya', kampanyaSchema);

// Kupon Schema
const kuponSchema = new mongoose.Schema({
  kod: { type: String, required: true, unique: true },
  indirimTipi: { type: String, enum: ['yuzde', 'sabit'], required: true },
  indirimMiktari: { type: Number, required: true },
  aktif: { type: Boolean, default: true },
  kullanimSayisi: { type: Number, default: 0 },
  maxKullanim: Number,
  minSepetTutari: Number,
  baslangicTarihi: Date,
  bitisTarihi: Date
}, { timestamps: true });

const Kupon = mongoose.model('Kupon', kuponSchema);

// Kullanıcı Schema
const kullaniciSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  sifre: { type: String, required: true },
  ad: String,
  soyad: String,
  telefon: String,
  adres: String,
  rol: { type: String, enum: ['musteri', 'admin'], default: 'musteri' }
}, { timestamps: true });

const Kullanici = mongoose.model('Kullanici', kullaniciSchema);

// Sipariş Schema
const siparisSchema = new mongoose.Schema({
  kullaniciId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kullanici' },
  urunler: [{
    urunId: { type: mongoose.Schema.Types.ObjectId, ref: 'Urun' },
    ad: String,
    fiyat: Number,
    adet: Number,
    beden: String,
    renk: String
  }],
  toplamTutar: { type: Number, required: true },
  durum: { type: String, enum: ['beklemede', 'onaylandi', 'kargoda', 'teslim edildi', 'iptal'], default: 'beklemede' },
  adres: String,
  telefon: String,
  odemeTipi: String,
  kuponKodu: String,
  indirimTutari: Number
}, { timestamps: true });

const Siparis = mongoose.model('Siparis', siparisSchema);

// ============================================
// SEED DATA - İlk Kurulumda Veri Ekle
// ============================================
async function seedData() {
  try {
    // Kategori sayısını kontrol et
    const kategoriCount = await Kategori.countDocuments();
    
    if (kategoriCount === 0) {
      console.log('📦 Başlangıç verileri ekleniyor...');
      
      // Kategoriler
      await Kategori.insertMany([
        { ad: 'Tümü', adEn: 'All', emoji: '🛍️', resim: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop', sira: 1, aktif: true },
        { ad: 'Elbise', adEn: 'Dress', emoji: '👗', resim: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop', sira: 2, aktif: true },
        { ad: 'Pantolon', adEn: 'Pants', emoji: '👖', resim: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=300&fit=crop', sira: 3, aktif: true },
        { ad: 'Gömlek', adEn: 'Shirt', emoji: '👔', resim: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop', sira: 4, aktif: true },
        { ad: 'Ceket', adEn: 'Jacket', emoji: '🧥', resim: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', sira: 5, aktif: true },
        { ad: 'Ayakkabı', adEn: 'Shoes', emoji: '👟', resim: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop', sira: 6, aktif: true },
        { ad: 'Aksesuar', adEn: 'Accessories', emoji: '👜', resim: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=300&fit=crop', sira: 7, aktif: true },
        { ad: 'Spor', adEn: 'Sports', emoji: '🏃', resim: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop', sira: 8, aktif: true }
      ]);

      // Kampanyalar
      await Kampanya.insertMany([
        {
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
      ]);
      
      // Örnek Ürünler
      await Urun.insertMany([
        {
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
        }
      ]);
      
      // Kuponlar
      await Kupon.insertMany([
        { kod: 'HOSGELDIN', indirimTipi: 'yuzde', indirimMiktari: 10, aktif: true, kullanimSayisi: 0 },
        { kod: 'YENISEZON', indirimTipi: 'yuzde', indirimMiktari: 15, aktif: true, kullanimSayisi: 0 },
        { kod: '50TL', indirimTipi: 'sabit', indirimMiktari: 50, aktif: true, kullanimSayisi: 0 }
      ]);
      
      console.log('✅ Başlangıç verileri eklendi!');
    }
  } catch (error) {
    console.error('❌ Seed data hatası:', error);
  }
}

// MongoDB bağlantısı kurulduktan sonra seed data çalıştır
mongoose.connection.once('open', () => {
  seedData();
});

// ============================================
// API ENDPOINTS
// ============================================

// Ürünler
app.get('/api/urunler', async (req, res) => {
  try {
    const { kategori, minFiyat, maxFiyat } = req.query;
    let query = {};
    
    if (kategori && kategori !== 'Tümü') {
      query.kategori = kategori;
    }
    
    if (minFiyat || maxFiyat) {
      query.fiyat = {};
      if (minFiyat) query.fiyat.$gte = parseFloat(minFiyat);
      if (maxFiyat) query.fiyat.$lte = parseFloat(maxFiyat);
    }
    
    const urunler = await Urun.find(query);
    res.json(urunler);
  } catch (error) {
    res.status(500).json({ mesaj: 'Ürünler getirilemedi', hata: error.message });
  }
});

app.get('/api/urunler/:id', async (req, res) => {
  try {
    const urun = await Urun.findById(req.params.id);
    if (urun) {
      res.json(urun);
    } else {
      res.status(404).json({ mesaj: 'Ürün bulunamadı' });
    }
  } catch (error) {
    res.status(500).json({ mesaj: 'Ürün getirilemedi', hata: error.message });
  }
});

// Kategoriler
app.get('/api/kategoriler', async (req, res) => {
  try {
    const kategoriler = await Kategori.find({ aktif: true }).sort({ sira: 1 });
    res.json(kategoriler);
  } catch (error) {
    res.status(500).json({ mesaj: 'Kategoriler getirilemedi', hata: error.message });
  }
});

// Kampanyalar (Müşteri)
app.get('/api/kampanyalar', async (req, res) => {
  try {
    const kampanyalar = await Kampanya.find({ aktif: true }).sort({ sira: 1 });
    res.json(kampanyalar);
  } catch (error) {
    res.status(500).json({ mesaj: 'Kampanyalar getirilemedi', hata: error.message });
  }
});

// ============================================
// ADMIN ENDPOINTS - Kategoriler
// ============================================

app.get('/api/admin/kategoriler', async (req, res) => {
  try {
    const kategoriler = await Kategori.find().sort({ sira: 1 });
    res.json(kategoriler);
  } catch (error) {
    res.status(500).json({ mesaj: 'Kategoriler getirilemedi', hata: error.message });
  }
});

app.post('/api/admin/kategori', async (req, res) => {
  try {
    const { ad, adEn, emoji, resim } = req.body;
    const kategoriCount = await Kategori.countDocuments();
    
    const yeniKategori = new Kategori({
      ad,
      adEn,
      emoji,
      resim,
      sira: kategoriCount + 1,
      aktif: true
    });
    
    await yeniKategori.save();
    res.json({ basarili: true, mesaj: 'Kategori eklendi', kategori: yeniKategori });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kategori eklenemedi', hata: error.message });
  }
});

app.put('/api/admin/kategori/:id', async (req, res) => {
  try {
    const { ad, adEn, emoji, resim, aktif, sira } = req.body;
    const kategori = await Kategori.findByIdAndUpdate(
      req.params.id,
      { ad, adEn, emoji, resim, aktif, sira },
      { new: true }
    );
    
    if (!kategori) {
      return res.status(404).json({ basarili: false, mesaj: 'Kategori bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Kategori güncellendi', kategori });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kategori güncellenemedi', hata: error.message });
  }
});

app.delete('/api/admin/kategori/:id', async (req, res) => {
  try {
    const kategori = await Kategori.findByIdAndDelete(req.params.id);
    
    if (!kategori) {
      return res.status(404).json({ basarili: false, mesaj: 'Kategori bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Kategori silindi' });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kategori silinemedi', hata: error.message });
  }
});

// ============================================
// ADMIN ENDPOINTS - Kampanyalar
// ============================================

app.get('/api/admin/kampanyalar', async (req, res) => {
  try {
    const kampanyalar = await Kampanya.find().sort({ sira: 1 });
    res.json(kampanyalar);
  } catch (error) {
    res.status(500).json({ mesaj: 'Kampanyalar getirilemedi', hata: error.message });
  }
});

app.post('/api/admin/kampanya', async (req, res) => {
  try {
    const { baslik, aciklama, resim, link, baslangicTarihi, bitisTarihi, renk } = req.body;
    const kampanyaCount = await Kampanya.countDocuments();
    
    const yeniKampanya = new Kampanya({
      baslik,
      aciklama,
      resim,
      link: link || '/kategori/Tümü',
      aktif: true,
      baslangicTarihi: new Date(baslangicTarihi),
      bitisTarihi: new Date(bitisTarihi),
      renk: renk || '#667eea',
      sira: kampanyaCount + 1
    });
    
    await yeniKampanya.save();
    res.json({ basarili: true, mesaj: 'Kampanya eklendi', kampanya: yeniKampanya });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kampanya eklenemedi', hata: error.message });
  }
});

app.put('/api/admin/kampanya/:id', async (req, res) => {
  try {
    const { baslik, aciklama, resim, link, aktif, baslangicTarihi, bitisTarihi, renk, sira } = req.body;
    const updateData = {};
    
    if (baslik) updateData.baslik = baslik;
    if (aciklama) updateData.aciklama = aciklama;
    if (resim) updateData.resim = resim;
    if (link) updateData.link = link;
    if (typeof aktif !== 'undefined') updateData.aktif = aktif;
    if (baslangicTarihi) updateData.baslangicTarihi = new Date(baslangicTarihi);
    if (bitisTarihi) updateData.bitisTarihi = new Date(bitisTarihi);
    if (renk) updateData.renk = renk;
    if (sira) updateData.sira = sira;
    
    const kampanya = await Kampanya.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!kampanya) {
      return res.status(404).json({ basarili: false, mesaj: 'Kampanya bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Kampanya güncellendi', kampanya });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kampanya güncellenemedi', hata: error.message });
  }
});

app.delete('/api/admin/kampanya/:id', async (req, res) => {
  try {
    const kampanya = await Kampanya.findByIdAndDelete(req.params.id);
    
    if (!kampanya) {
      return res.status(404).json({ basarili: false, mesaj: 'Kampanya bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Kampanya silindi' });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kampanya silinemedi', hata: error.message });
  }
});

app.patch('/api/admin/kampanya/:id/toggle', async (req, res) => {
  try {
    const kampanya = await Kampanya.findById(req.params.id);
    
    if (!kampanya) {
      return res.status(404).json({ basarili: false, mesaj: 'Kampanya bulunamadı' });
    }
    
    kampanya.aktif = !kampanya.aktif;
    await kampanya.save();
    
    res.json({ basarili: true, mesaj: 'Kampanya durumu değiştirildi', kampanya });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kampanya durumu değiştirilemedi', hata: error.message });
  }
});

// ============================================
// ADMIN ENDPOINTS - Ürünler
// ============================================

app.get('/api/admin/urunler', async (req, res) => {
  try {
    const urunler = await Urun.find().sort({ createdAt: -1 });
    res.json(urunler);
  } catch (error) {
    res.status(500).json({ mesaj: 'Ürünler getirilemedi', hata: error.message });
  }
});

app.post('/api/admin/urun', async (req, res) => {
  try {
    const yeniUrun = new Urun(req.body);
    await yeniUrun.save();
    res.json({ basarili: true, mesaj: 'Ürün eklendi', urun: yeniUrun });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Ürün eklenemedi', hata: error.message });
  }
});

app.put('/api/admin/urun/:id', async (req, res) => {
  try {
    const urun = await Urun.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!urun) {
      return res.status(404).json({ basarili: false, mesaj: 'Ürün bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Ürün güncellendi', urun });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Ürün güncellenemedi', hata: error.message });
  }
});

app.delete('/api/admin/urun/:id', async (req, res) => {
  try {
    const urun = await Urun.findByIdAndDelete(req.params.id);
    
    if (!urun) {
      return res.status(404).json({ basarili: false, mesaj: 'Ürün bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Ürün silindi' });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Ürün silinemedi', hata: error.message });
  }
});

// ============================================
// KUPON ENDPOINTS
// ============================================

app.post('/api/kupon/kontrol', async (req, res) => {
  try {
    const { kod } = req.body;
    const kupon = await Kupon.findOne({ kod: kod.toUpperCase(), aktif: true });
    
    if (!kupon) {
      return res.json({ gecerli: false, mesaj: 'Geçersiz kupon kodu' });
    }
    
    res.json({
      gecerli: true,
      kupon: {
        kod: kupon.kod,
        indirimTipi: kupon.indirimTipi,
        indirimMiktari: kupon.indirimMiktari
      }
    });
  } catch (error) {
    res.status(500).json({ gecerli: false, mesaj: 'Kupon kontrol edilemedi', hata: error.message });
  }
});

// ============================================
// SİPARİŞ ENDPOINTS
// ============================================

app.post('/api/siparis', async (req, res) => {
  try {
    const yeniSiparis = new Siparis(req.body);
    await yeniSiparis.save();
    res.json({ mesaj: 'Siparişiniz alındı', siparisId: yeniSiparis._id });
  } catch (error) {
    res.status(500).json({ mesaj: 'Sipariş oluşturulamadı', hata: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    durum: 'çalışıyor', 
    zaman: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'bağlı' : 'bağlı değil'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    mesaj: 'Kıyafet Mağazası Backend API',
    version: '2.0.0',
    database: 'MongoDB Atlas'
  });
});

// Server başlat
app.listen(PORT, () => {
  console.log(`🚀 Backend sunucusu http://localhost:${PORT} adresinde çalışıyor`);
});

module.exports = app;
