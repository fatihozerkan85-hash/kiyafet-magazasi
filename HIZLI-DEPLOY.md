# ⚡ Hızlı Deployment Rehberi

## 🚀 3 Adımda Online Yayınla

### 1️⃣ GitHub'a Yükle (İlk Kez)

```bash
git init
git add .
git commit -m "İlk yükleme"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/kiyafet-magazasi.git
git push -u origin main
```

### 2️⃣ Vercel'e Deploy Et

#### Backend:
1. https://vercel.com → Login (GitHub ile)
2. "Add New Project"
3. Repository seç: `kiyafet-magazasi`
4. **Root Directory:** `backend`
5. **Environment Variables:**
   - `IYZICO_API_KEY` = `sandbox-test`
   - `IYZICO_SECRET_KEY` = `sandbox-test`
   - `IYZICO_BASE_URL` = `https://sandbox-api.iyzipay.com`
6. Deploy

**Backend URL'i kaydet!** (örn: https://kiyafet-magazasi-backend.vercel.app)

#### Frontend:
1. Vercel'de "Add New Project"
2. Aynı repository'yi seç
3. **Root Directory:** `web`
4. **Framework:** Create React App
5. Deploy

**Frontend URL'i kaydet!** (örn: https://kiyafet-magazasi.vercel.app)

### 3️⃣ API URL'ini Güncelle

`web/src/App.js` dosyasında 3. satırı değiştir:

```javascript
const API_URL = 'https://BACKEND-URL-BURAYA';
```

Sonra:
```bash
git add .
git commit -m "API URL güncellendi"
git push
```

✅ **TAMAMLANDI!** Web siteniz online! 🎉

---

## 🔄 Güncelleme Yapmak İçin

Kod değiştirdikten sonra:

```bash
git add .
git commit -m "Değişiklik açıklaması"
git push
```

Vercel otomatik deploy eder (1-2 dakika).

---

## 📝 Önemli Notlar

- GitHub repository **public** olmalı
- Her `git push` otomatik deploy tetikler
- Deployment logları Vercel dashboard'da
- Ücretsiz plan yeterli
- HTTPS otomatik aktif

---

## 🎯 Sonuç

**Frontend:** https://kiyafet-magazasi.vercel.app
**Backend:** https://kiyafet-magazasi-backend.vercel.app

Test hesabı:
- Email: admin@kiyafet.com
- Şifre: admin123

Kuponlar: HOSGELDIN, YENISEZON, 50TL
