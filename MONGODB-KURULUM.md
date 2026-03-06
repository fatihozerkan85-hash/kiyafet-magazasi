# MongoDB Atlas Kurulum Rehberi

## Adım 1: MongoDB Atlas Hesabı Oluştur

1. https://www.mongodb.com/cloud/atlas/register adresine git
2. Email ile ücretsiz hesap oluştur
3. "Build a Database" butonuna tıkla
4. **FREE** (M0) planını seç
5. Cloud Provider: **AWS**
6. Region: **Frankfurt (eu-central-1)** (Türkiye'ye en yakın)
7. Cluster Name: **kiyafet-magazasi**
8. "Create" butonuna tıkla

## Adım 2: Database User Oluştur

1. Sol menüden **Database Access** seç
2. "Add New Database User" butonuna tıkla
3. Authentication Method: **Password**
4. Username: `admin`
5. Password: Güçlü bir şifre oluştur (kaydet!)
6. Database User Privileges: **Read and write to any database**
7. "Add User" butonuna tıkla

## Adım 3: Network Access Ayarla

1. Sol menüden **Network Access** seç
2. "Add IP Address" butonuna tıkla
3. "Allow Access from Anywhere" seç (0.0.0.0/0)
4. "Confirm" butonuna tıkla

## Adım 4: Connection String Al

1. Sol menüden **Database** seç
2. Cluster'ın yanındaki "Connect" butonuna tıkla
3. "Connect your application" seç
4. Driver: **Node.js**, Version: **5.5 or later**
5. Connection string'i kopyala:
   ```
   mongodb+srv://admin:<password>@kiyafet-magazasi.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. `<password>` kısmını gerçek şifrenle değiştir

## Adım 5: Backend'e Ekle

Connection string'i `backend/.env` dosyasına ekle:
```
MONGODB_URI=mongodb+srv://admin:SIFREN@kiyafet-magazasi.xxxxx.mongodb.net/kiyafet-magazasi?retryWrites=true&w=majority
```

## Adım 6: Vercel'e Environment Variable Ekle

1. Vercel Dashboard'a git
2. Projeyi seç
3. Settings > Environment Variables
4. Yeni variable ekle:
   - Name: `MONGODB_URI`
   - Value: Connection string
   - Environment: Production, Preview, Development (hepsini seç)
5. "Save" butonuna tıkla

## Tamamlandı!

Backend artık MongoDB Atlas kullanıyor. Veriler kalıcı olarak saklanacak.
