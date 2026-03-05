# 🇹🇷 İsimtescil Domain'ini Vercel'e Bağlama Rehberi

## 📋 Gereksinimler
- İsimtescil'den satın alınmış domain
- Vercel hesabı
- İsimtescil panel erişimi

---

## 🚀 ADIM 1: Vercel'de Domain Ekleme

### 1.1 Vercel Dashboard
```
https://vercel.com/dashboard
```

### 1.2 Projenizi Seçin
- **"kiyafet-magazasi-web"** projesine tıklayın

### 1.3 Domain Ekle
1. Sol menüden **"Settings"**
2. **"Domains"** sekmesi
3. **"Add"** butonu
4. Domain'inizi yazın: `aslbutique.com`
5. **"Add"** butonuna tıklayın

Vercel size DNS ayarlarını gösterecek.

---

## 🔧 ADIM 2: İsimtescil DNS Ayarları

### 2.1 İsimtescil Paneline Giriş
```
https://www.isimtescil.net
```

### 2.2 Domain Yönetimi
1. **"Üye Girişi"** yapın
2. **"Domain Yönetimi"** menüsüne tıklayın
3. Domain'inizi bulun ve **"Yönet"** butonuna tıklayın

### 2.3 DNS Yönetimi
**"DNS Yönetimi"** veya **"Name Server Ayarları"** bölümüne gidin

---

## 🎯 SEÇENEK A: Nameserver Değiştirme (ÖNERİLEN)

### Adım 1: Nameserver Değiştir
İsimtescil panelinde:

1. **"Name Server Ayarları"** bölümünü bulun
2. **"Özel Name Server Kullan"** seçeneğini işaretleyin
3. Mevcut nameserver'ları silin
4. Vercel nameserver'larını ekleyin:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

5. **"Kaydet"** butonuna tıklayın

### Adım 2: Onay
- İsimtescil email onayı isteyebilir
- Gelen emaildeki linke tıklayın

### Adım 3: Bekleme
- **Süre**: 1-24 saat
- DNS propagation tamamlanana kadar bekleyin

---

## 🛠️ SEÇENEK B: A Record ve CNAME (Manuel)

Eğer nameserver değiştirmek istemiyorsanız:

### Adım 1: DNS Kayıtları Sayfası
İsimtescil panelinde:
1. **"DNS Yönetimi"** → **"DNS Kayıtları"**
2. Veya **"Gelişmiş DNS Ayarları"**

### Adım 2: A Record Ekle (Root Domain)

**Yeni Kayıt Ekle:**
```
Kayıt Tipi: A
Host: @ (veya boş bırakın)
Değer: 76.76.21.21
TTL: 3600 (veya 1 Hour)
```

**"Ekle"** veya **"Kaydet"** butonuna tıklayın

### Adım 3: CNAME Record Ekle (WWW)

**Yeni Kayıt Ekle:**
```
Kayıt Tipi: CNAME
Host: www
Değer: cname.vercel-dns.com
TTL: 3600 (veya 1 Hour)
```

**"Ekle"** veya **"Kaydet"** butonuna tıklayın

### Adım 4: Eski Kayıtları Sil (Önemli!)

Eğer varsa, şunları silin:
- Eski A kayıtları (@ için)
- Eski CNAME kayıtları (www için)
- Park sayfası yönlendirmeleri

---

## ✅ ADIM 3: Vercel'de Doğrulama

### 3.1 Vercel Dashboard'a Dön
```
vercel.com/dashboard → Projeniz → Settings → Domains
```

### 3.2 Domain Durumunu Kontrol
- **"Valid Configuration"** ✅ → Başarılı!
- **"Invalid Configuration"** ❌ → DNS ayarlarını kontrol edin

### 3.3 SSL Sertifikası
- Vercel otomatik olarak SSL ekler
- 5-10 dakika içinde aktif olur
- **"Certificate"** bölümünde durumu görürsünüz

---

## 🔍 ADIM 4: Test ve Kontrol

### 4.1 DNS Propagation Kontrol
```
https://dnschecker.org
```
Domain'inizi yazın ve kontrol edin.

