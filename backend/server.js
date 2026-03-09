const express = require('express');
const cors = require('cors');
const { sql } = require('@vercel/postgres');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection cache
let dbInitialized = false;

// Email transporter yapılandırması
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// CORS ayarları - Tüm origin'lere izin ver (local HTML files için)
app.use(cors({
  origin: true, // Tüm origin'lere izin ver
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// OPTIONS preflight için
app.options('*', cors());

app.use(express.json());

// No-cache middleware for API endpoints
app.use('/api', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// ============================================
// HELPER FUNCTIONS
// ============================================

// PostgreSQL snake_case'i camelCase'e çevir
function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item));
  }
  
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = toCamelCase(obj[key]);
      return result;
    }, {});
  }
  
  return obj;
}

// 6 haneli doğrulama kodu oluştur
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Email gönderme fonksiyonu
async function sendVerificationEmail(email, code) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'ASL BUTIQUE <noreply@aslbutique.com>',
    to: email,
    subject: 'Email Doğrulama Kodu - ASL BUTIQUE',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #C85A8E; text-align: center; margin-bottom: 20px;">ASL BUTIQUE</h1>
          <h2 style="color: #333; text-align: center;">Email Doğrulama</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Merhaba,
          </p>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            ASL BUTIQUE'e hoş geldiniz! Hesabınızı oluşturmak için aşağıdaki doğrulama kodunu kullanın:
          </p>
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
            <h1 style="color: #C85A8E; font-size: 36px; letter-spacing: 8px; margin: 0;">${code}</h1>
          </div>
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Bu kod 10 dakika geçerlidir. Eğer bu işlemi siz yapmadıysanız, bu emaili görmezden gelebilirsiniz.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            © 2024 ASL BUTIQUE. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    `
  };

  try {
    console.log('📧 Email gönderiliyor:', email);
    console.log('🔑 EMAIL_USER:', process.env.EMAIL_USER ? 'Tanımlı' : 'Tanımsız');
    console.log('🔑 EMAIL_PASS:', process.env.EMAIL_PASS ? 'Tanımlı' : 'Tanımsız');
    console.log('🔑 EMAIL_FROM:', process.env.EMAIL_FROM || 'Varsayılan');
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email gönderildi:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Email gönderme hatası:', error.message);
    console.error('❌ Hata detayı:', error);
    return false;
  }
}

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
        email_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Email doğrulama kodları tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS email_verifications (
        id SERIAL PRIMARY KEY,
        email VARCHAR(200) NOT NULL,
        code VARCHAR(6) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
if (!dbInitialized) {
  initDatabase().then(() => {
    dbInitialized = true;
  }).catch(err => {
    console.error('❌ Database initialization failed:', err);
  });
}

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
// API ENDPOINTS - Kullanıcı (Giriş & Kayıt)
// ============================================

app.post('/api/giris', async (req, res) => {
  try {
    const { email, sifre } = req.body;
    
    const { rows } = await sql`
      SELECT * FROM kullanicilar WHERE email = ${email} AND sifre = ${sifre}
    `;
    
    if (rows.length > 0) {
      const kullanici = toCamelCase(rows[0]);
      delete kullanici.sifre; // Şifreyi gönderme
      res.json({ basarili: true, mesaj: 'Giriş başarılı', kullanici });
    } else {
      res.status(401).json({ basarili: false, mesaj: 'Email veya şifre hatalı' });
    }
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Giriş yapılamadı', hata: error.message });
  }
});

// Email doğrulama kodu gönder
app.post('/api/kayit/dogrulama-kodu-gonder', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Email kontrolü
    const { rows: existingUser } = await sql`
      SELECT * FROM kullanicilar WHERE email = ${email}
    `;
    
    if (existingUser.length > 0) {
      return res.status(400).json({ basarili: false, mesaj: 'Bu email adresi zaten kayıtlı' });
    }
    
    // Doğrulama kodu oluştur
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 dakika
    
    // Eski kodları sil
    await sql`DELETE FROM email_verifications WHERE email = ${email}`;
    
    // Yeni kodu kaydet
    await sql`
      INSERT INTO email_verifications (email, code, expires_at)
      VALUES (${email}, ${code}, ${expiresAt})
    `;
    
    // Email gönder
    const emailSent = await sendVerificationEmail(email, code);
    
    if (emailSent) {
      res.json({ basarili: true, mesaj: 'Doğrulama kodu email adresinize gönderildi' });
    } else {
      res.status(500).json({ basarili: false, mesaj: 'Email gönderilemedi. Lütfen tekrar deneyin.' });
    }
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Bir hata oluştu', hata: error.message });
  }
});

// Kayıt - Doğrulama kodu ile
app.post('/api/kayit', async (req, res) => {
  try {
    const { email, sifre, ad, soyad, telefon, dogrulamaKodu } = req.body;
    
    console.log('📝 Kayıt isteği alındı:', { email, ad, soyad });
    
    // Email kontrolü
    const { rows: existingUser } = await sql`
      SELECT * FROM kullanicilar WHERE email = ${email}
    `.catch(err => {
      console.error('❌ Email kontrol hatası:', err);
      throw new Error('Veritabanı bağlantı hatası');
    });
    
    if (existingUser.length > 0) {
      console.log('⚠️ Email zaten kayıtlı:', email);
      return res.status(400).json({ basarili: false, mesaj: 'Bu email adresi zaten kayıtlı' });
    }
    
    // Doğrulama kodunu kontrol et
    const { rows: verifications } = await sql`
      SELECT * FROM email_verifications 
      WHERE email = ${email} AND code = ${dogrulamaKodu} AND expires_at > NOW()
      ORDER BY created_at DESC
      LIMIT 1
    `.catch(err => {
      console.error('❌ Doğrulama kodu kontrol hatası:', err);
      throw new Error('Veritabanı bağlantı hatası');
    });
    
    if (verifications.length === 0) {
      console.log('⚠️ Geçersiz doğrulama kodu:', { email, kod: dogrulamaKodu });
      return res.status(400).json({ basarili: false, mesaj: 'Geçersiz veya süresi dolmuş doğrulama kodu' });
    }
    
    console.log('✅ Doğrulama kodu geçerli, kullanıcı oluşturuluyor...');
    
    // Yeni kullanıcı oluştur (email_verified = true)
    const { rows } = await sql`
      INSERT INTO kullanicilar (email, sifre, ad, soyad, telefon, rol, email_verified)
      VALUES (${email}, ${sifre}, ${ad}, ${soyad}, ${telefon || null}, 'musteri', true)
      RETURNING *
    `.catch(err => {
      console.error('❌ Kullanıcı oluşturma DETAYLI hatası:', {
        message: err.message,
        code: err.code,
        detail: err.detail,
        hint: err.hint,
        position: err.position,
        stack: err.stack
      });
      throw err; // Orijinal hatayı fırlat
    });
    
    // Kullanılan doğrulama kodunu sil
    await sql`DELETE FROM email_verifications WHERE email = ${email}`.catch(err => {
      console.warn('⚠️ Doğrulama kodu silinemedi:', err);
    });
    
    const kullanici = toCamelCase(rows[0]);
    delete kullanici.sifre; // Şifreyi gönderme
    
    console.log('✅ Kayıt başarılı:', kullanici.email);
    res.json({ basarili: true, mesaj: 'Kayıt başarılı', kullanici });
  } catch (error) {
    console.error('❌ Kayıt endpoint hatası:', error);
    res.status(500).json({ basarili: false, mesaj: error.message || 'Kayıt yapılamadı', hata: error.message });
  }
});

// ============================================
// API ENDPOINTS - Kategoriler
// ============================================

app.get('/api/kategoriler', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM kategoriler WHERE aktif = true ORDER BY sira`;
    res.json(toCamelCase(rows));
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
// ADMIN ENDPOINTS - Kullanıcılar
// ============================================

