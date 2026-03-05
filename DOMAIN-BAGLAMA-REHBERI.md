# 🌐 Kendi Domain'inizi Vercel'e Bağlama Rehberi

## 📋 Gereksinimler
- Satın alınmış bir domain (örn: aslbutique.com)
- Vercel hesabı
- Domain yönetim paneli erişimi

---

## 🚀 Adım 1: Vercel'de Domain Ekleme

### 1.1 Vercel Dashboard'a Gidin
```
https://vercel.com/dashboard
```

### 1.2 Projenizi Seçin
- "kiyafet-magazasi-web" projesine tıklayın

### 1.3 Settings → Domains
1. Sol menüden **"Settings"** seçin
2. **"Domains"** sekmesine tıklayın
3. **"Add"** butonuna tıklayın

### 1.4 Domain'inizi Girin
```
aslbutique.com
```
veya
```
www.aslbutique.com
```

---

## 🔧 Adım 2: DNS Ayarları

Vercel size 2 seçenek sunar:

### Seçenek A: Nameserver Değiştirme (Önerilen - Kolay)

**Vercel Nameserver'ları:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Domain sağlayıcınızda:**
1. Domain yönetim paneline gidin
2. **Nameservers** bölümünü bulun
3. Mevcut nameserver'ları silin
4. Vercel nameserver'larını ekleyin
5. Kaydedin

**Popüler Sağlayıcılar:**
- **GoDaddy**: Domain Settings → Nameservers → Custom
- **Namecheap**: Domain List → Manage → Nameservers → Custom DNS
- **Turhost**: Domain Yönetimi → DNS Yönetimi → Nameserver
- **Natro**: Domain Yönetimi → DNS Ayarları

---

### Seçenek B: A Record ve CNAME (Manuel)

Domain sağlayıcınızın DNS yönetim panelinde:

#### Root Domain (aslbutique.com)
**A Record:**
```
Type: A
Name: @ (veya boş)
Value: 76.76.21.21
TTL: 3600
```

#### WWW Subdomain (www.aslbutique.com)
**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

---

## ⏱️ Adım 3: Bekleme Süresi

- **Nameserver değişikliği**: 24-48 saat
- **A/CNAME kayıtları**: 1-6 saat

**Kontrol:**
```bash
# Windows
nslookup aslbutique.com

# Mac/Linux
dig aslbutique.com
```

---

## ✅ Adım 4: SSL Sertifikası

Vercel otomatik olarak **ücretsiz SSL sertifikası** ekler:
- Let's Encrypt kullanır
- HTTPS otomatik aktif olur
- Yenileme otomatik yapılır

---

## 🎯 Örnek: GoDaddy ile Bağlama

### 1. GoDaddy'ye Giriş Yapın
```
https://www.godaddy.com
```

### 2. Domain'inizi Seçin
- My Products → Domains
- Domain'inize tıklayın

### 3. DNS Yönetimi
- **"Manage DNS"** butonuna tıklayın

### 4. Nameserver Değiştir
- **"Change"** butonuna tıklayın (Nameservers bölümünde)
- **"Custom"** seçin
- Ekleyin:
  ```
  ns1.vercel-dns.com
  ns2.vercel-dns.com
  ```
- **"Save"** butonuna tıklayın

### 5. Vercel'de Doğrulama
- Vercel dashboard'a dönün
- Domain durumunu kontrol edin
- "Valid Configuration" yazısını bekleyin

---

## 🔄 Subdomain Ekleme

### www.aslbutique.com
Vercel'de otomatik olarak yönlendirilir.

### shop.aslbutique.com gibi özel subdomain
1. Vercel'de **"Add Domain"**
2. `shop.aslbutique.com` yazın
3. DNS'e CNAME ekleyin:
   ```
   Type: CNAME
   Name: shop
   Value: cname.vercel-dns.com
   ```

---

## 🛠️ Sorun Giderme

### Domain Çalışmıyor
1. **DNS propagation kontrol:**
   ```
   https://dnschecker.org
   ```

2. **Vercel'de domain durumu:**
   - Settings → Domains
   - Kırmızı uyarı var mı?

3. **Cache temizle:**
   - Tarayıcı cache'i temizleyin
   - Gizli pencerede deneyin

### SSL Hatası
- 24 saat bekleyin
- Vercel otomatik düzeltir
- Hala sorun varsa: Settings → Domains → "Refresh SSL"

### Eski Site Görünüyor
- DNS propagation tamamlanmamış
- 24-48 saat bekleyin
- Farklı DNS kullanın (8.8.8.8 - Google DNS)

---

## 📞 Popüler Domain Sağlayıcıları

### Türkiye
- **Turhost**: https://www.turhost.com
- **Natro**: https://www.natro.com
- **İsimtescil**: https://www.isimtescil.net

### Uluslararası
- **GoDaddy**: https://www.godaddy.com
- **Namecheap**: https://www.namecheap.com
- **Google Domains**: https://domains.google

---

## ✨ Tamamlandı!

Domain bağlandıktan sonra:
- ✅ `https://aslbutique.com` → Siteniz
- ✅ `https://www.aslbutique.com` → Otomatik yönlendirme
- ✅ SSL sertifikası aktif
- ✅ Ücretsiz ve otomatik yenileme

---

## 🎁 Bonus: Email Kurulumu

Domain'iniz varsa profesyonel email:
```
info@aslbutique.com
destek@aslbutique.com
```

**Seçenekler:**
1. **Google Workspace** (Ücretli - $6/ay)
2. **Zoho Mail** (Ücretsiz - 5 kullanıcı)
3. **Domain sağlayıcınızın email servisi**

---

## 📚 Daha Fazla Bilgi

- Vercel Docs: https://vercel.com/docs/concepts/projects/domains
- DNS Nedir: https://www.cloudflare.com/learning/dns/what-is-dns/

**Başarılar!** 🚀