### 4.2 Tarayıcıda Test
```
https://aslbutique.com
```

### 4.3 WWW Test
```
https://www.aslbutique.com
```
Otomatik olarak ana domain'e yönlendirilmeli.

---

## 🎨 İsimtescil Panel Görünümü

### DNS Yönetimi Ekranı
```
┌─────────────────────────────────────┐
│  DNS Kayıtları                      │
├─────────────────────────────────────┤
│  Tip    Host    Değer         TTL   │
│  A      @       76.76.21.21   3600  │
│  CNAME  www     cname.vercel  3600  │
└─────────────────────────────────────┘
```

---

## ⚠️ Önemli Notlar

### 1. Nameserver Değişikliği
- **Önerilen yöntem** (daha kolay)
- Tüm DNS kontrolü Vercel'e geçer
- Email ayarları etkilenebilir

### 2. A/CNAME Yöntemi
- Mevcut email ayarlarınız korunur
- Daha fazla kontrol
- Manuel güncelleme gerekir

### 3. Email Kullanıyorsanız
Eğer `info@aslbutique.com` gibi email kullanıyorsanız:
- **A/CNAME yöntemini** kullanın
- Nameserver değiştirmeyin
- MX kayıtları korunur

---

## 🛠️ Sorun Giderme

### Domain Çalışmıyor

**1. DNS Kontrol:**
```bash
# Windows Command Prompt
nslookup aslbutique.com
```

**Beklenen sonuç:**
```
Address: 76.76.21.21
```

**2. İsimtescil'de Kontrol:**
- DNS kayıtları doğru mu?
- Nameserver'lar doğru mu?
- Onay emaili geldi mi?

**3. Vercel'de Kontrol:**
- Settings → Domains
- Kırmızı uyarı var mı?
- "Refresh" butonuna tıklayın

### SSL Hatası

**Çözüm:**
1. 24 saat bekleyin (otomatik düzelir)
2. Vercel: Settings → Domains → "Refresh SSL"
3. Hala sorun varsa: Support'a yazın

### Eski Site Görünüyor

**Çözüm:**
1. Tarayıcı cache temizle: `Ctrl + Shift + Delete`
2. Gizli pencerede dene: `Ctrl + Shift + N`
3. DNS propagation bekle: 1-24 saat
4. Farklı cihazda dene (telefon)

---

## 📞 İsimtescil Destek

### İletişim
- **Telefon**: 0850 222 0 678
- **Email**: destek@isimtescil.net
- **Canlı Destek**: Panel içinden

### Sık Sorulan Sorular
- "Nameserver nasıl değiştirilir?"
- "DNS kayıtları nasıl eklenir?"
- "Domain yönlendirme nasıl yapılır?"

---

## ✨ Tamamlandı!

Domain başarıyla bağlandıktan sonra:

✅ `https://aslbutique.com` → ASL Butique siteniz
✅ `https://www.aslbutique.com` → Otomatik yönlendirme
✅ SSL sertifikası aktif (HTTPS)
✅ Ücretsiz ve otomatik yenileme

---

## 🎁 Bonus: Subdomain Ekleme

### shop.aslbutique.com gibi subdomain eklemek için:

**İsimtescil'de:**
```
Tip: CNAME
Host: shop
Değer: cname.vercel-dns.com
TTL: 3600
```

**Vercel'de:**
1. Settings → Domains → Add
2. `shop.aslbutique.com` yazın
3. Add butonuna tıklayın

---

## 📚 Yararlı Linkler

- İsimtescil Panel: https://www.isimtescil.net
- Vercel Dashboard: https://vercel.com/dashboard
- DNS Checker: https://dnschecker.org
- SSL Checker: https://www.sslshopper.com/ssl-checker.html

---

## 🚀 Sonraki Adımlar

1. ✅ Domain bağlandı
2. 📧 Profesyonel email kurun (info@aslbutique.com)
3. 📊 Google Analytics ekleyin
4. 🔍 Google Search Console'a kaydedin
5. 📱 Sosyal medya hesaplarını güncelleyin

**Başarılar!** 🎉
