# 🤖 ASL BUTIQUE - n8n Otomasyon Sistemi

## 📋 Kurulu Otomasyonlar

| # | Otomasyon | Tetikleyici | Kanal |
|---|-----------|-------------|-------|
| 1 | Yeni Sipariş Bildirimi | Sipariş oluşturulduğunda | Email + Telegram |
| 2 | Sipariş Durum Değişikliği | Admin durum güncellediğinde | Müşteriye Email |
| 3 | Düşük Stok Uyarısı | Her 6 saatte otomatik | Email |
| 4 | Yeni Ürün → Sosyal Medya | Ürün eklendiğinde | Instagram + Email |
| 5 | Kampanya Otomatik Yönetim | Her saat kontrol | Otomatik aç/kapat |
| 6 | Günlük Satış Raporu | Her gün 21:00 | Email + Telegram |
| 7 | Terk Edilmiş Sepet | Her gün 10:00 | Email |
| 8 | Instagram Günlük Paylaşım | Her gün 12:00 | Instagram (3 ürün) |

---

## 🚀 ADIM 1: n8n Kurulumu

### Seçenek A: n8n Cloud (Önerilen - Kolay)
1. https://n8n.io adresine git
2. "Get Started Free" tıkla
3. Hesap oluştur (ücretsiz plan: 5 workflow)
4. Dashboard'a gir

### Seçenek B: Self-Hosted (Ücretsiz, Sınırsız)
```bash
# Docker ile kurulum
docker run -d --name n8n -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=güçlü-şifre \
  n8nio/n8n
```
Tarayıcıda: http://localhost:5678

---

## 🔧 ADIM 2: Workflow'ları İçe Aktar

1. n8n Dashboard'da sol menüden "Workflows" tıkla
2. "Import from File" seç
3. `n8n-workflows/` klasöründeki JSON dosyalarını sırayla içe aktar:
   - `01-yeni-siparis-bildirimi.json`
   - `02-siparis-durum-bildirimi.json`
   - `03-dusuk-stok-uyarisi.json`
   - `04-yeni-urun-sosyal-medya.json`
   - `05-kampanya-otomatik-yonetim.json`
   - `06-gunluk-rapor.json`
   - `07-terk-sepet-hatirlatma.json`
   - `08-instagram-gunluk-paylasim.json`

---

## 🔗 ADIM 3: Webhook URL'lerini Backend'e Ekle

Her webhook workflow'u içe aktardığında, n8n sana bir webhook URL verir.

1. n8n'de workflow'u aç
2. Webhook node'una tıkla
3. "Production URL" kopyala
4. **Vercel Dashboard** → Backend projesi → Settings → Environment Variables
5. İlgili değişkene yapıştır:

```
N8N_WEBHOOK_YENI_SIPARIS=https://your-n8n.app/webhook/asl-yeni-siparis
N8N_WEBHOOK_SIPARIS_DURUM=https://your-n8n.app/webhook/asl-siparis-durum
N8N_WEBHOOK_DUSUK_STOK=https://your-n8n.app/webhook/asl-dusuk-stok
N8N_WEBHOOK_YENI_URUN=https://your-n8n.app/webhook/asl-yeni-urun
N8N_WEBHOOK_YENI_KAYIT=https://your-n8n.app/webhook/asl-yeni-kayit
N8N_WEBHOOK_KAMPANYA_KONTROL=https://your-n8n.app/webhook/asl-kampanya
N8N_WEBHOOK_GUNLUK_RAPOR=https://your-n8n.app/webhook/asl-rapor
N8N_WEBHOOK_TERK_SEPET=https://your-n8n.app/webhook/asl-terk-sepet
N8N_WEBHOOK_INSTAGRAM=https://your-n8n.app/webhook/asl-instagram
```

6. Backend'i yeniden deploy et

---

## 📱 ADIM 4: Telegram Bot Kurulumu (Opsiyonel)

1. Telegram'da @BotFather'a mesaj at
2. `/newbot` yaz
3. Bot adı: `ASL Butique Bildirim`
4. Token'ı al → n8n'de Environment Variable olarak ekle:
   - `TELEGRAM_BOT_TOKEN=123456:ABC-DEF...`
