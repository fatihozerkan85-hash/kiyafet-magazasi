# 🚀 Admin Panel - Manuel Deploy Rehberi

## Sorun
`vercel` komutu bulunamadı. Vercel CLI kurulu değil.

## ✅ Çözüm 1: Vercel CLI Kur (Hızlı)

### Windows:
```bash
npm install -g vercel
```

### Kurulum Sonrası:
```bash
cd web
vercel login
vercel --prod
```

---

## ✅ Çözüm 2: Vercel Dashboard (CLI Gerektirmez)

### Adım 1: Vercel'e Git
https://vercel.com

### Adım 2: Giriş Yap
- GitHub hesabınla giriş yap

### Adım 3: Proje Bul
- Dashboard'da "kiyafet-magazasi" projesini bul
- Veya "Import Project" ile GitHub'dan ekle

### Adım 4: Deploy Ayarları
```
Framework Preset: Create React App
Root Directory: web
Build Command: npm run build
Output Directory: build
```

### Adım 5: Deploy
- "Deploy" butonuna tıkla
- 2-3 dakika bekle
- Hazır!

---

## ✅ Çözüm 3: GitHub Actions (Otomatik)

GitHub'a push yaptığınızda otomatik deploy olsun isterseniz:

### 1. Vercel Token Al
- Vercel Dashboard → Settings → Tokens
- Yeni token oluştur
- Kopyala

### 2. GitHub Secrets Ekle
- GitHub repo → Settings → Secrets
- `VERCEL_TOKEN` ekle
- `VERCEL_ORG_ID` ekle
- `VERCEL_PROJECT_ID` ekle

### 3. GitHub Action Dosyası
`.github/workflows/deploy.yml` oluştur (ben hazırlayacağım)

---

## 🎯 En Kolay Yöntem: Vercel Dashboard

1. https://vercel.com/login
2. GitHub ile giriş yap
3. "kiyafet-magazasi" projesini bul
4. "Redeploy" butonuna tıkla
5. Bitti!

---

## 📝 Vercel CLI Kurulum Detayları

### Kurulum:
```bash
npm install -g vercel
```

### İlk Kullanım:
```bash
vercel login
```

Browser açılacak, giriş yap.

### Deploy:
```bash
cd web
vercel --prod
```

---

## 🔍 Vercel CLI Kurulu mu Kontrol

```bash
vercel --version
```

Eğer versiyon gösteriyorsa kurulu demektir.

---

## ⚡ Hızlı Çözüm

**En hızlı yöntem:**

1. https://vercel.com/dashboard
2. Projenizi bulun
3. "Redeploy" tıklayın
4. Admin panel hazır!

**Vercel otomatik olarak:**
- ✅ `web` klasörünü build eder
- ✅ `admin.html` ve `admin-tam.html` dosyalarını kopyalar
- ✅ Deploy eder

---

## 🎉 Sonuç

Vercel CLI kurmadan da deploy edebilirsiniz. Vercel Dashboard kullanın:

**URL:** https://vercel.com/dashboard

**Adımlar:**
1. Giriş yap
2. Projeyi bul
3. Redeploy tıkla
4. Admin panel hazır!

**Admin Panel URL:**
```
https://kiyafet-magazasi.vercel.app/admin-tam.html
```

**Giriş:**
- Kullanıcı: admin
- Şifre: admin123
