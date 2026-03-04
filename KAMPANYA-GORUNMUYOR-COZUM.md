# 🔧 Kampanya Görünmüyor - Çözüm

## Değişiklikler Yapıldı

1. ✅ Console.log eklendi (kampanya sayısını gösterir)
2. ✅ Test banner eklendi (her zaman görünür)
3. ✅ Hata mesajları iyileştirildi

## Test Adımları

### 1. Tarayıcıyı Yenileyin
- Ctrl + F5 (hard refresh)
- Veya Ctrl + Shift + R

### 2. Console Kontrol
1. F12 basın (Developer Tools)
2. Console sekmesine gidin
3. Şunları görmelisiniz:
   ```
   Kampanyalar yüklendi: Array(3)
   Ana sayfa render - Kampanya sayısı: 3
   ```

### 3. Ana Sayfada Görecekleriniz

**Mavi Test Banner (Her zaman görünür):**
```
🎉 Kampanya Sistemi Aktif - Toplam 3 kampanya
```

**Büyük Kampanya Banner'ı (Eğer kampanyalar yüklendiyse):**
- 400px yükseklikte
- Arka plan resimli
- "🎉 Yaz İndirimi Başladı!" başlıklı
- 5 saniyede bir değişir

### 4. Admin Butonu

**Giriş Yapın:**
- Email: admin@kiyafet.com
- Şifre: admin123

**Header'da Göreceksiniz:**
- ❤️ (Favoriler)
- 📦 Siparişlerim
- ⚙️ Admin (KIRMIZI RENKTE)
- 🚪 Çıkış

## Sorun Devam Ediyorsa

### A) Backend Çalışmıyor
```bash
# Terminal 1
cd backend
npm start
```

Şunu görmelisiniz:
```
Backend sunucu 5000 portunda çalışıyor
```

### B) Frontend Çalışmıyor
```bash
# Terminal 2
cd web
npm start
```

Şunu görmelisiniz:
```
Compiled successfully!
Local: http://localhost:3000
```

### C) API Test
Tarayıcıda açın:
```
http://localhost:5000/api/kampanyalar
```

JSON görmelisiniz:
```json
[
  {
    "id": "K1",
    "baslik": "🎉 Yaz İndirimi Başladı!",
    ...
  }
]
```

### D) CORS Hatası
Console'da "CORS" hatası varsa:
- Backend'i yeniden başlatın
- Frontend'i yeniden başlatın

### E) Port Çakışması
Eğer "Port already in use" hatası alırsanız:
```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMARASI> /F
```

## Beklenen Görünüm

### Ana Sayfa (Üstten Alta)
1. Header (Logo, Arama, Giriş/Sepet)
2. Kategori Menüsü (Sticky)
3. **MAVI TEST BANNER** ← Bunu görmeli
4. **BÜYÜK KAMPANYA BANNER** ← Bunu görmeli (eğer yüklendiyse)
5. Kategori Başlığı (örn: "🛍️ Tümü - 14 ürün bulundu")
6. Ürün Kartları (Grid)

### Admin Paneli
1. Header'da "⚙️ Admin" butonuna tıklayın
2. "⚙️ Admin Paneli - Kampanya Yönetimi" başlığını görün
3. "➕ Yeni Kampanya Ekle" formunu görün
4. "📋 Mevcut Kampanyalar (3)" listesini görün

## Hala Görünmüyorsa

### Son Çare: Temiz Başlangıç
```bash
# Backend
cd backend
rm -rf node_modules
npm install
npm start

# Frontend (yeni terminal)
cd web
rm -rf node_modules
npm install
npm start
```

## Başarı Kontrolü

✅ Mavi test banner görünüyor
✅ Console'da "Kampanyalar yüklendi: Array(3)" yazıyor
✅ Büyük kampanya banner'ı görünüyor
✅ Banner 5 saniyede bir değişiyor
✅ Admin butonu görünüyor (giriş yaptıktan sonra)
✅ Admin paneli açılıyor

Hepsi ✅ ise sistem çalışıyor! 🎉

## Ekran Görüntüsü Alın

Sorun devam ediyorsa:
1. Ana sayfanın ekran görüntüsünü alın
2. Console'un ekran görüntüsünü alın (F12)
3. Network sekmesinin ekran görüntüsünü alın
4. Bana gösterin

## İletişim

Sorun devam ediyorsa şunları paylaşın:
- Console'daki hatalar
- Network sekmesindeki istekler
- Hangi adımda takıldınız
