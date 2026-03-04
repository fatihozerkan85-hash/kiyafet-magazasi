# Kampanya Sistemi Test Rehberi

## Hızlı Test

### 1. Backend Test
Tarayıcınızda şu URL'i açın:
```
http://localhost:5000/api/kampanyalar
```

Şunu görmelisiniz:
```json
[
  {
    "id": "K1",
    "baslik": "🎉 Yaz İndirimi Başladı!",
    "aciklama": "Tüm ürünlerde %50'ye varan indirimler",
    ...
  }
]
```

### 2. Frontend Test
1. http://localhost:3000 açın
2. F12 basın (Developer Tools)
3. Console sekmesine gidin
4. Şunu görmelisiniz:
   ```
   Kampanyalar yüklendi: Array(3)
   Ana sayfa render - Kampanya sayısı: 3
   ```

### 3. Görsel Test
Ana sayfada en üstte büyük bir banner görmelisiniz.

## Sorun Giderme

### Backend çalışmıyor mu?
```bash
cd backend
npm start
```

### Frontend çalışmıyor mu?
```bash
cd web
npm start
```

### Kampanyalar görünmüyor mu?
1. Console'da hata var mı kontrol edin
2. Network sekmesinde `/api/kampanyalar` isteğini kontrol edin
3. Backend'in 5000 portunda çalıştığından emin olun

### Admin butonu görünmüyor mu?
1. admin@kiyafet.com / admin123 ile giriş yapın
2. Header'da "⚙️ Admin" butonu görünmeli (kırmızı)

## Manuel Test

test-kampanya.html dosyasını tarayıcıda açın ve test edin.
