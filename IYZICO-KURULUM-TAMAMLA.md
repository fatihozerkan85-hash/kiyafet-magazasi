# iyzico Kurulumunu Tamamlama

## Şu anda yapmanız gereken:

### 1. Backend paketlerini yükleyin

Terminalde şu komutu çalıştırın:

```bash
cd backend
npm install
```

VEYA

`backend/install.bat` dosyasına çift tıklayın

### 2. Backend'i başlatın

```bash
cd backend
npm start
```

### 3. Test edin!

1. Tarayıcıda http://localhost:3000 açın
2. Bir ürün sepete ekleyin
3. "Ödemeye Geç" butonuna tıklayın
4. Test kartı bilgilerini girin:
   - **Kart No:** 5528 7900 0000 0008
   - **Tarih:** 12/30
   - **CVC:** 123
   - **İsim:** Test User
5. Kişisel bilgilerinizi doldurun
6. "Ödemeyi Tamamla" butonuna tıklayın

### 4. Gerçek iyzico anahtarlarını ekleyin

`backend/.env` dosyasını açın ve gerçek anahtarlarınızı ekleyin:

```env
IYZICO_API_KEY=your-real-api-key
IYZICO_SECRET_KEY=your-real-secret-key
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
```

iyzico anahtarlarını almak için:
1. https://merchant.iyzipay.com adresine gidin
2. Giriş yapın
3. Ayarlar → API Anahtarları
4. Sandbox anahtarlarını kopyalayın

## Sorun mu yaşıyorsunuz?

Bana "iyzico çalışmıyor" yazın, yardımcı olayım!
