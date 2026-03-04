# 🚀 Yeni Özellikler - Kullanım Kılavuzu

## ✅ Eklenen 4 Yeni Özellik

### 1. 📸 Resim Upload Sistemi
### 2. 📦 Sipariş Durumu Güncelleme
### 3. 📧 Email Bildirimleri
### 4. 📱 SMS Entegrasyonu

---

## 1. 📸 Resim Upload Sistemi

### Nasıl Kullanılır?

#### Ürün Eklerken:
1. Admin Panel → Ürünler sekmesi
2. "Yeni Ürün Ekle" formu
3. "Resim URL veya Resim Yükle" bölümü
4. **"📸 Bilgisayardan Resim Seç"** butonuna tıkla
5. Bilgisayarınızdan resim seç (max 2MB)
6. Resim otomatik yüklenir
7. Önizleme görünür
8. Formu doldur ve "Ürün Ekle"

#### Desteklenen Formatlar:
- JPG, JPEG
- PNG
- GIF
- WebP

#### Özellikler:
- ✅ Otomatik yükleme
- ✅ Önizleme
- ✅ Boyut kontrolü (max 2MB)
- ✅ Base64 encoding
- ✅ Hızlı yükleme

#### Not:
Şu anda resimler base64 olarak kaydediliyor. Production'da Cloudinary veya AWS S3 kullanılmalı.

---

## 2. 📦 Sipariş Durumu Güncelleme

### Nasıl Kullanılır?

#### Sipariş Durumu Değiştirme:
1. Admin Panel → Siparişler sekmesi
2. Sipariş listesinde **"Detay"** butonuna tıkla
3. Sipariş detayı açılır
4. **"Sipariş Durumu Güncelle"** formu
5. Yeni durumu seç:
   - ⏳ Ödeme Bekleniyor
   - 📦 Hazırlanıyor
   - 🚚 Kargoya Verildi
   - 🚛 Kargoda
   - ✅ Teslim Edildi
   - ❌ İptal Edildi
6. Kargo bilgilerini gir (opsiyonel):
   - Kargo Firması (örn: Aras Kargo)
   - Takip Numarası
7. Açıklama ekle (opsiyonel)
8. **"Durumu Güncelle"** butonuna tıkla

#### Otomatik İşlemler:
- ✅ Durum güncellenir
- ✅ Müşteriye email gönderilir
- ✅ Müşteriye SMS gönderilir
- ✅ Durum geçmişi kaydedilir

#### Durum Açıklamaları:
- **Ödeme Bekleniyor:** Ödeme henüz alınmadı
- **Hazırlanıyor:** Sipariş paketleniyor
- **Kargoya Verildi:** Kargoya teslim edildi
- **Kargoda:** Kargo yolda
- **Teslim Edildi:** Müşteriye ulaştı
- **İptal Edildi:** Sipariş iptal edildi

---

## 3. 📧 Email Bildirimleri

### Otomatik Email Gönderimi

#### Ne Zaman Gönderilir?
Sipariş durumu değiştiğinde otomatik email gönderilir:

1. **Hazırlanıyor:**
   - Konu: "Siparişiniz Hazırlanıyor"
   - İçerik: Sipariş no ve durum bilgisi

2. **Kargoya Verildi:**
   - Konu: "Siparişiniz Kargoya Verildi"
   - İçerik: Kargo firması ve takip numarası

3. **Teslim Edildi:**
   - Konu: "Siparişiniz Teslim Edildi"
   - İçerik: Teşekkür mesajı

#### Manuel Email Gönderimi:
1. Sipariş detayında
2. **"📧 Email Gönder"** butonuna tıkla
3. Email otomatik gönderilir

#### Email Şablonları:
Şu anda basit şablonlar kullanılıyor. İsterseniz HTML şablonları eklenebilir.

#### Production İçin:
Gerçek projede Nodemailer kullanılmalı:
```javascript
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

---

## 4. 📱 SMS Entegrasyonu

### Otomatik SMS Gönderimi

#### Ne Zaman Gönderilir?
Sipariş durumu değiştiğinde otomatik SMS gönderilir:

1. **Hazırlanıyor:**
   - Mesaj: "Siparişiniz hazırlanıyor. Sipariş No: S1001"

2. **Kargoya Verildi:**
   - Mesaj: "Siparişiniz kargoya verildi. Takip No: 1234567890"

3. **Teslim Edildi:**
   - Mesaj: "Siparişiniz teslim edildi. Teşekkürler!"

#### Manuel SMS Gönderimi:
1. Sipariş detayında
2. **"📱 SMS Gönder"** butonuna tıkla
3. SMS otomatik gönderilir

#### SMS Sağlayıcıları:

**Netgsm:**
- Website: https://www.netgsm.com.tr
- API Dok: https://www.netgsm.com.tr/dokuman
- Fiyat: ~0.05 TL/SMS

**İletimerkezi:**
- Website: https://www.iletimerkezi.com
- API Dok: https://www.iletimerkezi.com/api-dokumantasyon
- Fiyat: ~0.04 TL/SMS

#### Production İçin:
Gerçek projede SMS API kullanılmalı:

**Netgsm Örneği:**
```javascript
const axios = require('axios');

