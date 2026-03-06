# 🔍 MongoDB Cluster Durumu Kontrolü

## Sorun
Hala bağlantı hatası alıyoruz:
```
ECONNREFUSED _mongodb._tcp.cluster0.uxteqsd.mongodb.net
```

Bu genellikle şu sebeplerden olur:
1. Cluster henüz hazır değil (oluşturuluyor)
2. Cluster duraklatılmış
3. Connection string yanlış

## Kontrol Adımları

### 1. Cluster Durumunu Kontrol Et

1. https://cloud.mongodb.com adresine git
2. Sol menüden **"Database"** veya **"Deployment"** seç
3. **"cluster0"** cluster'ını bul
4. Durumunu kontrol et:

**Olması Gereken:**
```
Status: Active (yeşil nokta)
```

**Eğer Farklıysa:**
- **Creating** → 5-10 dakika bekle, cluster oluşturuluyor
- **Paused** → "Resume" butonuna tıkla
- **Deleting** → Yeni cluster oluştur

### 2. Connection String'i Yeniden Al

Cluster'ın yanındaki **"Connect"** butonuna tıkla:

1. **"Connect your application"** seç
2. **Driver:** Node.js
3. **Version:** 5.5 or later
4. Connection string'i kopyala

**Örnek:**
```
mongodb+srv://fatihozerkan85_db_user:<password>@cluster0.uxteqsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### 3. Connection String'i Karşılaştır

MongoDB'den aldığın string ile `backend/.env` dosyasındakini karşılaştır.

**Şu anda .env'de:**
```
mongodb+srv://fatihozerkan85_db_user:1214Abcd@cluster0.uxteqsd.mongodb.net/kiyafet-magazasi?retryWrites=true&w=majority&appName=Cluster0
```

**Kontrol Et:**
- Kullanıcı adı doğru mu? `fatihozerkan85_db_user`
- Şifre doğru mu? `1214Abcd`
- Cluster adresi doğru mu? `cluster0.uxteqsd.mongodb.net`

### 4. Alternatif: Yeni Cluster Oluştur

Eğer cluster sorunlu görünüyorsa:

1. **"Database"** → **"Create"** → **"Build a Database"**
2. **FREE (M0)** planını seç
3. **Provider:** AWS
4. **Region:** Frankfurt (eu-central-1)
5. **Cluster Name:** kiyafet-magazasi
6. **"Create"** butonuna tıkla
7. 5-10 dakika bekle
8. Yeni connection string'i al

## Alternatif Çözüm: Standard Connection String

SRV connection string yerine standard format dene:

`backend/.env` dosyasını aç ve şunu dene:

```env
MONGODB_URI=mongodb://fatihozerkan85_db_user:1214Abcd@cluster0-shard-00-00.uxteqsd.mongodb.net:27017,cluster0-shard-00-01.uxteqsd.mongodb.net:27017,cluster0-shard-00-02.uxteqsd.mongodb.net:27017/kiyafet-magazasi?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority
```

Ama önce MongoDB Atlas'tan doğru connection string'i almak daha iyi.

## Test: Basit Bağlantı Scripti

Bağlantıyı test etmek için:

```javascript
// test-mongodb.js
const mongoose = require('mongoose');
require('dotenv').config();

console.log('Connection string:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Bağlantı başarılı!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Bağlantı hatası:', err);
    process.exit(1);
  });
```

Çalıştır:
```bash
cd backend
node test-mongodb.js
```

## Sonraki Adım

1. MongoDB Atlas'ta cluster durumunu kontrol et
2. Cluster "Active" mi?
3. Connection string'i yeniden al
4. Bana ekran görüntüsü gönder veya cluster durumunu söyle
