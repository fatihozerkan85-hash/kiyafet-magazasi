# 🔧 Monorepo Çözümü - Backend Sorunu Çözüldü!

## 🐛 Sorun
Backend ayrı bir Vercel projesinde deploy edilmemişti, bu yüzden frontend backend'e ulaşamıyordu.

## ✅ Çözüm
Frontend ve backend'i tek bir Vercel projesinde birleştirdik (monorepo yapısı).

---

## 🏗️ Yeni Yapı

### Önce (Hatalı)
```
Frontend: https://kiyafet-magazasi.vercel.app
Backend: https://kiyafet-magazasi-backend.vercel.app ❌ (deploy edilmemiş)
```

### Şimdi (Düzeltildi)
```
Frontend: https://kiyafet-magazasi.vercel.app
Backend: https://kiyafet-magazasi.vercel.app/api/... ✅ (aynı domain)
```

---

## 📝 Yapılan Değişiklikler

### 1. vercel.json Oluşturuldu
```json
{
  "version": 2,
  "builds": [
    {
      "src": "web/package.json",
      "use": "@vercel/static-build"
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "web/build/$1"
    }
  ]
}
```

### 2. Frontend API URL Güncellendi
```javascript
// web/src/App.js
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : ''; // Aynı domain kullan
```

### 3. Admin Panel API URL Güncellendi
```javascript
// web/public/admin.html
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : ''; // Aynı domain kullan
```

---

## 🚀 Deployment

### Otomatik (Önerilen)
```
TEK-PROJE-DEPLOY.bat dosyasına çift tıklayın
```

### Manuel
```bash
git add -A
git commit -m "Monorepo yapisina gecildi"
git push origin main
```

---

## ⏱️ Bekleme Süresi

- Git push: 10 saniye
- Vercel build: 3-5 dakika (hem frontend hem backend)
- CDN cache: 1-2 dakika
- **Toplam: 4-7 dakika**

---

## 🧪 Test (7 dakika sonra)

### 1. Cache Temizleyin
- Ctrl + Shift + Delete
- "Son 1 saat" seçin
- Temizle

### 2. Siteyi Açın
```
https://kiyafet-magazasi.vercel.app
```

### 3. Hard Refresh
- Ctrl + F5

### 4. API'leri Test Edin
Tarayıcıda açın:
```
https://kiyafet-magazasi.vercel.app/api/urunler
https://kiyafet-magazasi.vercel.app/api/kampanyalar
```

Beklenen: JSON verileri

### 5. Ana Sayfayı Kontrol Edin
- ✅ Kampanya banner'ları görünmeli (3 adet)
- ✅ Ürünler listelenmeli (14 adet)
- ✅ Kategori filtreleme çalışmalı

---

## 🎯 Avantajlar

### Monorepo Yapısının Faydaları

1. **Tek Deployment**
   - Hem frontend hem backend birlikte deploy edilir
   - Senkronizasyon sorunu olmaz

2. **Aynı Domain**
   - CORS sorunu olmaz
   - Daha hızlı API çağrıları

3. **Kolay Yönetim**
   - Tek Vercel projesi
   - Tek dashboard
   - Tek log sistemi

4. **Maliyet**
   - Tek proje = daha az kaynak
   - Vercel free tier'da daha fazla alan

---

## 📊 URL Yapısı

### Frontend
```
https://kiyafet-magazasi.vercel.app/
https://kiyafet-magazasi.vercel.app/admin.html
```

### Backend API
```
https://kiyafet-magazasi.vercel.app/api/urunler
https://kiyafet-magazasi.vercel.app/api/kampanyalar
https://kiyafet-magazasi.vercel.app/api/giris
https://kiyafet-magazasi.vercel.app/api/kayit
https://kiyafet-magazasi.vercel.app/api/odeme
https://kiyafet-magazasi.vercel.app/api/admin/kampanyalar
```

---

## 🔍 Sorun Giderme

### Deploy Başarısız Olursa

**Vercel Dashboard'u kontrol edin:**
1. https://vercel.com/dashboard
2. Projenizi seçin
3. "Deployments" sekmesi
4. Son deployment → "View Function Logs"

**Olası hatalar:**
- Build error → package.json kontrol edin
- Route error → vercel.json kontrol edin
- Memory error → Vercel plan yükseltin

### API Çalışmıyorsa

**Console kontrol:**
- F12 → Console
- Hata mesajlarını okuyun

**Network kontrol:**
- F12 → Network
- /api/urunler çağrısını kontrol edin
- Status code: 200 OK olmalı

**API'yi direkt test edin:**
```
https://kiyafet-magazasi.vercel.app/api/urunler
```

### Kampanyalar Görünmüyorsa

1. **Backend çalışıyor mu?**
   ```
   https://kiyafet-magazasi.vercel.app/api/kampanyalar
   ```
   JSON array dönmeli

2. **Frontend API çağrısı yapıyor mu?**
   - F12 → Network
   - /api/kampanyalar çağrısı var mı?

3. **Cache sorunu mu?**
   - Ctrl + Shift + Delete
   - Gizli pencere deneyin

---

## 📋 Kontrol Listesi

Deploy öncesi:
- [x] vercel.json oluşturuldu
- [x] Frontend API URL güncellendi
- [x] Admin panel API URL güncellendi
- [x] Git commit yapıldı

Deploy sonrası:
- [ ] Vercel build başarılı
- [ ] Frontend açılıyor
- [ ] Backend API'leri çalışıyor
- [ ] Kampanyalar görünüyor
- [ ] Ürünler görünüyor

---

## 🎉 Başarı Kriterleri

Tüm bunlar ✅ ise başarılı:

- ✅ Site açılıyor
- ✅ Kampanya banner'ları görünüyor (3 adet)
- ✅ Banner'lar otomatik değişiyor
- ✅ Ürünler listeleniyor (14 adet)
- ✅ Kategori filtreleme çalışıyor
- ✅ Ürün detay açılıyor
- ✅ Sepete ekleme çalışıyor
- ✅ Admin paneli çalışıyor
- ✅ Console'da hata yok

---

## 💡 Önemli Notlar

### Local Development
```bash
# Backend'i başlat (terminal 1)
cd backend
npm start

# Frontend'i başlat (terminal 2)
cd web
npm start
```

### Production
- Tek komut: `git push`
- Vercel otomatik deploy eder
- Hem frontend hem backend güncellenir

---

## 🔑 Test Bilgileri

### Admin Paneli
```
URL: https://kiyafet-magazasi.vercel.app/admin.html
Kullanıcı: admin
Şifre: admin123
```

### Test Hesabı
```
Email: admin@kiyafet.com
Şifre: admin123
```

### Test Kuponları
```
HOSGELDIN - %10 indirim
YENISEZON - %15 indirim
50TL - 50 TL indirim
```

---

**Hazır! TEK-PROJE-DEPLOY.bat dosyasını çalıştırın! 🚀**

**7 dakika sonra test edin:**
```
https://kiyafet-magazasi.vercel.app
```

**Ctrl + F5 ile yenileyin!**
