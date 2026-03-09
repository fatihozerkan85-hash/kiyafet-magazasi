# ✅ Kupon Sistemi Düzeltildi

## 🔧 Sorun
Admin panelinde kupon ekleme çalışmıyordu. Konsolda şu hatalar görünüyordu:
- `kiyafet-magazasi-backend.vercel.app/api/admin/kuponlar` - 404
- `kiyafet-magazasi-backend.vercel.app/api/admin/kupon` - 404

## 🎯 Çözüm
Backend'e eksik olan admin kupon endpoint'leri eklendi.

## 📝 Eklenen Endpoint'ler

### 1. GET /api/admin/kuponlar
Tüm kuponları listeler.

**Response:**
```json
[
  {
    "id": 1,
    "kod": "YENISEZON",
    "indirimTipi": "yuzde",
    "indirimMiktari": 15,
    "aktif": true,
    "kullanimSayisi": 0,
    "maxKullanim": null,
    "minSepetTutari": null,
    "baslangicTarihi": null,
    "bitisTarihi": null,
    "createdAt": "2026-03-09T12:00:00.000Z",
    "updatedAt": "2026-03-09T12:00:00.000Z"
  }
]
```

### 2. POST /api/admin/kupon
Yeni kupon oluşturur.

**Request:**
```json
{
  "kod": "YENISEZON",
  "indirimTipi": "yuzde",
  "indirimMiktari": 15,
  "minSepetTutari": 100,
  "maxKullanim": 100,
  "baslangicTarihi": "2026-03-01",
  "bitisTarihi": "2026-03-31"
}
```

**Success Response (200):**
```json
{
  "basarili": true,
  "mesaj": "Kupon oluşturuldu",
  "kupon": {
    "id": 1,
    "kod": "YENISEZON",
    "indirimTipi": "yuzde",
    "indirimMiktari": 15,
    "aktif": true
  }
}
```

**Error Response (400):**
```json
{
  "basarili": false,
  "mesaj": "Bu kupon kodu zaten mevcut"
}
```

### 3. DELETE /api/admin/kupon/:id
Kupon siler.

**Request:**
```http
DELETE /api/admin/kupon/1
```

**Success Response (200):**
```json
{
  "basarili": true,
  "mesaj": "Kupon silindi"
}
```

### 4. PATCH /api/admin/kupon/:id/toggle
Kupon durumunu aktif/pasif yapar.

**Request:**
```http
PATCH /api/admin/kupon/1/toggle
```

**Success Response (200):**
```json
{
  "basarili": true,
  "mesaj": "Kupon durumu güncellendi",
  "kupon": {
    "id": 1,
    "kod": "YENISEZON",
    "aktif": false
  }
}
```

## 🎨 Admin Panel Özellikleri

### Kupon Oluşturma Formu
- **Kupon Kodu:** Otomatik büyük harfe çevrilir
- **İndirim Tipi:** Yüzde (%) veya Sabit Tutar (₺)
- **İndirim Miktarı:** Sayısal değer

### Kupon Listesi
Tabloda gösterilen bilgiler:
- ID
- Kupon Kodu
- İndirim Tipi
- İndirim Miktarı
- Kullanım Sayısı
- Durum (Aktif/Pasif)

## 🔒 Güvenlik Özellikleri

### 1. Kupon Kodu Kontrolü
```javascript
// Aynı kodda kupon var mı kontrol et
const { rows: existing } = await sql`
  SELECT id FROM kuponlar WHERE UPPER(kod) = ${kuponKodu}
`;

if (existing.length > 0) {
  return res.status(400).json({ 
    basarili: false, 
    mesaj: 'Bu kupon kodu zaten mevcut' 
  });
}
```

### 2. Otomatik Büyük Harf Dönüşümü
```javascript
const kuponKodu = kod.toUpperCase();
```

## 🧪 Test

### Test Sayfası
`backend/test-kupon.html` dosyası oluşturuldu.

**Özellikler:**
- Yeni kupon oluşturma formu
- Kupon listesini görüntüleme
- Otomatik liste yenileme
- Başarı/hata mesajları

**Kullanım:**
1. `backend/test-kupon.html` dosyasını tarayıcıda aç
2. Kupon bilgilerini gir
3. "➕ Kupon Oluştur" butonuna tıkla
4. Kupon listesi otomatik yenilenir

### Manuel Test
```bash
# Kupon listesini görüntüle
curl https://kiyafet-magazasi-backend.vercel.app/api/admin/kuponlar

# Yeni kupon oluştur
curl -X POST https://kiyafet-magazasi-backend.vercel.app/api/admin/kupon \
  -H "Content-Type: application/json" \
  -d '{"kod":"YENISEZON","indirimTipi":"yuzde","indirimMiktari":15}'

# Kupon sil
curl -X DELETE https://kiyafet-magazasi-backend.vercel.app/api/admin/kupon/1

# Kupon durumunu değiştir
curl -X PATCH https://kiyafet-magazasi-backend.vercel.app/api/admin/kupon/1/toggle
```