app.get('/api/admin/kullanicilar', async (req, res) => {
  try {
    const { rows } = await sql`
      SELECT id, email, ad, soyad, telefon, rol, email_verified, created_at 
      FROM kullanicilar 
      ORDER BY created_at DESC
    `;
    res.json(toCamelCase(rows));
  } catch (error) {
    res.status(500).json({ mesaj: 'Kullanıcılar getirilemedi', hata: error.message });
  }
});

app.delete('/api/admin/kullanici/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Kullanıcıyı kontrol et
    const { rows: userCheck } = await sql`
      SELECT id, email, rol FROM kullanicilar WHERE id = ${userId}
    `;
    
    if (userCheck.length === 0) {
      return res.status(404).json({ basarili: false, mesaj: 'Kullanıcı bulunamadı' });
    }
    
    // Admin kullanıcısını silmeyi engelle
    if (userCheck[0].rol === 'admin') {
      return res.status(403).json({ basarili: false, mesaj: 'Admin kullanıcısı silinemez' });
    }
    
    // Kullanıcıyı sil
    await sql`DELETE FROM kullanicilar WHERE id = ${userId}`;
    
    res.json({ 
      basarili: true, 
      mesaj: `${userCheck[0].email} kullanıcısı silindi` 
    });
  } catch (error) {
    console.error('Kullanıcı silme hatası:', error);
    res.status(500).json({ basarili: false, mesaj: 'Kullanıcı silinemedi', hata: error.message });
  }
});

