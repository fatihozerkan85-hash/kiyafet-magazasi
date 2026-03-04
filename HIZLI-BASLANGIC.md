# 🚀 Hızlı Başlangıç Rehberi

## Yerel Bilgisayarınızda Çalıştırma

### 1️⃣ Node.js Kurulumu

Eğer Node.js yüklü değilse:
- [Node.js İndir](https://nodejs.org/) (LTS versiyonu önerilir)
- İndirip kurun, varsayılan ayarlarla devam edin

### 2️⃣ Bağımlılıkları Yükleyin

Proje klasöründe terminali açın (klasöre sağ tıklayıp "Open in Terminal" veya "Git Bash Here"):

```bash
npm install
cd backend
npm install
cd ../web
npm install
cd ..
```

### 3️⃣ Uygulamayı Başlatın

**Windows için:**
`start.bat` dosyasına çift tıklayın

**Manuel başlatma:**

Terminal 1 (Backend):
```bash
cd backend
npm start
```

Terminal 2 (Web):
```bash
cd web
npm start
```

### 4️⃣ Tarayıcıda Açın

Otomatik açılmazsa: http://localhost:3000

---

## 🌐 Online Yayınlama (5 Dakikada)

### En Kolay Yöntem: Vercel

1. **GitHub'a yükleyin:**
   ```bash
   git init
   git add .
   git commit -m "İlk yükleme"
   ```
   
   GitHub'da yeni repo oluşturun ve:
   ```bash
   git remote add origin https://github.com/KULLANICI_ADINIZ/kiyafet-magazasi.git
   git push -u origin main
   ```

2. **Vercel'e deploy edin:**
   - [vercel.com](https://vercel.com) → GitHub ile giriş yapın
   - "New Project" → Reponuzu seçin
   - Root Directory: `backend` → Deploy
   - Backend URL'ini kopyalayın
   
   - Tekrar "New Project" → Aynı repoyu seçin
   - Root Directory: `web` → Deploy
   - Environment Variable ekleyin:
     - `REACT_APP_API_URL` = Backend URL'iniz
   - Deploy

✅ **Tamamlandı!** Siteniz artık online!

---

## 📱 Mobil Uygulamayı Test Etme

1. Expo CLI yükleyin:
```bash
npm install -g expo-cli
```

2. Mobil uygulamayı başlatın:
```bash
cd mobile
npm install
npm start
```

3. Telefonunuza "Expo Go" uygulamasını indirin
4. QR kodu tarayın

---

## ❓ Sorun Giderme

### "npm: command not found"
→ Node.js'i kurun: https://nodejs.org/

### "Port 3000 already in use"
→ Başka bir uygulama portu kullanıyor, kapatın veya:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Cannot connect to backend"
→ Backend'in çalıştığından emin olun (http://localhost:5000/api/urunler açılmalı)

### Sayfa yüklenmiyor
→ Tarayıcı cache'ini temizleyin (Ctrl + Shift + Delete)

---

## 📚 Daha Fazla Bilgi

- Detaylı kurulum: `KURULUM.md`
- Online yayınlama: `DEPLOYMENT.md`
- Proje yapısı: `README.md`

---

## 🎯 Sonraki Adımlar

1. ✅ Yerel ortamda çalıştırın
2. ✅ Online yayınlayın
3. 🔄 Gerçek ürün verilerini ekleyin
4. 🔄 Veritabanı bağlayın (MongoDB/PostgreSQL)
5. 🔄 Ödeme sistemi ekleyin (iyzico)
6. 🔄 Kullanıcı girişi ekleyin
7. 🔄 Admin paneli oluşturun

İyi çalışmalar! 🚀