## 📋 Admin Panel Kullanımı

### Adım 1: Admin Paneline Giriş
1. https://kiyafet-magazasi.vercel.app/admin-tam.html
2. Kullanıcı: `admin`
3. Şifre: `admin123`

### Adım 2: Kuponlar Sekmesi
1. "🎟️ Kuponlar" sekmesine tıkla
2. Kupon oluşturma formu görünür

### Adım 3: Yeni Kupon Oluştur
1. **Kupon Kodu:** YENISEZON (otomatik büyük harfe çevrilir)
2. **İndirim Tipi:** Yüzde (%) veya Sabit Tutar (₺)
3. **İndirim Miktarı:** 15
4. "➕ Kupon Oluştur" butonuna tıkla
5. Başarı mesajı görünür ve liste yenilenir

### Adım 4: Kupon Listesi
- Oluşturulan tüm kuponlar tabloda görünür
- Her kuponun durumu (Aktif/Pasif) gösterilir
- Kullanım sayısı takip edilir

## 📊 Kupon Tipleri

### Yüzde İndirimi
```json
{
  "kod": "YUZDE15",
  "indirimTipi": "yuzde",
  "indirimMiktari": 15
}
```
Sepet toplamının %15'i indirim yapılır.

### Sabit Tutar İndirimi
```json
{
  "kod": "50TL",
  "indirimTipi": "sabit",
  "indirimMiktari": 50
}
```
Sepet toplamından 50 TL indirim yapılır.

## 🚀 Deployment

### GitHub Push
```bash
git add backend/server.js backend/test-kupon.html
git commit -m "Admin kupon endpoint'leri eklendi"
git push origin main
```

### Vercel Otomatik Deploy
Vercel, GitHub'a push yapıldığında otomatik olarak deploy ediyor.

## 📊 Veritabanı Yapısı

### kuponlar Tablosu
```sql
CREATE TABLE kuponlar (
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
);
```

## 💡 Kullanım Senaryoları

### 1. Yeni Sezon İndirimi
```
Kupon: YENISEZON
Tip: Yüzde
Miktar: 15%
```

### 2. İlk Alışveriş İndirimi
```
Kupon: ILKALISVERIS
Tip: Sabit
Miktar: 50 TL
```

### 3. Özel Gün İndirimi
```
Kupon: ANNELERGUNU
Tip: Yüzde
Miktar: 20%
Başlangıç: 2026-05-01
Bitiş: 2026-05-15
```

### 4. Minimum Sepet Tutarı
```
Kupon: 500TLUZERI
Tip: Sabit
Miktar: 100 TL
Min Sepet: 500 TL
```

## ⚠️ Önemli Notlar

### Kupon Kodu Kuralları
- Otomatik büyük harfe çevrilir
- Benzersiz olmalı (aynı kod tekrar kullanılamaz)
- Boşluk içermemeli

### İndirim Hesaplama
- **Yüzde:** Sepet toplamı × (İndirim / 100)
- **Sabit:** Doğrudan indirim tutarı

### Kupon Durumu
- **Aktif:** Kullanıcılar kullanabilir
- **Pasif:** Kullanıcılar kullanamaz (admin tarafından devre dışı bırakılmış)

## ✅ Tamamlanan Özellikler

- ✅ Backend endpoint'leri eklendi
- ✅ Kupon listesi endpoint'i
- ✅ Kupon oluşturma endpoint'i
- ✅ Kupon silme endpoint'i
- ✅ Kupon durumu değiştirme endpoint'i
- ✅ Kupon kodu benzersizlik kontrolü
- ✅ Otomatik büyük harf dönüşümü
- ✅ Test sayfası oluşturuldu
- ✅ Admin paneli entegrasyonu
- ✅ GitHub'a push edildi
- ✅ Vercel'e deploy edildi

## 🎯 Sonuç

Kupon sistemi başarıyla düzeltildi ve deploy edildi. Admin panelinden artık kupon oluşturabilir, listeleyebilir ve yönetebilirsiniz.

## 🔗 İlgili Endpoint'ler

### Müşteri Tarafı
- `POST /api/kupon/kontrol` - Kupon geçerliliğini kontrol eder (zaten mevcuttu)

### Admin Tarafı
- `GET /api/admin/kuponlar` - Kupon listesi (YENİ)
- `POST /api/admin/kupon` - Kupon oluştur (YENİ)
- `DELETE /api/admin/kupon/:id` - Kupon sil (YENİ)
- `PATCH /api/admin/kupon/:id/toggle` - Kupon durumu değiştir (YENİ)
