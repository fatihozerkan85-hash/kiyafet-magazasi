# 🚀 Online Yükleme Rehberi

## Vercel ile Ücretsiz Online Yayınlama

### 📋 Gereksinimler
- GitHub hesabı
- Vercel hesabı (GitHub ile giriş yapabilirsiniz)

---

## 1️⃣ GitHub'a Yükle

### Adım 1: GitHub'da Yeni Repository Oluştur
1. https://github.com adresine git
2. "New repository" butonuna tıkla
3. Repository adı: `kiyafet-magazasi`
4. Public seç
5. "Create repository" tıkla

### Adım 2: Projeyi GitHub'a Yükle

Terminal'de (VS Code içinde):

```bash
git init
git add .
git commit -m "İlk yükleme"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/kiyafet-magazasi.git
git push -u origin main
```

**Not:** `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın.

---

## 2️⃣ Backend'i Vercel'e Yükle

### Adım 1: Vercel'e Giriş Yap
1. https://vercel.com adresine git
2. "Sign Up" veya "Login" tıkla
3. GitHub ile giriş yap

### Adım 2: Backend'i Deploy Et
1. "Add New Project" tıkla
2. GitHub repository'nizi seçin: `kiyafet-magazasi`
3. "Import" tıkla
4. **Root Directory:** `backend` seçin
5. **Framework Preset:** Other
6. Environment Variables ekle:
   - `IYZICO_API_KEY`: sandbox-test
   - `IYZICO_SECRET_KEY`: sandbox-test
   - `IYZICO_BASE_URL`: https://sandbox-api.iyzipay.com
7. "Deploy" tıkla

✅ Backend URL'inizi kaydedin (örn: `https://kiyafet-magazasi-backend.vercel.app`)

---

## 3️⃣ Frontend'i Vercel'e Yükle

### Adım 1: API URL'ini Güncelle

`web/src/App.js` dosyasında:

```javascript
// Değiştir:
const API_URL = 'http://localhost:5000';

// Şununla:
const API_URL = 'https://kiyafet-magazasi-backend.vercel.app';
```

### Adım 2: Değişiklikleri GitHub'a Yükle

```bash
git add .
git commit -m "API URL güncellendi"
git push
```

### Adım 3: Frontend'i Deploy Et
1. Vercel'de "Add New Project" tıkla
2. Aynı repository'yi seçin
3. "Import" tıkla
4. **Root Directory:** `web` seçin
5. **Framework Preset:** Create React App
6. "Deploy" tıkla

✅ Frontend URL'inizi kaydedin (örn: `https://kiyafet-magazasi.vercel.app`)

---

## 4️⃣ CORS Ayarları

Backend'de CORS ayarlarını güncelle. `backend/server.js` dosyasında:

```javascript
// Mevcut:
app.use(cors());

// Şununla değiştir:
app.use(cors({
  origin: ['https://kiyafet-magazasi.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

Değişiklikleri yükle:
```bash
git add .
git commit -m "CORS ayarları güncellendi"
git push
```

Vercel otomatik olarak yeniden deploy edecek.

---

## ✅ Tamamlandı!

Web siteniz artık online! 🎉

**Frontend URL:** https://kiyafet-magazasi.vercel.app
**Backend URL:** https://kiyafet-magazasi-backend.vercel.app

---

## 🔧 Sorun Giderme

### Backend çalışmıyor?
1. Vercel dashboard'da "Deployments" sekmesine git
2. Son deployment'a tıkla
3. "Logs" sekmesinde hataları kontrol et

### Frontend backend'e bağlanamıyor?
1. `web/src/App.js` dosyasında API_URL'i kontrol et
2. Backend CORS ayarlarını kontrol et
3. Her iki site de HTTPS kullanmalı

### Değişiklik yapmak istiyorsanız:
1. Kodu düzenleyin
2. `git add .`
3. `git commit -m "Açıklama"`
4. `git push`
5. Vercel otomatik deploy edecek

---

## 💡 İpuçları

- Her `git push` yaptığınızda Vercel otomatik deploy eder
- Deployment süresi 1-2 dakika
- Ücretsiz plan yeterli (aylık 100GB bandwidth)
- Custom domain ekleyebilirsiniz (opsiyonel)

---

## 📞 Yardım

Sorun yaşarsanız:
1. Vercel dashboard'da logs kontrol edin
2. Browser console'da (F12) hataları kontrol edin
3. GitHub repository'nizin public olduğundan emin olun
