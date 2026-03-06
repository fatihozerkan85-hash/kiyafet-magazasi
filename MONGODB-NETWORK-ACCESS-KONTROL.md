# 🔧 MongoDB Atlas Network Access Kontrolü

## Sorun
Backend MongoDB'ye bağlanamıyor. Hata:
```
ECONNREFUSED _mongodb._tcp.cluster0.uxteqsd.mongodb.net
```

## Çözüm: Network Access Ayarları

### ADIM 1: MongoDB Atlas'a Git
1. https://cloud.mongodb.com adresine git
2. Giriş yap

### ADIM 2: Network Access Menüsünü Bul

**Yöntem 1: Sol Menüden**
1. Sol menüde **"SECURITY"** başlığını ara
2. Altında **"Network Access"** olacak
3. Tıkla

**Yöntem 2: Eğer Göremiyorsan**
1. Sol üstte **"Project 0"** veya proje adına tıkla
2. Açılan menüden projeyi seç
3. Sol menüde **"Security"** → **"Network Access"**

**Yöntem 3: Direkt Link**
Tarayıcıda şu URL'yi aç:
```
https://cloud.mongodb.com/v2#/security/network/accessList
```

### ADIM 3: IP Adresi Ekle

Network Access sayfasında:

1. **"Add IP Address"** butonuna tıkla
2. Açılan pencerede **"Allow Access from Anywhere"** seç
3. Bu otomatik olarak **0.0.0.0/0** ekleyecek
4. **"Confirm"** butonuna tıkla

### ADIM 4: Kontrol Et

IP listesinde şunu göreceksin:
```
IP Address: 0.0.0.0/0
Comment: Allow from anywhere
Status: Active
```

## Alternatif: Sadece Vercel IP'lerini Ekle

Daha güvenli bir yöntem istiyorsan:

1. **"Add IP Address"** → **"Add Current IP Address"** (kendi bilgisayarın için)
2. Vercel için ayrı IP ekle:
   - **"Add IP Address"** → **"Add IP Address"**
   - IP: `0.0.0.0/0` (Vercel dinamik IP kullandığı için)

## Test Et

Network Access ayarlarını yaptıktan sonra:

```bash
cd backend
node server.js
```

Başarılı mesaj:
```
✅ MongoDB Atlas'a bağlandı!
📦 Başlangıç verileri ekleniyor...
✅ Başlangıç verileri eklendi!
🚀 Backend sunucusu http://localhost:5000 adresinde çalışıyor
```

## Hala Sorun Varsa

### 1. Cluster Durumunu Kontrol Et
1. Sol menüden **"Database"** seç
2. Cluster'ın **"Active"** olduğunu kontrol et
3. Eğer **"Creating"** yazıyorsa 5-10 dakika bekle

### 2. Database User Kontrolü
1. Sol menüden **"Database Access"** seç
2. **"fatihozerkan85_db_user"** kullanıcısını bul
3. **"Edit"** butonuna tıkla
4. **"Database User Privileges"** kısmında:
   - **"Built-in Role"** seçili olmalı
   - **"Read and write to any database"** seçili olmalı
5. **"Update User"** butonuna tıkla

### 3. Connection String Kontrolü
`backend/.env` dosyasında:
```env
MONGODB_URI=mongodb+srv://fatihozerkan85_db_user:1214Abcd@cluster0.uxteqsd.mongodb.net/kiyafet-magazasi?retryWrites=true&w=majority&appName=Cluster0
```

Şifrede özel karakter varsa URL encode gerekebilir:
- `!` → `%21`
- `@` → `%40`
- `#` → `%23`

Senin şifren `1214Abcd` - özel karakter yok, sorun değil.

## Sonraki Adım

Network Access ayarlarını yaptıktan sonra bana haber ver, backend'i tekrar test edelim!