// ============================================
// ADMIN ENDPOINTS - Kategoriler
// ============================================

app.get('/api/admin/kategoriler', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM kategoriler ORDER BY sira`;
    res.json(toCamelCase(rows));
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
    
    res.json({ basarili: true, mesaj: 'Kategori eklendi', kategori: toCamelCase(rows[0]) });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kategori eklenemedi', hata: error.message });
  }
});

app.put('/api/admin/kategori/:id', async (req, res) => {
  try {
    const { ad, adEn, emoji, resim, aktif, sira } = req.body;
    
    // Önce mevcut kategoriyi al
    const { rows: currentRows } = await sql`SELECT * FROM kategoriler WHERE id = ${req.params.id}`;
    if (currentRows.length === 0) {
      return res.status(404).json({ basarili: false, mesaj: 'Kategori bulunamadı' });
    }
    
    const current = currentRows[0];
    
    // Undefined değerleri mevcut değerlerle doldur
    const updatedData = {
      ad: ad || current.ad,
      adEn: adEn || current.ad_en,
      emoji: emoji || current.emoji,
      resim: resim || current.resim,
      aktif: aktif !== undefined ? aktif : current.aktif,
      sira: sira !== undefined ? sira : current.sira
    };
    
    const { rows } = await sql`
      UPDATE kategoriler 
      SET ad = ${updatedData.ad}, ad_en = ${updatedData.adEn}, emoji = ${updatedData.emoji}, 
          resim = ${updatedData.resim}, aktif = ${updatedData.aktif}, sira = ${updatedData.sira}, 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${req.params.id}
      RETURNING *
    `;
    
    res.json({ basarili: true, mesaj: 'Kategori güncellendi', kategori: toCamelCase(rows[0]) });
  } catch (error) {
    console.error('Kategori güncelleme hatası:', error);
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

app.patch('/api/admin/kategori/:id/toggle', async (req, res) => {
  try {
    const { rows } = await sql`
      UPDATE kategoriler 
      SET aktif = NOT aktif, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${req.params.id}
      RETURNING *
    `;
    
    if (rows.length === 0) {
      return res.status(404).json({ basarili: false, mesaj: 'Kategori bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Kategori durumu değiştirildi', kategori: toCamelCase(rows[0]) });
  } catch (error) {
    console.error('Kategori toggle hatası:', error);
    res.status(500).json({ basarili: false, mesaj: 'Kategori durumu değiştirilemedi', hata: error.message });
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
// ADMIN ENDPOINTS - Kuponlar
// ============================================

app.get('/api/admin/kuponlar', async (req, res) => {
  try {
    const { rows } = await sql`
      SELECT * FROM kuponlar 
      ORDER BY created_at DESC
    `;
    res.json(toCamelCase(rows));
  } catch (error) {
    res.status(500).json({ mesaj: 'Kuponlar getirilemedi', hata: error.message });
  }
});

app.post('/api/admin/kupon', async (req, res) => {
  try {
    const { kod, indirimTipi, indirimMiktari, minSepetTutari, maxKullanim, baslangicTarihi, bitisTarihi } = req.body;
    
    // Kupon kodunu büyük harfe çevir
    const kuponKodu = kod.toUpperCase();
    
    // Aynı kodda kupon var mı kontrol et
    const { rows: existing } = await sql`
      SELECT id FROM kuponlar WHERE UPPER(kod) = ${kuponKodu}
    `;
    
    if (existing.length > 0) {
      return res.status(400).json({ basarili: false, mesaj: 'Bu kupon kodu zaten mevcut' });
    }
    
    const { rows } = await sql`
      INSERT INTO kuponlar (
        kod, indirim_tipi, indirim_miktari, min_sepet_tutari, 
        max_kullanim, baslangic_tarihi, bitis_tarihi, aktif
      )
      VALUES (
        ${kuponKodu}, ${indirimTipi}, ${indirimMiktari}, ${minSepetTutari || null},
        ${maxKullanim || null}, ${baslangicTarihi || null}, ${bitisTarihi || null}, true
      )
      RETURNING *
    `;
    
    res.json({ basarili: true, mesaj: 'Kupon oluşturuldu', kupon: toCamelCase(rows[0]) });
  } catch (error) {
    console.error('Kupon oluşturma hatası:', error);
    res.status(500).json({ basarili: false, mesaj: 'Kupon oluşturulamadı', hata: error.message });
  }
});

app.delete('/api/admin/kupon/:id', async (req, res) => {
  try {
    const { rows } = await sql`DELETE FROM kuponlar WHERE id = ${req.params.id} RETURNING *`;
    
    if (rows.length === 0) {
      return res.status(404).json({ basarili: false, mesaj: 'Kupon bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Kupon silindi' });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kupon silinemedi', hata: error.message });
  }
});

app.patch('/api/admin/kupon/:id/toggle', async (req, res) => {
  try {
    const { rows } = await sql`
      UPDATE kuponlar 
      SET aktif = NOT aktif, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${req.params.id}
      RETURNING *
    `;
    
    if (rows.length === 0) {
      return res.status(404).json({ basarili: false, mesaj: 'Kupon bulunamadı' });
    }
    
    res.json({ basarili: true, mesaj: 'Kupon durumu güncellendi', kupon: toCamelCase(rows[0]) });
  } catch (error) {
    res.status(500).json({ basarili: false, mesaj: 'Kupon güncellenemedi', hata: error.message });
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
// MANUAL SEED ENDPOINT (Emergency Data Reset)
// ============================================

app.post('/api/admin/seed-data', async (req, res) => {
  try {
    console.log('🔄 Manuel seed data başlatıldı...');
    
    // Önce tüm verileri temizle
    await sql`DELETE FROM siparis_urunler`;
    await sql`DELETE FROM siparisler`;
    await sql`DELETE FROM urunler`;
    await sql`DELETE FROM kampanyalar`;
    await sql`DELETE FROM kategoriler`;
    await sql`DELETE FROM kuponlar`;
    
    // Seed data'yı çalıştır
    await seedData();
    
    // Kontrol et
    const { rows: kategoriler } = await sql`SELECT COUNT(*) as count FROM kategoriler`;
    const { rows: kampanyalar } = await sql`SELECT COUNT(*) as count FROM kampanyalar`;
    const { rows: urunler } = await sql`SELECT COUNT(*) as count FROM urunler`;
    
    res.json({
      basarili: true,
      mesaj: 'Seed data başarıyla eklendi',
      counts: {
        kategoriler: parseInt(kategoriler[0].count),
        kampanyalar: parseInt(kampanyalar[0].count),
        urunler: parseInt(urunler[0].count)
      }
    });
  } catch (error) {
    res.status(500).json({
      basarili: false,
      mesaj: 'Seed data eklenemedi',
      hata: error.message
    });
  }
});

// Email verified kolonu ekle (Migration)
app.post('/api/admin/add-email-verified', async (req, res) => {
  try {
    console.log('🔄 Email verified kolonu ekleniyor...');
    
    // Kolonu ekle
    await sql`
      ALTER TABLE kullanicilar 
      ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false
    `;
    
    // Mevcut kullanıcıları verified yap
    await sql`
      UPDATE kullanicilar 
      SET email_verified = true 
      WHERE email_verified IS NULL
    `;
    
    console.log('✅ Email verified kolonu eklendi');
    
    res.json({
      basarili: true,
      mesaj: 'Email verified kolonu başarıyla eklendi'
    });
  } catch (error) {
    console.error('❌ Migration hatası:', error);
    res.status(500).json({
      basarili: false,
      mesaj: 'Migration başarısız',
      hata: error.message
    });
  }
});

// ============================================
// HEALTH CHECK & ROOT
// ============================================

app.get('/api/health', async (req, res) => {
  try {
    await sql`SELECT 1`;
    
    // Veri sayılarını da göster
    const { rows: kategoriler } = await sql`SELECT COUNT(*) as count FROM kategoriler`;
    const { rows: kampanyalar } = await sql`SELECT COUNT(*) as count FROM kampanyalar`;
    const { rows: urunler } = await sql`SELECT COUNT(*) as count FROM urunler`;
    
    res.json({ 
      durum: 'çalışıyor', 
      zaman: new Date().toISOString(),
      database: 'bağlı (PostgreSQL)',
      data: {
        kategoriler: parseInt(kategoriler[0].count),
        kampanyalar: parseInt(kampanyalar[0].count),
        urunler: parseInt(urunler[0].count)
      }
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

// Email test endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    console.log('🧪 Email test başlatıldı');
    console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
    console.log('🔑 EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'YOK');
    console.log('📨 EMAIL_FROM:', process.env.EMAIL_FROM);
    
    // Test email gönder
    const testCode = '123456';
    const testEmail = process.env.EMAIL_USER; // Kendine gönder
    
    const result = await sendVerificationEmail(testEmail, testCode);
    
    res.json({
      basarili: result,
      mesaj: result ? 'Test email gönderildi!' : 'Email gönderilemedi',
      config: {
        emailUser: process.env.EMAIL_USER ? 'Tanımlı' : 'Tanımsız',
        emailPass: process.env.EMAIL_PASS ? 'Tanımlı' : 'Tanımsız',
        emailFrom: process.env.EMAIL_FROM || 'Varsayılan'
      }
    });
  } catch (error) {
    res.status(500).json({
      basarili: false,
      mesaj: 'Test hatası',
      hata: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    mesaj: 'Kıyafet Mağazası Backend API',
    version: '3.0.1',
    database: 'Vercel Postgres (Neon)',
    emailSystem: 'Gmail SMTP Active'
  });
});

// Server başlat
app.listen(PORT, () => {
  console.log(`🚀 Backend sunucusu http://localhost:${PORT} adresinde çalışıyor`);
  console.log(`📊 Database: Vercel Postgres (Neon)`);
});

module.exports = app;
