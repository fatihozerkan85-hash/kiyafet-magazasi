# Kurulum ve Çalıştırma Rehberi

## Gereksinimler

- Node.js (v16 veya üzeri) - [İndir](https://nodejs.org/)
- npm (Node.js ile birlikte gelir)

## Yerel Ortamda Çalıştırma

### 1. Bağımlılıkları Yükleyin

Proje klasöründe terminali açın ve şu komutu çalıştırın:

```bash
npm install
cd backend && npm install
cd ../web && npm install
```

### 2. Backend Sunucusunu Başlatın

Yeni bir terminal açın ve:

```bash
cd backend
npm start
```

Backend http://localhost:5000 adresinde çalışacak.

### 3. Web Uygulamasını Başlatın

Başka bir terminal açın ve:

```bash
cd web
npm start
```

Web uygulaması http://localhost:3000 adresinde açılacak.

### 4. Mobil Uygulamayı Çalıştırma (Opsiyonel)

Expo CLI'yi yükleyin:

```bash
npm install -g expo-cli
```

Sonra:

```bash
cd mobile
npm install
npm start
```

Expo Go uygulamasını telefonunuza indirin ve QR kodu tarayın.

---

## Online Yayınlama (Deployment)

### Seçenek 1: Vercel (Önerilen - Ücretsiz)

#### Backend için:

1. [Vercel](https://vercel.com) hesabı oluşturun
2. Vercel CLI'yi yükleyin:
```bash
npm install -g vercel
```

3. Backend klasöründe:
```bash
cd backend
vercel
```

4. Vercel size bir URL verecek (örn: https://your-app.vercel.app)

#### Web için:

1. Web klasöründe:
```bash
cd web
```

2. `web/src/pages/AnaSayfa.js` ve `web/src/pages/UrunDetay.js` dosyalarında API URL'ini güncelleyin:
```javascript
// Değiştir: http://localhost:5000
// Yeni: https://your-backend.vercel.app
```

3. Deploy edin:
```bash
vercel
```

### Seçenek 2: Netlify (Web için)

1. [Netlify](https://netlify.com) hesabı oluşturun
2. Web klasöründe build alın:
```bash
cd web
npm run build
```

3. `build` klasörünü Netlify'a sürükle-bırak yapın

### Seçenek 3: Railway (Backend için)

1. [Railway](https://railway.app) hesabı oluşturun
2. "New Project" > "Deploy from GitHub"
3. Backend klasörünü seçin
4. Otomatik deploy olacak

### Seçenek 4: Render (Hem Backend hem Web)

1. [Render](https://render.com) hesabı oluşturun
2. "New +" > "Web Service"
3. GitHub reponuzu bağlayın
4. Backend ve Web için ayrı servisler oluşturun

---

## Hızlı Test için Ngrok

Yerel uygulamanızı hızlıca internete açmak için:

1. [Ngrok](https://ngrok.com) indirin
2. Backend çalışırken:
```bash
ngrok http 5000
```

3. Size verilen URL'i web uygulamasında kullanın

---

## Mobil Uygulama Yayınlama

### Android için:

```bash
cd mobile
expo build:android
```

### iOS için:

```bash
cd mobile
expo build:ios
```

Build dosyalarını Google Play Store ve App Store'a yükleyin.

---

## Sorun Giderme

### Port zaten kullanımda hatası:

Windows'ta:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID_NUMARASI> /F
```

### CORS hatası:

Backend'de `server.js` dosyasında CORS ayarları zaten yapılandırılmış. Eğer sorun devam ederse, frontend URL'inizi backend'e ekleyin.

### Bağlantı hatası:

- Backend'in çalıştığından emin olun
- API URL'lerinin doğru olduğunu kontrol edin
- Firewall ayarlarını kontrol edin