5. Bot'a bir mesaj at, sonra bu URL'yi aç:
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
6. `chat_id` değerini al → n8n'e ekle:
   - `TELEGRAM_CHAT_ID=123456789`

---

## 📸 ADIM 5: Instagram API Kurulumu

### Gereksinimler:
- Instagram Business hesabı
- Facebook Page (Instagram'a bağlı)
- Meta Developer hesabı

### Kurulum:
1. https://developers.facebook.com adresine git
2. "My Apps" → "Create App" → "Business" seç
3. "Instagram Graph API" ekle
4. Permissions: `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`
5. Access Token oluştur (60 günlük, sonra yenile)
6. n8n Environment Variables:
   - `INSTAGRAM_ACCESS_TOKEN=EAAxxxxxxx...`
   - `INSTAGRAM_BUSINESS_ID=17841400000000`

### Instagram Business ID Bulma:
```
GET https://graph.facebook.com/v18.0/me/accounts?access_token=TOKEN
```
Dönen page_id ile:
```
GET https://graph.facebook.com/v18.0/{page_id}?fields=instagram_business_account&access_token=TOKEN
```

---

## 📧 ADIM 6: n8n Email Ayarları

n8n'de Settings → Credentials → "Email (SMTP)" ekle:
- Host: `smtp.gmail.com`
- Port: `465`
- SSL: `true`
- User: Gmail adresiniz
- Password: Gmail App Password (16 haneli)

n8n Environment Variables:
- `EMAIL_FROM=ASL BUTIQUE <email@gmail.com>`
- `ADMIN_EMAIL=admin-email@gmail.com`

---

## 🧪 Test Etme

### Backend API'den Test:
```bash
# Günlük rapor test
curl -X POST https://kiyafet-magazasi-backend.vercel.app/api/n8n/gunluk-rapor

# Stok kontrol test
curl -X POST https://kiyafet-magazasi-backend.vercel.app/api/n8n/stok-kontrol

# Kampanya kontrol test
curl -X POST https://kiyafet-magazasi-backend.vercel.app/api/n8n/kampanya-kontrol

# Instagram paylaşım verisi test
curl -X POST https://kiyafet-magazasi-backend.vercel.app/api/n8n/instagram-paylasim

# Terk sepet kontrol test
curl -X POST https://kiyafet-magazasi-backend.vercel.app/api/n8n/terk-sepet-kontrol

# n8n entegrasyon durumu
curl https://kiyafet-magazasi-backend.vercel.app/api/n8n/durum
```

### n8n'den Test:
- Her workflow'u açıp "Execute Workflow" butonuna tıkla
- Webhook workflow'ları için "Test URL" kullan

---

## 📊 Backend API Endpoint'leri (n8n İçin)

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/api/n8n/gunluk-rapor` | POST | Günlük satış raporu verisini döner |
| `/api/n8n/stok-kontrol` | POST | Stok tükenen ürünleri kontrol eder |
| `/api/n8n/kampanya-kontrol` | POST | Kampanyaları otomatik başlatır/bitirir |
| `/api/n8n/instagram-paylasim` | POST | Rastgele 3 ürün + caption hazırlar |
| `/api/n8n/terk-sepet-kontrol` | POST | Pasif kullanıcıları listeler |
| `/api/n8n/durum` | GET | n8n entegrasyon durumunu gösterir |

---

## ⚡ Otomatik Tetiklenen Webhook'lar

Bu webhook'lar backend'de otomatik çalışır (n8n URL tanımlıysa):

| Olay | Webhook | Veri |
|------|---------|------|
| Yeni sipariş | `N8N_WEBHOOK_YENI_SIPARIS` | Sipariş detayları |
| Durum değişikliği | `N8N_WEBHOOK_SIPARIS_DURUM` | Yeni durum + müşteri bilgisi |
| Yeni ürün ekleme | `N8N_WEBHOOK_YENI_URUN` | Ürün + Instagram caption |
| Yeni kullanıcı kaydı | `N8N_WEBHOOK_YENI_KAYIT` | Kullanıcı bilgileri |
