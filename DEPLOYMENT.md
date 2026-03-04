# Online Yayınlama Rehberi

## En Kolay Yöntem: Vercel (Ücretsiz)

### Adım 1: GitHub'a Yükleyin

1. [GitHub](https://github.com) hesabı oluşturun
2. Yeni repository oluşturun
3. Projenizi yükleyin:

```bash
git init
git add .
git commit -m "İlk commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/kiyafet-magazasi.git
git push -u origin main
```

### Adım 2: Vercel'e Deploy Edin

#### Backend için:

1. [Vercel](https://vercel.com) hesabı oluşturun (GitHub ile giriş yapın)
2. "Add New Project" tıklayın
3. GitHub reponuzu seçin
4. Root Directory: `backend` seçin
5. "Deploy" tıklayın
6. Deploy edilen URL'i kopyalayın (örn: `https://kiyafet-magazasi-backend.vercel.app`)

#### Web için:

1. Vercel'de "Add New Project" tıklayın
2. Aynı repoyu seçin
3. Root Directory: `web` seçin
4. Environment Variables ekleyin:
   - Key: `REACT_APP_API_URL`
   - Value: Backend URL'iniz (yukarıda kopyaladığınız)
5. "Deploy" tıklayın

✅ Tamamlandı! Web siteniz artık online!

---

## Alternatif: Netlify + Railway

### Backend için Railway:

1. [Railway](https://railway.app) hesabı oluşturun
2. "New Project" > "Deploy from GitHub repo"
3. `backend` klasörünü seçin
4. Otomatik deploy olacak
5. URL'i kopyalayın

### Web için Netlify:

1. [Netlify](https://netlify.com) hesabı oluşturun
2. "Add new site" > "Import from Git"
3. GitHub reponuzu seçin
4. Build settings:
   - Base directory: `web`
   - Build command: `npm run build`
   - Publish directory: `web/build`
5. Environment variables:
   - `REACT_APP_API_URL`: Railway backend URL'iniz
6. "Deploy" tıklayın

---

## Hızlı Test: Replit (Kodlama Gerekmez)

1. [Replit](https://replit.com) hesabı oluşturun
2. "Create Repl" > "Import from GitHub"
3. GitHub URL'inizi yapıştırın
4. "Run" butonuna basın
5. Otomatik olarak çalışacak ve size bir URL verecek

---

## Mobil Uygulama için Expo

### Expo'da Yayınlama:

```bash
cd mobile
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android
```

Build tamamlandığında APK dosyasını indirebilir ve paylaşabilirsiniz.

---

## Ücretsiz Hosting Seçenekleri

| Platform | Backend | Frontend | Ücretsiz Limit |
|----------|---------|----------|----------------|
| Vercel | ✅ | ✅ | Sınırsız |
| Netlify | ❌ | ✅ | 100GB/ay |
| Railway | ✅ | ✅ | 500 saat/ay |
| Render | ✅ | ✅ | 750 saat/ay |
| Heroku | ✅ | ✅ | Uyku modu var |

---

## Domain Bağlama

Vercel veya Netlify'da:

1. Project Settings > Domains
2. "Add Domain" tıklayın
3. Kendi domain'inizi girin (örn: kiyafetmagazam.com)
4. DNS ayarlarını yapın (platform size gösterecek)

Ücretsiz domain için: [Freenom](https://freenom.com) veya [.tk domains](https://dot.tk)

---

## Önemli Notlar

⚠️ **Üretim için yapılması gerekenler:**

1. Gerçek veritabanı ekleyin (MongoDB, PostgreSQL)
2. Kullanıcı authentication ekleyin
3. Ödeme sistemi entegre edin (iyzico, PayTR)
4. SSL sertifikası (Vercel/Netlify otomatik sağlar)
5. Gerçek ürün resimleri yükleyin
6. SEO optimizasyonu yapın

---

## Yardım

Sorun yaşarsanız:
- Vercel: [Dokümantasyon](https://vercel.com/docs)
- Netlify: [Dokümantasyon](https://docs.netlify.com)
- Railway: [Dokümantasyon](https://docs.railway.app)
