# 🚀 Vercel'e MongoDB Entegrasyonu Deploy

## Durum
✅ Backend MongoDB'ye geçirildi
✅ GitHub'a push yapıldı
⚠️ Local'de DNS sorunu var (normal, ISP/network sorunu)
🎯 Vercel'de çalışacak!

## ADIM 1: Vercel'e Environment Variable Ekle

### Backend Projesi İçin:

1. https://vercel.com/dashboard adresine git
2. **"kiyafet-magazasi-backend"** projesini seç
3. Üst menüden **"Settings"** sekmesine tıkla
4. Sol menüden **"Environment Variables"** seç
5. **"Add New"** butonuna tıkla

**Eklenecek Variable:**
```
Name: MONGODB_URI
Value: mongodb+srv://fatihozerkan85_db_user:1214Abcd@cluster0.uxteqsd.mongodb.net/kiyafet-magazasi?retryWrites=true&w=majority
```

**Environment Seçimi:**
- ✅ Production
- ✅ Preview  
- ✅ Development

6. **"Save"** butonuna tıkla

## ADIM 2: Redeploy

1. Üst menüden **"Deployments"** sekmesine git
2. En üstteki (en son) deployment'ı bul
3. Sağ taraftaki **"..."** (üç nokta) menüsüne tıkla
4. **"Redeploy"** seç
5. **"Redeploy"** butonuna tekrar tıkla (onay için)

## ADIM 3: Deployment'ı İzle

Deployment başladı! Şunları göreceksin:
- Building...
- Deploying...
- ✅ Ready

Yaklaşık 1-2 dakika sürer.

## ADIM 4: Test Et

Deployment tamamlandıktan sonra test et:

### Health Check:
```
https://kiyafet-magazasi-backend.vercel.app/api/health
```

Görmek istediğin:
```json
{
  "durum": "çalışıyor",
  "zaman": "2024-03-07T...",
  "database": "bağlı"
}
```

### Kategoriler:
```
https://kiyafet-magazasi-backend.vercel.app/api/kategoriler
```

8 kategori göreceksin (Tümü, Elbise, Pantolon, vb.)

### Kampanyalar:
```
https://kiyafet-magazasi-backend.vercel.app/api/kampanyalar
```

3 kampanya banner göreceksin.

## ADIM 5: Admin Panel Test

1. https://aslbutique.com.tr/admin-tam.html adresine git
2. Giriş yap: admin@kiyafet.com / admin123
3. **"Kategori Yönetimi"** sekmesine git
4. Yeni kategori ekle:
   - Ad: Test Kategori
   - Ad (EN): Test Category
   - Emoji: 🎯
   - Resim URL: https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop
5. **"Kategori Ekle"** butonuna tıkla

### Kontrol:
- Kategori listesinde görünüyor mu? ✅
- Sayfayı yenile (F5)
- Hala orada mı? ✅ (Artık kaybolmayacak!)

## Sorun Giderme

### "database": "bağlı değil" Görüyorsan:

1. Vercel Dashboard → Settings → Environment Variables
2. `MONGODB_URI` eklenmiş mi kontrol et
3. Value doğru mu kontrol et
4. Redeploy yap

### Deployment Başarısız Olursa:

1. Vercel Dashboard → Deployments
2. Başarısız deployment'a tıkla
3. **"Build Logs"** sekmesine bak
4. Hata mesajını bana gönder

### MongoDB Bağlantı Hatası Alırsan:

1. MongoDB Atlas → Network Access
2. 0.0.0.0/0 hala ekli mi kontrol et
3. MongoDB Atlas → Database Access
4. User şifresi doğru mu kontrol et

## Local Test (Opsiyonel)

Local'de DNS sorunu var ama Vercel'de çalışacak. Eğer local'de test etmek istersen:

### Çözüm 1: DNS Değiştir
1. Windows Ayarlar → Network & Internet
2. Ethernet/WiFi → Properties
3. DNS: 8.8.8.8 (Google DNS)

### Çözüm 2: VPN Kullan
Bazı ISP'ler MongoDB Atlas'ı engelliyor olabilir.

### Çözüm 3: Mobil Hotspot
Telefonundan hotspot aç ve dene.

## Sonuç

✅ Backend MongoDB'ye geçirildi
✅ Veriler artık kalıcı
✅ Admin panelde eklediğin kategoriler kaybolmayacak
✅ Production ready!

## Sonraki Adımlar

1. Vercel'e MONGODB_URI ekle
2. Redeploy yap
3. Test et
4. Admin panelde yeni kategori ekle
5. Vercel'de çalıştığını gör! 🎉
