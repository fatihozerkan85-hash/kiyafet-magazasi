# Gmail Email Doğrulama Sistemi Kurulum Rehberi

## ✅ Sistem Kuruldu!

Email doğrulama sistemi başarıyla kuruldu. Artık kullanıcılar kayıt olurken email adreslerini doğrulamaları gerekiyor.

## 📧 Gmail App Password Oluşturma (Zorunlu)

Email göndermek için Gmail App Password oluşturmanız gerekiyor:

### Adım 1: Gmail Hesabınıza Giriş Yapın
- Gmail hesabınıza giriş yapın (işletme için kullanacağınız email)

### Adım 2: 2 Adımlı Doğrulama Açın
1. https://myaccount.google.com/security adresine gidin
2. "2 Adımlı Doğrulama" bölümünü bulun
3. Eğer kapalıysa açın (zorunlu)

### Adım 3: App Password Oluşturun
1. https://myaccount.google.com/apppasswords adresine gidin
2. "Uygulama seç" → "Diğer (Özel ad)" seçin
3. İsim: "ASL BUTIQUE Email" yazın
4. "Oluştur" butonuna tıklayın
5. **16 haneli şifreyi kopyalayın** (örn: abcd efgh ijkl mnop)

### Adım 4: .env Dosyasını Güncelleyin

`backend/.env` dosyasını açın ve şu satırları güncelleyin:

```env
EMAIL_USER=sizin-email@gmail.com
EMAIL_PASS=abcdefghijklmnop
EMAIL_FROM=ASL BUTIQUE <sizin-email@gmail.com>
```

**Önemli:** 
- `EMAIL_PASS` kısmına 16 haneli App Password'ü yazın (boşluksuz)
- `EMAIL_USER` ve `EMAIL_FROM` kısmına Gmail adresinizi yazın

### Adım 5: Vercel'de Environment Variables Ekleyin

1. https://vercel.com/dashboard adresine gidin
2. Projenizi seçin (kiyafet-magazasi-backend)
3. Settings → Environment Variables
4. Şu 3 değişkeni ekleyin:
   - `EMAIL_USER` = sizin-email@gmail.com
   - `EMAIL_PASS` = 16 haneli app password
   - `EMAIL_FROM` = ASL BUTIQUE <sizin-email@gmail.com>
5. "Save" butonuna tıklayın
6. Deployments → Latest Deployment → "Redeploy" yapın

## 🎯 Nasıl Çalışır?

1. Kullanıcı kayıt formunu doldurur
2. Email alanına email girer ve "Kod Gönder" butonuna tıklar
3. Sistem 6 haneli kod oluşturur ve email gönderir
4. Kullanıcı gelen kodu girer
5. Kod doğrulanırsa kayıt tamamlanır

## 📊 Veritabanı Değişiklikleri

Otomatik olarak eklendi:
- `kullanicilar` tablosuna `email_verified` kolonu
- `email_verifications` tablosu (kod, email, süre)

## 🔒 Güvenlik

- Doğrulama kodları 10 dakika geçerli
- Her email için sadece 1 aktif kod
- Kod kullanıldıktan sonra otomatik siliniyor
- Email şifreleri .env dosyasında güvenli

## 🧪 Test Etme

1. Kayıt sayfasına gidin
2. Email adresinizi girin
3. "Kod Gönder" butonuna tıklayın
4. Email kutunuzu kontrol edin (spam klasörünü de)
5. 6 haneli kodu girin
6. Kayıt işlemini tamamlayın

## ⚠️ Sorun Giderme

### Email gelmiyor?
- Spam klasörünü kontrol edin
- Gmail App Password'ün doğru olduğundan emin olun
- 2 Adımlı Doğrulama'nın açık olduğunu kontrol edin
- Vercel Environment Variables'ı kontrol edin

### "Email gönderilemedi" hatası?
- Backend loglarını kontrol edin
- .env dosyasındaki EMAIL_PASS'in boşluksuz olduğundan emin olun
- Gmail hesabınızın aktif olduğunu kontrol edin

### Kod geçersiz diyor?
- Kodun 10 dakika içinde girilmesi gerekiyor
- Doğru kodu girdiğinizden emin olun
- Yeni kod almayı deneyin

## 💰 Maliyet

**Tamamen Ücretsiz!**
- Gmail SMTP: Günde 500 email (ücretsiz)
- Nodemailer: Açık kaynak (ücretsiz)
- Toplam maliyet: 0₺/ay

## 📝 Notlar

- Günde 500 email limiti yeterlidir (ayda 15,000 kayıt)
- Profesyonel görünüm için özel domain email kullanabilirsiniz
- Email template'i özelleştirilebilir (backend/server.js)
