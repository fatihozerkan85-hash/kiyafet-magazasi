# ✅ Deployment Checklist

## Hazırlık Tamamlandı! ✅

Tüm dosyalar online yayın için hazır. İşte yapmanız gerekenler:

---

## 📋 Adım Adım

### 1. GitHub Hesabı Oluştur (Yoksa)
- https://github.com/signup
- Email doğrula

### 2. Git Kurulu mu Kontrol Et
Terminal'de:
```bash
git --version
```
Eğer hata verirse: https://git-scm.com/download/win

### 3. GitHub'a Yükle

Terminal'de (VS Code içinde):

```bash
git config --global user.name "Adınız"
git config --global user.email "email@example.com"

git init
git add .
git commit -m "Kıyafet mağazası ilk yükleme"
git branch -M main
```

GitHub'da yeni repository oluştur:
- İsim: `kiyafet-magazasi`
- Public seç
- Create repository

Sonra terminal'de:
```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/kiyafet-magazasi.git
git push -u origin main
```

### 4. Vercel'e Deploy Et

#### A) Backend Deploy:
1. https://vercel.com → GitHub ile giriş
2. "Add New Project"
3. `kiyafet-magazasi` repository'sini seç
4. **Configure Project:**
   - Project Name: `kiyafet-magazasi-backend`
   - Root Directory: `backend`
   - Framework Preset: Other
5. **Environment Variables** ekle:
   ```
   IYZICO_API_KEY = sandbox-test
   IYZICO_SECRET_KEY = sandbox-test
   IYZICO_BASE_URL = https://sandbox-api.iyzipay.com
   ```
6. "Deploy" tıkla
7. **Backend URL'i kaydet!** (örn: https://kiyafet-magazasi-backend.vercel.app)

#### B) Frontend Deploy:
1. Vercel'de "Add New Project"
2. Aynı `kiyafet-magazasi` repository'sini seç
3. **Configure Project:**
   - Project Name: `kiyafet-magazasi`
   - Root Directory: `web`
   - Framework Preset: Create React App
4. **Environment Variables** ekle:
   ```
   REACT_APP_API_URL = https://BACKEND-URL-BURAYA
   ```
   (Yukarıda kaydettiğiniz backend URL'i buraya yapıştırın)
5. "Deploy" tıkla

### 5. Test Et!

Frontend URL'inizi açın (örn: https://kiyafet-magazasi.vercel.app)

**Test hesabı:**
- Email: admin@kiyafet.com
- Şifre: admin123

**Test kuponları:**
- HOSGELDIN
- YENISEZON
- 50TL

---

## 🎉 Tamamlandı!

Web siteniz artık online ve çalışıyor!

---

## 🔄 Güncelleme Yapmak İçin

Kod değiştirdikten sonra:

```bash
git add .
git commit -m "Değişiklik açıklaması"
git push
```

Vercel otomatik olarak her iki projeyi de yeniden deploy eder.

---

## 📊 Kontrol Listesi

- [ ] Git kurulu
- [ ] GitHub hesabı var
- [ ] Repository oluşturuldu
- [ ] Kod GitHub'a yüklendi
- [ ] Backend Vercel'e deploy edildi
- [ ] Backend URL kaydedildi
- [ ] Frontend Vercel'e deploy edildi
- [ ] Frontend environment variable ayarlandı
- [ ] Site test edildi
- [ ] Giriş yapıldı
- [ ] Ürün eklendi
- [ ] Ödeme test edildi

---

## 🆘 Sorun mu Var?

### Backend çalışmıyor:
1. Vercel dashboard → Deployments → Son deployment → Logs
2. Environment variables doğru mu kontrol et

### Frontend backend'e bağlanamıyor:
1. Vercel dashboard → Frontend project → Settings → Environment Variables
2. `REACT_APP_API_URL` doğru mu kontrol et
3. Redeploy et

### CORS hatası:
Backend'de CORS ayarları zaten yapıldı, sorun olmamalı.

---

## 💡 İpuçları

- Deployment 1-2 dakika sürer
- Her git push otomatik deploy tetikler
- Ücretsiz plan yeterli (100GB/ay)
- Custom domain ekleyebilirsiniz
- SSL/HTTPS otomatik aktif

---

## 📞 Destek

Sorun yaşarsanız:
1. Vercel logs kontrol edin
2. Browser console (F12) kontrol edin
3. GitHub repository public mi kontrol edin

**Başarılar! 🚀**
