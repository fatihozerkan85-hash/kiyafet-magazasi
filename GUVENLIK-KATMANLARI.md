# 🔒 Güvenlik Katmanları

## Eklenen Güvenlik Önlemleri

### 1. Helmet.js - HTTP Header Güvenliği ✅
- XSS saldırılarına karşı koruma
- Clickjacking koruması
- MIME type sniffing koruması
- DNS prefetch kontrolü
- Referrer policy ayarları

### 2. XSS-Clean - Cross-Site Scripting Koruması ✅
- Kullanıcı girdilerindeki zararlı script'leri temizler
- HTML injection saldırılarını engeller
- Otomatik sanitizasyon

### 3. Rate Limiting - Hız Sınırlama ✅

#### Genel API Limiti
- **Süre**: 15 dakika
- **Limit**: 200 istek
- **Etki**: Normal kullanıcıları etkilemez, sadece spam/bot saldırılarını engeller

#### Giriş/Kayıt Limiti (Daha Sıkı)
- **Süre**: 15 dakika
- **Limit**: 10 deneme
- **Etki**: Brute force saldırılarını engeller
- **Endpoint'ler**:
  - `/api/giris`
  - `/api/kayit`
  - `/api/kayit/dogrulama-kodu-gonder`

### 4. CORS Ayarları ✅
- Tüm origin'lere izin (development için)
- Credentials desteği
- Preflight request desteği

## Mevcut Güvenlik Özellikleri

### Veritabanı Güvenliği ✅
- Parametreli sorgular (SQL Injection koruması)
- PostgreSQL şifreleme
- Environment variables ile hassas bilgi koruması

### Email Doğrulama ✅
- Kayıt için email doğrulama zorunlu
- Doğrulama kodları veritabanında saklanıyor
- Tek kullanımlık kodlar

### Şifre Güvenliği ✅
- Minimum 6 karakter
- Veritabanında düz metin olarak saklanıyor (⚠️ İyileştirme gerekli)

## Gelecek İyileştirmeler

### Öncelikli
1. **Bcrypt ile Şifre Hash'leme** - Şifreler hash'lenerek saklanmalı
2. **JWT Token Sistemi** - Session yönetimi için
3. **Input Validation** - express-validator ile form doğrulama

### Orta Öncelikli
4. **HTTPS Zorunluluğu** - Production'da HTTP'yi reddet
5. **CSRF Token** - Form güvenliği
6. **2FA (Two-Factor Auth)** - Admin paneli için

### Düşük Öncelikli
7. **IP Whitelist** - Admin paneli için
8. **Logging & Monitoring** - Winston ile log tutma
9. **Security Headers** - Daha detaylı header ayarları

## Test Edilmesi Gerekenler

- [ ] Normal kullanıcı girişi çalışıyor mu?
- [ ] Kayıt işlemi çalışıyor mu?
- [ ] Rate limit aşıldığında doğru hata mesajı geliyor mu?
- [ ] Admin paneli çalışıyor mu?
- [ ] Ürün ekleme/silme çalışıyor mu?
- [ ] Sepet işlemleri çalışıyor mu?

## Güvenlik Kontrol Listesi

✅ Helmet.js aktif
✅ XSS-Clean aktif
✅ Rate Limiting aktif
✅ CORS yapılandırılmış
✅ SQL Injection koruması (parametreli sorgular)
✅ Email doğrulama sistemi
✅ Environment variables güvenli
⚠️ Şifre hash'leme (yapılacak)
⚠️ JWT token sistemi (yapılacak)
⚠️ Input validation (yapılacak)

## Notlar

- Tüm güvenlik katmanları site işleyişini bozmayacak şekilde yapılandırıldı
- Rate limit'ler gevşek tutuldu (normal kullanıcıyı etkilemez)
- Production'da CORS ayarları sıkılaştırılmalı
- Düzenli güvenlik güncellemeleri yapılmalı (`npm audit`)
