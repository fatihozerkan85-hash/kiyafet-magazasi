# MongoDB Atlas Şifre Değiştirme ve Bağlantı Kurulumu

## Senin Connection String'in:
```
mongodb+srv://fatihozerkan85_db_user:<db_password>@cluster0.uxteqsd.mongodb.net/?appName=Cluster0
```

## ADIM 1: MongoDB Atlas'ta Şifreni Al

1. https://cloud.mongodb.com adresine git ve giriş yap
2. Sol menüden **"Database Access"** seç
3. Kullanıcı listesinde **"fatihozerkan85_db_user"** kullanıcısını bul
4. Sağ taraftaki **"Edit"** butonuna tıkla
5. **"Edit Password"** butonuna tıkla
6. **"Autogenerate Secure Password"** ile otomatik şifre oluştur VEYA kendi şifreni yaz
7. Şifreyi bir yere kaydet (çok önemli!)
8. **"Update User"** butonuna tıkla

## ADIM 2: Connection String'i Düzenle

Şifreni aldıktan sonra, `backend/.env` dosyasını aç ve şu satırı bul:

```env
MONGODB_URI=mongodb+srv://fatihozerkan85_db_user:<db_password>@cluster0.uxteqsd.mongodb.net/kiyafet-magazasi?retryWrites=true&w=majority&appName=Cluster0
```

`<db_password>` kısmını gerçek şifrenle değiştir. Örnek:

Eğer şifren `MyPass123!` ise:
```env
MONGODB_URI=mongodb+srv://fatihozerkan85_db_user:MyPass123!@cluster0.uxteqsd.mongodb.net/kiyafet-magazasi?retryWrites=true&w=majority&appName=Cluster0
```

**ÖNEMLİ:** Şifrede özel karakterler varsa (!, @, #, $, %, vb.) URL encoding gerekebilir:
- `!` → `%21`
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`

## ADIM 3: Network Access Kontrolü

1. MongoDB Atlas'ta sol menüden **"Network Access"** seç
2. IP listesinde **"0.0.0.0/0"** (Allow from anywhere) olduğundan emin ol
3. Yoksa **"Add IP Address"** → **"Allow Access from Anywhere"** seç

## ADIM 4: Test Et

Backend klasöründe terminalde:
```bash
cd backend
npm install
node server.js
```

Başarılı bağlantı mesajını göreceksin:
```
✅ MongoDB Atlas'a bağlandı!
🚀 Backend sunucusu http://localhost:5000 adresinde çalışıyor
```

## ADIM 5: Vercel'e Environment Variable Ekle

1. https://vercel.com/dashboard adresine git
2. **"kiyafet-magazasi-backend"** projesini seç
3. **Settings** → **Environment Variables** seç
4. **"Add New"** butonuna tıkla
5. Bilgileri gir:
   - **Name:** `MONGODB_URI`
   - **Value:** Tam connection string (şifreyle birlikte)
   - **Environment:** Production, Preview, Development (hepsini seç)
6. **"Save"** butonuna tıkla
7. **Deployments** sekmesine git
8. En son deployment'ın yanındaki **"..."** → **"Redeploy"** seç

## Tamamlandı!

Artık veriler MongoDB Atlas'ta kalıcı olarak saklanacak. Admin panelde yaptığın değişiklikler kaybolmayacak.

## Sorun Giderme

### Bağlantı Hatası Alıyorsan:
1. Şifrede özel karakter varsa URL encoding yaptığından emin ol
2. Network Access'te 0.0.0.0/0 olduğunu kontrol et
3. Database user'ın "Read and write to any database" yetkisi olduğunu kontrol et

### Hala Sorun Varsa:
MongoDB Atlas'ta yeni bir kullanıcı oluştur:
1. Database Access → Add New Database User
2. Username: `admin`
3. Password: Basit bir şifre (özel karakter olmadan, örn: `admin123456`)
4. Privileges: Read and write to any database
5. Yeni connection string'i kullan:
```
mongodb+srv://admin:admin123456@cluster0.uxteqsd.mongodb.net/kiyafet-magazasi?retryWrites=true&w=majority&appName=Cluster0
```
