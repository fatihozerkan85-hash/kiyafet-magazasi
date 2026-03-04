# 🚀 Backend Ayrı Deployment Çözümü

## 🎯 Çözüm

Backend'i ayrı bir Vercel projesi olarak deploy edeceğiz.

---

## 📝 Adım Adım Deployment

### Adım 1: Vercel'e Giriş Yapın

1. https://vercel.com adresine gidin
2. GitHub hesabınızla giriş yapın

### Adım 2: Yeni Proje Oluşturun (Backend)

1. **"Add New" → "Project"** tıklayın
2. **GitHub repository'nizi seçin:** `kiyafet-magazasi`
3. **"Configure Project"** ekranında:
   - **Project Name:** `kiyafet-magazasi-backend`
   - **Framework Preset:** Other
   - **Root Directory:** `backend` (ÖNEMLI!)
   - **Build Command:** Boş bırakın
   - **Output Directory:** Boş bırakın
4. **"Deploy"** butonuna tıklayın

### Adım 3: Backend URL'sini Alın

Deploy tamamlandığında:
```
https://kiyafet-magazasi-backend.vercel.app
```

Bu URL'yi kopyalayın!

### Adım 4: Frontend'i Güncelleyin

**web/src/App.js** dosyasını açın ve API_URL'yi güncelleyin:

```javascript
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://kiyafet-magazasi-backend.vercel.app';
```

**web/public/admin.html** dosyasını açın ve API_URL'yi güncelleyin:

```javascript
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://kiyafet-magazasi-backend.vercel.app';
```

### Adım 5: Frontend'i Deploy Edin

```bash
git add -A
git commit -m "Backend URL guncellendi"
git push origin main
```

Vercel otomatik olarak frontend'i deploy edecek.

### Adım 6: Test Edin

**5 dakika bekleyin, sonra:**

1. Backend'i test edin:
   ```
   https://kiyafet-magazasi-backend.vercel.app/api/urunler
   https://kiyafet-magazasi-backend.vercel.app/api/kampanyalar
   ```

2. Frontend'i test edin:
   ```
   https://kiyafet-magazasi.vercel.app
   ```

3. Cache temizleyin: Ctrl + Shift + Delete
4. Hard refresh: Ctrl + F5

---

## 🔧 Alternatif: Vercel CLI ile Deploy

### Backend Deploy

```bash
cd backend
vercel --prod
```

URL'yi kopyalayın ve frontend'de kullanın.

### Frontend Deploy

```bash
cd web
vercel --prod
```

---

## 📊 Sonuç

**2 ayrı Vercel projesi:**

1. **Backend:**
   - Proje: `kiyafet-magazasi-backend`
   - URL: `https://kiyafet-magazasi-backend.vercel.app`
   - Root Directory: `backend`

2. **Frontend:**
   - Proje: `kiyafet-magazasi`
   - URL: `https://kiyafet-magazasi.vercel.app`
   - Root Directory: `web`

---

## ✅ Kontrol Listesi

Backend Deploy:
- [ ] Vercel'de yeni proje oluşturuldu
- [ ] Root directory `backend` seçildi
- [ ] Deploy başarılı
- [ ] Backend URL alındı
- [ ] API endpoint'leri test edildi

Frontend Güncelleme:
- [ ] App.js'de API_URL güncellendi
- [ ] admin.html'de API_URL güncellendi
- [ ] Git push yapıldı
- [ ] Frontend deploy edildi

Test:
- [ ] Backend API'leri çalışıyor
- [ ] Frontend backend'e bağlanıyor
- [ ] Kampanyalar görünüyor
- [ ] Ürünler görünüyor

---

## 🐛 Sorun Giderme

### Backend Deploy Hatası

**Hata:** "No output directory"
**Çözüm:** Root directory'yi `backend` olarak ayarlayın

**Hata:** "Build failed"
**Çözüm:** Build command'i boş bırakın

### CORS Hatası

Backend'de CORS ayarları zaten var:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://kiyafet-magazasi.vercel.app'],
  credentials: true
}));
```

Eğer farklı bir frontend URL'si kullanıyorsanız, bunu ekleyin.

---

**Başlayın: Vercel dashboard'a gidin ve backend'i deploy edin! 🚀**
