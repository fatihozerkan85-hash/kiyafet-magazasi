# 🛍️ Kıyafet Mağazası - Online Alışveriş Platformu

Türkiye'de kadın giyim ürünleri satışı için modern e-ticaret platformu.

## 🚀 Hızlı Başlangıç

### Yerel Ortamda Çalıştırma

1. Bağımlılıkları yükleyin:
```bash
npm install
cd backend && npm install
cd ../web && npm install
```

2. **Windows:** `start.bat` dosyasına çift tıklayın

   **Manuel:** İki terminal açın:
   ```bash
   # Terminal 1
   cd backend
   npm start
   
   # Terminal 2
   cd web
   npm start
   ```

3. Tarayıcıda açın: http://localhost:3000

### Online Yayınlama

Detaylı rehber için: [DEPLOYMENT.md](DEPLOYMENT.md)

Hızlı Vercel deploy:
```bash
# Backend
cd backend && vercel

# Web
cd web && vercel
```

## 📁 Proje Yapısı

- **web/** - React web uygulaması (müşteri arayüzü)
- **mobile/** - React Native mobil uygulama
- **backend/** - Node.js/Express API sunucusu
- **shared/** - Ortak TypeScript tipleri

## ✨ Özellikler

- ✅ Ürün listeleme ve detay sayfaları
- ✅ Kategori bazlı gezinme
- ✅ Sepet yönetimi (ekleme, çıkarma, adet değiştirme)
- ✅ Beden ve renk seçimi
- ✅ Responsive tasarım (mobil uyumlu)
- ✅ Türkçe dil desteği
- ✅ Modern ve şık arayüz
- 🔄 Kullanıcı girişi (yakında)
- 🔄 Ödeme entegrasyonu (yakında)
- 🔄 Sipariş takibi (yakında)

## 🛠️ Teknolojiler

**Frontend:**
- React 18
- React Router
- CSS3

**Mobile:**
- React Native
- Expo
- React Navigation

**Backend:**
- Node.js
- Express
- CORS

## 📖 Dokümantasyon

- [HIZLI-BASLANGIC.md](HIZLI-BASLANGIC.md) - Başlangıç rehberi
- [KURULUM.md](KURULUM.md) - Detaylı kurulum
- [DEPLOYMENT.md](DEPLOYMENT.md) - Online yayınlama

## 🎯 Sonraki Adımlar

1. Veritabanı entegrasyonu (MongoDB/PostgreSQL)
2. Kullanıcı authentication (JWT)
3. Ödeme sistemi (iyzico, PayTR)
4. Admin paneli
5. Ürün arama ve filtreleme
6. Favori ürünler
7. Sipariş geçmişi
8. Email bildirimleri

## 📝 Lisans

Bu proje eğitim amaçlıdır.