axios.post('https://api.netgsm.com.tr/sms/send/get', {
  usercode: process.env.NETGSM_USER,
  password: process.env.NETGSM_PASS,
  gsmno: '5555555555',
  message: 'Siparişiniz hazırlanıyor',
  msgheader: 'KIYAFET'
});
```

**İletimerkezi Örneği:**
```javascript
axios.post('https://api.iletimerkezi.com/v1/send-sms', {
  username: process.env.ILETIMERKEZI_USER,
  password: process.env.ILETIMERKEZI_PASS,
  text: 'Siparişiniz hazırlanıyor',
  receipents: ['5555555555'],
  sender: 'KIYAFET'
});
```

---

## 🎯 Kullanım Senaryoları

### Senaryo 1: Yeni Ürün Ekle (Resim Upload)
1. Admin Panel → Ürünler
2. "Bilgisayardan Resim Seç"
3. Resim seç (örn: nike-ayakkabi.jpg)
4. Resim yüklenir
5. Diğer bilgileri doldur
6. "Ürün Ekle"
7. Ürün ana sitede görünür

### Senaryo 2: Sipariş Durumu Güncelle
1. Admin Panel → Siparişler
2. Sipariş detayına git
3. Durum: "Kargoya Verildi"
4. Kargo: "Aras Kargo"
5. Takip No: "1234567890"
6. "Durumu Güncelle"
7. Müşteriye email ve SMS gider

### Senaryo 3: Manuel Bildirim Gönder
1. Sipariş detayında
2. "Email Gönder" veya "SMS Gönder"
3. Bildirim gönderilir
4. Başarı mesajı görünür

---

## 🔧 Teknik Detaylar

### Backend API'leri:

#### Resim Upload:
```
POST /api/admin/resim-yukle
Body: { resimBase64, dosyaAdi }
Response: { basarili, url }
```

#### Sipariş Durumu:
```
PUT /api/admin/siparis/:id/durum
Body: { durum, kargoFirmasi, kargoTakipNo, aciklama }
Response: { basarili, siparis }
```

#### Email Gönder:
```
POST /api/admin/email-gonder
Body: { alici, konu, icerik }
Response: { basarili, emailId }
```

#### SMS Gönder:
```
POST /api/admin/sms-gonder
Body: { telefon, mesaj }
Response: { basarili, smsId }
```

---

## 📊 Özellik Karşılaştırması

### Önceki Versiyon:
- ❌ Resim upload yok (sadece URL)
- ❌ Sipariş durumu değiştirilemez
- ❌ Email bildirimi yok
- ❌ SMS bildirimi yok

### Yeni Versiyon:
- ✅ Resim upload (bilgisayardan)
- ✅ Sipariş durumu güncelleme
- ✅ Otomatik email bildirimi
- ✅ Otomatik SMS bildirimi
- ✅ Kargo takip entegrasyonu
- ✅ Durum geçmişi

---

## 🚀 Production Hazırlığı

### Yapılması Gerekenler:

#### 1. Cloudinary Entegrasyonu:
```bash
npm install cloudinary
```

```javascript
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
```

#### 2. Nodemailer Kurulumu:
```bash
npm install nodemailer
```

#### 3. SMS API Entegrasyonu:
- Netgsm veya İletimerkezi hesabı aç
- API key al
- .env dosyasına ekle

#### 4. Environment Variables:
```
# .env dosyası
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

NETGSM_USER=your-username
NETGSM_PASS=your-password

ILETIMERKEZI_USER=your-username
ILETIMERKEZI_PASS=your-password
```

---

## 🎉 Özet

Yeni özelliklerle admin paneliniz artık:
- ✅ Resim yükleyebilir
- ✅ Sipariş durumlarını güncelleyebilir
- ✅ Müşterilere email gönderebilir
- ✅ Müşterilere SMS gönderebilir

**Profesyonel bir e-ticaret yönetim sistemi!** 🚀

---

## 📞 Destek

Sorularınız için:
- Backend loglarını kontrol edin
- Browser console'u kontrol edin (F12)
- Network sekmesinde API çağrılarını kontrol edin
