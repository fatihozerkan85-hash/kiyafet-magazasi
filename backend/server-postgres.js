const express = require('express');
const cors = require('cors');
const { sql } = require('@vercel/postgres');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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
// DATABASE INITIALIZATION
// ============================================
async function initDatabase() {
  try {
    console.log('📦 Veritabanı tabloları kontrol ediliyor...');
    
    // Kategoriler tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS kategoriler (
        id SERIAL PRIMARY KEY,
        ad VARCHAR(100) NOT NULL,
        ad_en VARCHAR(100) NOT NULL,
        emoji VARCHAR(10),
        resim TEXT,
        sira INTEGER DEFAULT 0,
        aktif BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Ürünler tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS urunler (
        id SERIAL PRIMARY KEY,
        ad VARCHAR(200) NOT NULL,
        ad_en VARCHAR(200),
        aciklama TEXT,
        aciklama_en TEXT,
        fiyat DECIMAL(10,2) NOT NULL,
        eski_fiyat DECIMAL(10,2),
        kategori VARCHAR(100) NOT NULL,
        beden TEXT[],
        renk TEXT[],
        resimler TEXT[],
        stok_durumu BOOLEAN DEFAULT true,
        marka VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Kampanyalar tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS kampanyalar (
        id SERIAL PRIMARY KEY,
        baslik VARCHAR(200) NOT NULL,
        aciklama TEXT,
        resim TEXT,
        link VARCHAR(200),
        aktif BOOLEAN DEFAULT true,
        baslangic_tarihi TIMESTAMP,
        bitis_tarihi TIMESTAMP,
        renk VARCHAR(20),
        sira INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Kuponlar tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS kuponlar (
        id SERIAL PRIMARY KEY,
        kod VARCHAR(50) UNIQUE NOT NULL,
        indirim_tipi VARCHAR(20) NOT NULL,
        indirim_miktari DECIMAL(10,2) NOT NULL,
        aktif BOOLEAN DEFAULT true,
        kullanim_sayisi INTEGER DEFAULT 0,
        max_kullanim INTEGER,
        min_sepet_tutari DECIMAL(10,2),
        baslangic_tarihi TIMESTAMP,
        bitis_tarihi TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Kullanıcılar tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS kullanicilar (
        id SERIAL PRIMARY KEY,
        email VARCHAR(200) UNIQUE NOT NULL,
        sifre VARCHAR(200) NOT NULL,
        ad VARCHAR(100),
        soyad VARCHAR(100),
        telefon VARCHAR(20),
        adres TEXT,
        rol VARCHAR(20) DEFAULT 'musteri',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Siparişler tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS siparisler (
        id SERIAL PRIMARY KEY,
        kullanici_id INTEGER REFERENCES kullanicilar(id),
        toplam_tutar DECIMAL(10,2) NOT NULL,
        durum VARCHAR(50) DEFAULT 'beklemede',
        adres TEXT,
        telefon VARCHAR(20),
        odeme_tipi VARCHAR(50),
        kupon_kodu VARCHAR(50),
        indirim_tutari DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Sipariş ürünleri tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS siparis_urunler (
        id SERIAL PRIMARY KEY,
        siparis_id INTEGER REFERENCES siparisler(id) ON DELETE CASCADE,
        urun_id INTEGER REFERENCES urunler(id),
        ad VARCHAR(200),
        fiyat DECIMAL(10,2),
        adet INTEGER,
        beden VARCHAR(20),
        renk VARCHAR(50)
      )
    `;

    console.log('✅ Veritabanı tabloları hazır!');
    
    // Başlangıç verilerini kontrol et ve ekle
    await seedData();
    
  } catch (error) {
    console.error('❌ Veritabanı başlatma hatası:', error);
  }
}

// ============================================
// SEED DATA - İlk Kurulumda Veri Ekle
// ============================================
async function seedData() {
  try {
    // Kategori sayısını kontrol et
    const { rows: kategoriler } = await sql`SELECT COUNT(*) as count FROM kategoriler`;
    
    if (parseInt(kategoriler[0].count) === 0) {
      console.log('📦 Başlangıç verileri ekleniyor...');
      
      // Kategoriler
      await sql`
        INSERT INTO kategoriler (ad, ad_en, emoji, resim, sira, aktif) VALUES
        ('Tümü', 'All', '🛍️', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop', 1, true),
        ('Elbise', 'Dress', '👗', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop', 2, true),
        ('Pantolon', 'Pants', '👖', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=300&fit=crop', 3, true),
        ('Gömlek', 'Shirt', '👔', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop', 4, true),
        ('Ceket', 'Jacket', '🧥', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', 5, true),
        ('Ayakkabı', 'Shoes', '👟', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop', 6, true),
        ('Aksesuar', 'Accessories', '👜', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=300&fit=crop', 7, true),
        ('Spor', 'Sports', '🏃', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop', 8, true)
      `;

      // Kampanyalar
      await sql`
        INSERT INTO kampanyalar (baslik, aciklama, resim, link, aktif, baslangic_tarihi, bitis_tarihi, renk, sira) VALUES
        ('❄️ KIŞ SEZONUNUN SON FIRSATLARI', 'Tüm kış ürünlerinde %70''e varan indirimler', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=500&fit=crop', '/kategori/Ceket', true, '2024-03-01', '2024-03-31', '#2c3e50', 1),
        ('👗 Yeni Sezon Koleksiyonu', 'En yeni trendler şimdi mağazamızda', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=500&fit=crop', '/kategori/Elbise', true, '2024-03-01', '2024-04-30', '#e74c3c', 2),
        ('🚚 Ücretsiz Kargo', '200 TL ve üzeri alışverişlerde kargo bedava', 'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=1920&h=500&fit=crop', '/kategori/Tümü', true, '2024-03-01', '2024-12-31', '#28a745', 3)
      `;

      // Örnek Ürünler
      await sql`
        INSERT INTO urunler (ad, ad_en, aciklama, aciklama_en, fiyat, eski_fiyat, kategori, beden, renk, resimler, stok_durumu, marka) VALUES
        ('Çiçek Desenli Elbise', 'Floral Dress', 'Yazlık çiçek desenli şık elbise', 'Stylish summer floral dress', 299.99, 399.99, 'Elbise', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Mavi', 'Pembe', 'Beyaz'], ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop'], true, 'Moda Dünyası'),
        ('Klasik Jean Pantolon', 'Classic Jeans', 'Rahat kesim kot pantolon', 'Comfortable fit denim pants', 199.99, NULL, 'Pantolon', ARRAY['36', '38', '40', '42'], ARRAY['Mavi', 'Siyah'], ARRAY['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop'], true, 'Denim Co'),
        ('Beyaz Gömlek', 'White Shirt', 'Ofis için ideal şık gömlek', 'Elegant shirt ideal for office', 149.99, 199.99, 'Gömlek', ARRAY['S', 'M', 'L'], ARRAY['Beyaz', 'Siyah', 'Krem'], ARRAY['https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=600&fit=crop'], true, 'Elegant Style'),
        ('Deri Ceket', 'Leather Jacket', 'Suni deri şık ceket', 'Stylish faux leather jacket', 599.99, NULL, 'Ceket', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Siyah', 'Kahverengi'], ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop'], true, 'Leather Style'),
        ('Spor Ayakkabı', 'Sports Shoes', 'Rahat günlük spor ayakkabı', 'Comfortable daily sports shoes', 349.99, NULL, 'Ayakkabı', ARRAY['38', '39', '40', '41', '42', '43'], ARRAY['Beyaz', 'Siyah', 'Gri'], ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop'], true, 'Sport Pro')
      `;
      
      // Kuponlar
      await sql`
        INSERT INTO kuponlar (kod, indirim_tipi, indirim_miktari, aktif, kullanim_sayisi) VALUES
        ('HOSGELDIN', 'yuzde', 10, true, 0),
        ('YENISEZON', 'yuzde', 15, true, 0),
        ('50TL', 'sabit', 50, true, 0)
      `;
      
      console.log('✅ Başlangıç verileri eklendi!');
    }
  } catch (error) {
    console.error('❌ Seed data hatası:', error);
  }
}

// Uygulama başladığında veritabanını başlat
initDatabase();

// ============================================
// API ENDPOINTS - Ürünler
// ============================================

app.get('/api/urunler', async (req, res) => {
  try {
    const { kategori, minFiyat, maxFiyat } = req.query;
    let query = 'SELECT * FROM urunler WHERE 1=1';
    const params = [];
    
    if (kategori && kategori !== 'Tümü') {
      params.push(kategori);
      query += ` AND kategori = $${params.length}`;
    }
    
    if (minFiyat) {
      params.push(parseFloat(minFiyat));
      query += ` AND fiyat >= $${params.length}`;
    }
    
    if (maxFiyat) {
      params.push(parseFloat(maxFiyat));
      query += ` AND fiyat <= $${params.length}`;
    }
    
    query += ' ORDER BY created_at DESC';
    
    const { rows } = await sql.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mesaj: 'Ürünler getirilemedi', hata: error.message });
  }
});

app.get('/api/urunler/:id', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM urunler WHERE id = ${req.params.id}`;
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ mesaj: 'Ürün bulunamadı' });
    }
  } catch (error) {
    res.status(500).json({ mesaj: 'Ürün getirilemedi', hata: error.message });
  }
});

// ============================================
// API ENDPOINTS - Kategoriler
// ============================================

app.get('/api/kategoriler', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM kategoriler WHERE aktif = true ORDER BY sira`;
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mesaj: 'Kategoriler getirilemedi', hata: error.message });
  }
});

// ============================================
// API ENDPOINTS - Kampanyalar (Müşteri)
// ============================================

app.get('/api/kampanyalar', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM kampanyalar WHERE aktif = true ORDER BY sira`;
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mesaj: 'Kampanyalar getirilemedi', hata: error.message });
  }
});

// ============================================
// ADMIN ENDPOINTS - Kategoriler
// ============================================

app.get('/api/admin/kategoriler', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM kategoriler ORDER BY sira`;
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mesaj: 'Kategoriler getirilemedi', hata: error.message });
  }
});

app.post('/api/admin/kategori', async (req, res) => {
  try {
    const { ad, adEn, emoji, resim } = req.body;
    const { rows: countRows } = await sql`SELECT COUNT(*) as count FROM kategoriler`;
    const sira = parseInt(countRows[0].count) + 1;
    
    const { rows } = await sql`
      INSERT INTO kategoriler (ad, ad_en, emoji, resim, sira, aktif)
      VALUES (${ad}, ${adEn}, ${emoji}, ${resim}, ${sira}, true)
      RETURNING *
    `;
    
    res.json({ basarili: true, mesaj: 'Kategori eklendi', kategori: rows[0] });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kategori eklenemedi', hata: error.message });
  }
});

app.put('/api/admin/kategori/:id', async (req, res) => {
  try {
    const { ad, adEn, emoji, resim, aktif, sira } = req.body;
    const { rows } = await sql`
      UPDATE kategoriler 
      SET ad = ${ad}, ad_en = ${adEn}, emoji = ${emoji}, resim = ${resim}, 
          aktif = ${aktif}, sira = ${sira}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${req.params.id}
      RETURNING *
    `;
    
    if (rows.length === 0) {
      return res.status(404).json({ basarili: false, mesaj: 'Kategori bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Kategori güncellendi', kategori: rows[0] });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kategori güncellenemedi', hata: error.message });
  }
});

app.delete('/api/admin/kategori/:id', async (req, res) => {
  try {
    const { rows } = await sql`DELETE FROM kategoriler WHERE id = ${req.params.id} RETURNING *`;
    
    if (rows.length === 0) {
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
    const { rows } = await sql`SELECT * FROM kampanyalar ORDER BY sira`;
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mesaj: 'Kampanyalar getirilemedi', hata: error.message });
  }
});

app.post('/api/admin/kampanya', async (req, res) => {
  try {
    const { baslik, aciklama, resim, link, baslangicTarihi, bitisTarihi, renk } = req.body;
    const { rows: countRows } = await sql`SELECT COUNT(*) as count FROM kampanyalar`;
    const sira = parseInt(countRows[0].count) + 1;
    
    const { rows } = await sql`
      INSERT INTO kampanyalar (baslik, aciklama, resim, link, aktif, baslangic_tarihi, bitis_tarihi, renk, sira)
      VALUES (${baslik}, ${aciklama}, ${resim}, ${link || '/kategori/Tümü'}, true, 
              ${baslangicTarihi}, ${bitisTarihi}, ${renk || '#667eea'}, ${sira})
      RETURNING *
    `;
    
    res.json({ basarili: true, mesaj: 'Kampanya eklendi', kampanya: rows[0] });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kampanya eklenemedi', hata: error.message });
  }
});

app.put('/api/admin/kampanya/:id', async (req, res) => {
  try {
    const { baslik, aciklama, resim, link, aktif, baslangicTarihi, bitisTarihi, renk, sira } = req.body;
    
    const { rows } = await sql`
      UPDATE kampanyalar 
      SET baslik = ${baslik}, aciklama = ${aciklama}, resim = ${resim}, link = ${link},
          aktif = ${aktif}, baslangic_tarihi = ${baslangicTarihi}, bitis_tarihi = ${bitisTarihi},
          renk = ${renk}, sira = ${sira}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${req.params.id}
      RETURNING *
    `;
    
    if (rows.length === 0) {
      return res.status(404).json({ basarili: false, mesaj: 'Kampanya bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Kampanya güncellendi', kampanya: rows[0] });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kampanya güncellenemedi', hata: error.message });
  }
});

app.delete('/api/admin/kampanya/:id', async (req, res) => {
  try {
    const { rows } = await sql`DELETE FROM kampanyalar WHERE id = ${req.params.id} RETURNING *`;
    
    if (rows.length === 0) {
      return res.status(404).json({ basarili: false, mesaj: 'Kampanya bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Kampanya silindi' });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kampanya silinemedi', hata: error.message });
  }
});

app.patch('/api/admin/kampanya/:id/toggle', async (req, res) => {
  try {
    const { rows } = await sql`
      UPDATE kampanyalar 
      SET aktif = NOT aktif, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${req.params.id}
      RETURNING *
    `;
    
    if (rows.length === 0) {
      return res.status(404).json({ basarili: false, mesaj: 'Kampanya bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Kampanya durumu değiştirildi', kampanya: rows[0] });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kampanya durumu değiştirilemedi', hata: error.message });
  }
});

// ============================================
// ADMIN ENDPOINTS - Ürünler
// ============================================

app.get('/api/admin/urunler', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM urunler ORDER BY created_at DESC`;
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mesaj: 'Ürünler getirilemedi', hata: error.message });
  }
});

app.post('/api/admin/urun', async (req, res) => {
  try {
    const { ad, adEn, aciklama, aciklamaEn, fiyat, eskiFiyat, kategori, beden, renk, resimler, stokDurumu, marka } = req.body;
    
    const { rows } = await sql`
      INSERT INTO urunler (ad, ad_en, aciklama, aciklama_en, fiyat, eski_fiyat, kategori, beden, renk, resimler, stok_durumu, marka)
      VALUES (${ad}, ${adEn}, ${aciklama}, ${aciklamaEn}, ${fiyat}, ${eskiFiyat}, ${kategori}, 
              ${beden}, ${renk}, ${resimler}, ${stokDurumu !== false}, ${marka})
      RETURNING *
    `;
    
    res.json({ basarili: true, mesaj: 'Ürün eklendi', urun: rows[0] });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Ürün eklenemedi', hata: error.message });
  }
});

app.put('/api/admin/urun/:id', async (req, res) => {
  try {
    const { ad, adEn, aciklama, aciklamaEn, fiyat, eskiFiyat, kategori, beden, renk, resimler, stokDurumu, marka } = req.body;
    
    const { rows } = await sql`
      UPDATE urunler 
      SET ad = ${ad}, ad_en = ${adEn}, aciklama = ${aciklama}, aciklama_en = ${aciklamaEn},
          fiyat = ${fiyat}, eski_fiyat = ${eskiFiyat}, kategori = ${kategori}, beden = ${beden},
          renk = ${renk}, resimler = ${resimler}, stok_durumu = ${stokDurumu !== false}, 
          marka = ${marka}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${req.params.id}
      RETURNING *
    `;
    
    if (rows.length === 0) {
      return res.status(404).json({ basarili: false, mesaj: 'Ürün bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Ürün güncellendi', urun: rows[0] });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Ürün güncellenemedi', hata: error.message });
  }
});

app.delete('/api/admin/urun/:id', async (req, res) => {
  try {
    const { rows } = await sql`DELETE FROM urunler WHERE id = ${req.params.id} RETURNING *`;
    
    if (rows.length === 0) {
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
    const { rows } = await sql`SELECT * FROM kuponlar WHERE UPPER(kod) = ${kod.toUpperCase()} AND aktif = true`;
    
    if (rows.length === 0) {
      return res.json({ gecerli: false, mesaj: 'Geçersiz kupon kodu' });
    }
    
    const kupon = rows[0];
    res.json({
      gecerli: true,
      kupon: {
        kod: kupon.kod,
        indirimTipi: kupon.indirim_tipi,
        indirimMiktari: parseFloat(kupon.indirim_miktari)
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
    const { kullaniciId, urunler, toplamTutar, adres, telefon, odemeTipi, kuponKodu, indirimTutari } = req.body;
    
    // Sipariş oluştur
    const { rows: siparisRows } = await sql`
      INSERT INTO siparisler (kullanici_id, toplam_tutar, durum, adres, telefon, odeme_tipi, kupon_kodu, indirim_tutari)
      VALUES (${kullaniciId || null}, ${toplamTutar}, 'beklemede', ${adres}, ${telefon}, ${odemeTipi}, ${kuponKodu || null}, ${indirimTutari || null})
      RETURNING *
    `;
    
    const siparisId = siparisRows[0].id;
    
    // Sipariş ürünlerini ekle
    for (const urun of urunler) {
      await sql`
        INSERT INTO siparis_urunler (siparis_id, urun_id, ad, fiyat, adet, beden, renk)
        VALUES (${siparisId}, ${urun.urunId || null}, ${urun.ad}, ${urun.fiyat}, ${urun.adet}, ${urun.beden || null}, ${urun.renk || null})
      `;
    }
    
    res.json({ mesaj: 'Siparişiniz alındı', siparisId });
  } catch (error) {
    res.status(500).json({ mesaj: 'Sipariş oluşturulamadı', hata: error.message });
  }
});

// ============================================
// HEALTH CHECK & ROOT
// ============================================

app.get('/api/health', async (req, res) => {
  try {
    await sql`SELECT 1`;
    res.json({ 
      durum: 'çalışıyor', 
      zaman: new Date().toISOString(),
      database: 'bağlı (PostgreSQL)'
    });
  } catch (error) {
    res.json({ 
      durum: 'çalışıyor', 
      zaman: new Date().toISOString(),
      database: 'bağlı değil',
      hata: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    mesaj: 'Kıyafet Mağazası Backend API',
    version: '3.0.0',
    database: 'Vercel Postgres (Neon)'
  });
});

// Server başlat
app.listen(PORT, () => {
  console.log(`🚀 Backend sunucusu http://localhost:${PORT} adresinde çalışıyor`);
  console.log(`📊 Database: Vercel Postgres (Neon)`);
});

module.exports = app;
