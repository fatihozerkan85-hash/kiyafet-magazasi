# 🌍 MongoDB Atlas Frankfurt Cluster Oluşturma

## Sorun
Mevcut cluster Bahrain region'ında ve Vercel bağlanamıyor.

## Çözüm
Frankfurt region'da yeni cluster oluştur (Vercel ile uyumlu).

## ADIM 1: Yeni Cluster Oluştur

1. https://cloud.mongodb.com adresine git
2. Sol menüden **"Database"** seç
3. Sağ üstte **"Create"** butonuna tıkla
4. **"Build a Database"** seç

## ADIM 2: Plan Seç

1. **FREE (M0)** planını seç
2. **"Create"** butonuna tıkla

## ADIM 3: Region Seç

**ÖNEMLİ:** Frankfurt seç!

1. **Cloud Provider:** AWS
2. **Region:** **Frankfurt (eu-central-1)** ← ÇOK ÖNEMLİ!
3. **Cluster Name:** `kiyafet-magazasi-eu`
4. **"Create Deployment"** butonuna tıkla

## ADIM 4: Database User Oluştur

Açılan pencerede:

1. **Username:** `admin`
2. **Password:** `admin123456` (basit şifre, özel karakter yok)
3. **"Create Database User"** butonuna tıkla

## ADIM 5: Network Access

1. **"Choose a connection method"** penceresinde
2. **"My Local Environment"** seç
3. **"Add My Current IP Address"** butonuna tıkla
4. Sonra **"Add a Different IP Address"** tıkla
5. IP Address: `0.0.0.0/0`
6. Description: `Allow from anywhere`
7. **"Add Entry"** butonuna tıkla
8. **"Finish and Close"** butonuna tıkla

## ADIM 6: Connection String Al

1. Cluster oluşturuldu! (5-10 dakika sürebilir)
2. Cluster'ın yanındaki **"Connect"** butonuna tıkla
3. **"Connect your application"** seç
4. **Driver:** Node.js
5. **Version:** 5.5 or later
6. Connection string'i kopyala

**Örnek:**
```
mongodb+srv://admin:<password>@kiyafet-magazasi-eu.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

7. `<password>` kısmını `admin123456` ile değiştir:
```
mongodb+srv://admin:admin123456@kiyafet-magazasi-eu.xxxxx.mongodb.net/kiyafet-magazasi?retryWrites=true&w=majority
```

## ADIM 7: Local Test

`backend/.env` dosyasını aç ve MONGODB_URI'yi güncelle:

```env
MONGODB_URI=mongodb+srv://admin:admin123456@kiyafet-magazasi-eu.xxxxx.mongodb.net/kiyafet-magazasi?retryWrites=true&w=majority
```

Test et:
```bash
cd backend
node test-mongodb.js
```

Başarılı mesaj:
```
✅ MongoDB Atlas'a başarıyla bağlandı!
```

## ADIM 8: Vercel'e Ekle

1. https://vercel.com/dashboard
2. **kiyafet-magazasi-backend** projesini seç
3. **Settings** → **Environment Variables**
4. **MONGODB_URI**'yi bul ve **Edit** butonuna tıkla
5. Yeni connection string'i yapıştır
6. **Save** butonuna tıkla
7. **Deployments** → En son deployment → **"..."** → **Redeploy**

## ADIM 9: Test Et

Deployment tamamlandıktan sonra:

```
https://kiyafet-magazasi-backend.vercel.app/api/health
```

Görmek istediğin:
```json
{
  "durum": "çalışıyor",
  "zaman": "...",
  "database": "bağlı"  ← ✅ BAĞLI!
}
```

## Özet

- ✅ Frankfurt region (Vercel uyumlu)
- ✅ Basit şifre (özel karakter yok)
- ✅ Network Access: 0.0.0.0/0
- ✅ Database: kiyafet-magazasi
- ✅ User: admin / admin123456

## Eski Cluster'ı Sil (Opsiyonel)

Yeni cluster çalıştıktan sonra:

1. MongoDB Atlas → Database
2. Eski cluster (Bahrain) yanındaki **"..."** → **"Terminate"**
3. Cluster adını yaz ve onayla

## Bana Söyle

Yeni connection string'i aldığında bana gönder, `.env` dosyasını güncelleyeyim!
