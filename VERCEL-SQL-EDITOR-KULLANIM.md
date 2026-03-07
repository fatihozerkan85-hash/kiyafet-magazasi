# 🎯 Vercel SQL Editor ile Seed Data Ekleme

## CORS Sorunu Çözümü - Direkt SQL ile Veri Ekleme

CORS hatası alıyorsanız, en hızlı çözüm Vercel Dashboard'dan direkt SQL Editor kullanmaktır.

## Adım Adım Talimatlar

### 1. Vercel Dashboard'a Git
https://vercel.com/dashboard

### 2. Storage Sekmesine Git
Sol menüden "Storage" seçeneğine tıklayın

### 3. Neon Database'i Aç
"neon-amethyst-ribbon" veya benzeri isimli database'inizi bulun ve tıklayın

### 4. SQL Editor'ü Aç
Üstte "SQL Editor" tab'ına tıklayın

### 5. SQL Kodunu Kopyala
`VERCEL-SQL-SEED-DATA.sql` dosyasını açın ve TÜM içeriği kopyalayın

### 6. SQL Editor'e Yapıştır
SQL Editor'deki text area'ya yapıştırın

### 7. Çalıştır
"Run Query" veya "Execute" butonuna tıklayın

### 8. Sonucu Kontrol Et
En altta şu sonucu görmelisiniz:
```
Kategoriler  | 8
Kampanyalar  | 3
Ürünler      | 5
Kuponlar     | 3
```

### 9. Frontend'i Test Et
https://aslbutique.com.tr

Artık kampanyalar ve kategoriler görünecek!

## Alternatif: Tek Tek Çalıştırma

Eğer tüm SQL kodu hata verirse, tek tek çalıştırın:

### 1. Temizleme (İsteğe Bağlı)
```sql
DELETE FROM siparis_urunler;
DELETE FROM siparisler;
DELETE FROM urunler;
DELETE FROM kampanyalar;
DELETE FROM kategoriler;
DELETE FROM kuponlar;
```

### 2. Kategoriler
```sql
INSERT INTO kategoriler (ad, ad_en, emoji, resim, sira, aktif) VALUES
('Tümü', 'All', '🛍️', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop', 1, true),
('Elbise', 'Dress', '👗', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop', 2, true),
('Pantolon', 'Pants', '👖', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=300&fit=crop', 3, true),
('Gömlek', 'Shirt', '👔', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop', 4, true),
('Ceket', 'Jacket', '🧥', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', 5, true),
('Ayakkabı', 'Shoes', '👟', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop', 6, true),
('Aksesuar', 'Accessories', '👜', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=300&fit=crop', 7, true),
('Spor', 'Sports', '🏃', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop', 8, true);
```

### 3. Kampanyalar
```sql
INSERT INTO kampanyalar (baslik, aciklama, resim, link, aktif, baslangic_tarihi, bitis_tarihi, renk, sira) VALUES
('❄️ KIŞ SEZONUNUN SON FIRSATLARI', 'Tüm kış ürünlerinde %70''e varan indirimler', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=500&fit=crop', '/kategori/Ceket', true, '2024-03-01', '2024-03-31', '#2c3e50', 1),
('👗 Yeni Sezon Koleksiyonu', 'En yeni trendler şimdi mağazamızda', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=500&fit=crop', '/kategori/Elbise', true, '2024-03-01', '2024-04-30', '#e74c3c', 2),
('🚚 Ücretsiz Kargo', '200 TL ve üzeri alışverişlerde kargo bedava', 'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=1920&h=500&fit=crop', '/kategori/Tümü', true, '2024-03-01', '2024-12-31', '#28a745', 3);
```

### 4. Kontrol
```sql
SELECT COUNT(*) FROM kategoriler;
SELECT COUNT(*) FROM kampanyalar;
SELECT COUNT(*) FROM urunler;
```

## Troubleshooting

### Hata: "relation does not exist"
Tablolar oluşturulmamış. Backend'i bir kez çalıştırın (deployment yapın), tablolar otomatik oluşacak.

### Hata: "duplicate key value"
Veriler zaten var. Önce DELETE komutlarını çalıştırın.

### Hata: "syntax error"
SQL kodunu tek tek çalıştırın, hangi satırda hata olduğunu bulun.

## Başarı Kontrolü

### API Test
```
https://kiyafet-magazasi-backend.vercel.app/api/health
```

Response:
```json
{
  "durum": "çalışıyor",
  "database": "bağlı (PostgreSQL)",
  "data": {
    "kategoriler": 8,
    "kampanyalar": 3,
    "urunler": 5
  }
}
```

### Frontend Test
```
https://aslbutique.com.tr
```

- ✅ 3 kampanya banner görünüyor
- ✅ 8 kategori görünüyor
- ✅ 5 ürün listeleniyor

## Neden SQL Editor?

1. **CORS sorunu yok** - Direkt database'e bağlanır
2. **Hızlı** - Anında çalışır, deployment beklemeye gerek yok
3. **Güvenilir** - Vercel'in kendi arayüzü
4. **Debug kolay** - Hataları direkt gösterir

## Sonraki Adımlar

1. SQL Editor'de seed data'yı çalıştır
2. Frontend'i test et
3. Admin panel'den yeni veri ekle
4. Data persistence'ı test et

Artık CORS sorunu olmadan verileriniz hazır!
