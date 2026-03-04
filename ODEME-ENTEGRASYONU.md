# 💳 Online Ödeme Entegrasyonu Rehberi

## Türkiye'de Ödeme Altyapıları

### 1. iyzico (Önerilen)
- ✅ En popüler ve kolay entegrasyon
- ✅ Kredi kartı, banka kartı, havale/EFT
- ✅ 3D Secure desteği
- ✅ Taksit seçenekleri
- ✅ Komisyon: %2.49 + KDV (başlangıç)
- 🌐 https://www.iyzico.com

### 2. PayTR
- ✅ Alternatif ödeme sistemi
- ✅ Daha düşük komisyon oranları
- ✅ Hızlı onay süreci
- 🌐 https://www.paytr.com

### 3. Stripe (Uluslararası)
- ⚠️ Türkiye'de sınırlı destek
- ✅ Global müşteriler için ideal
- 🌐 https://stripe.com

---

## iyzico Entegrasyonu Adım Adım

### Adım 1: iyzico Hesabı Oluşturun

1. https://www.iyzico.com adresine gidin
2. "Üye Ol" butonuna tıklayın
3. İşletme bilgilerinizi doldurun:
   - Şirket/Şahıs bilgileri
   - Vergi numarası
   - Banka hesap bilgileri (para transferi için)
   - Kimlik/İmza sirküleri

4. Başvurunuz onaylanacak (1-3 iş günü)

### Adım 2: API Anahtarlarını Alın

1. iyzico paneline giriş yapın
2. "Ayarlar" > "API Anahtarları"
3. İki anahtar alacaksınız:
   - **API Key** (örn: sandbox-xxx)
   - **Secret Key** (örn: sandbox-yyy)

⚠️ **Önemli:** İlk başta "Sandbox" (test) anahtarları kullanın!

### Adım 3: Gerekli Belgeler

- ✅ Vergi levhası
- ✅ İmza sirküleri
- ✅ Kimlik fotokopisi
- ✅ Ticaret sicil gazetesi (şirket ise)
- ✅ Banka hesap bilgileri

---

## Teknik Entegrasyon

### Backend'e iyzico Paketi Yükleyin

```bash
cd backend
npm install iyzipay
```

### API Anahtarlarını .env Dosyasına Ekleyin

```env
IYZICO_API_KEY=sandbox-your-api-key
IYZICO_SECRET_KEY=sandbox-your-secret-key
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
```

### Backend'de Ödeme Endpoint'i Oluşturun

```javascript
const Iyzipay = require('iyzipay');

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.IYZICO_BASE_URL
});

app.post('/api/odeme', (req, res) => {
  const { sepet, kullanici, adres } = req.body;
  
  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: Date.now().toString(),
    price: sepet.toplamTutar.toFixed(2),
    paidPrice: sepet.toplamTutar.toFixed(2),
    currency: Iyzipay.CURRENCY.TRY,
    installment: '1',
    basketId: 'B' + Date.now(),
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    
    // Kart bilgileri (frontend'den gelecek)
    paymentCard: {
      cardHolderName: req.body.cardHolderName,
      cardNumber: req.body.cardNumber,
      expireMonth: req.body.expireMonth,
      expireYear: req.body.expireYear,
      cvc: req.body.cvc,
      registerCard: '0'
    },
    
    // Alıcı bilgileri
    buyer: {
      id: kullanici.id,
      name: kullanici.ad,
      surname: kullanici.soyad,
      email: kullanici.email,
      identityNumber: '11111111111', // TC kimlik no
      registrationAddress: adres.adres,
      city: adres.il,
      country: 'Turkey',
      ip: req.ip
    },
    
    // Teslimat adresi
    shippingAddress: {
      contactName: kullanici.ad + ' ' + kullanici.soyad,
      city: adres.il,
      country: 'Turkey',
      address: adres.adres
    },
    
    // Fatura adresi
    billingAddress: {
      contactName: kullanici.ad + ' ' + kullanici.soyad,
      city: adres.il,
      country: 'Turkey',
      address: adres.adres
    },
    
    // Sepet ürünleri
    basketItems: sepet.urunler.map((item, index) => ({
      id: item.urun.id,
      name: item.urun.ad,
      category1: item.urun.kategori,
      itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
      price: (item.urun.fiyat * item.adet).toFixed(2)
    }))
  };

  iyzipay.payment.create(request, (err, result) => {
    if (err) {
      return res.status(400).json({ hata: err });
    }
    
    if (result.status === 'success') {
      // Ödeme başarılı
      res.json({ 
        basarili: true, 
        mesaj: 'Ödeme başarılı',
        siparisId: result.paymentId 
      });
    } else {
      // Ödeme başarısız
      res.status(400).json({ 
        basarili: false, 
        mesaj: result.errorMessage 
      });
    }
  });
});
```

### Frontend'de Ödeme Formu

```javascript
const [kartBilgileri, setKartBilgileri] = useState({
  cardHolderName: '',
  cardNumber: '',
  expireMonth: '',
  expireYear: '',
  cvc: ''
});

const odemeYap = async () => {
  const response = await fetch('http://localhost:5000/api/odeme', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sepet,
      kullanici,
      adres,
      ...kartBilgileri
    })
  });
  
  const sonuc = await response.json();
  
  if (sonuc.basarili) {
    alert('Ödeme başarılı! Siparişiniz alındı.');
  } else {
    alert('Ödeme başarısız: ' + sonuc.mesaj);
  }
};
```

---

## Test Kartları (Sandbox)

iyzico test ortamında kullanabileceğiniz kartlar:

### Başarılı Ödeme:
- **Kart No:** 5528790000000008
- **Son Kullanma:** 12/30
- **CVC:** 123
- **Kart Sahibi:** Herhangi bir isim

### Başarısız Ödeme (Yetersiz Bakiye):
- **Kart No:** 5406670000000009
- **Son Kullanma:** 12/30
- **CVC:** 123

### 3D Secure Test:
- **Kart No:** 5528790000000008
- **Son Kullanma:** 12/30
- **CVC:** 123
- **3D Şifre:** Herhangi bir şey yazın

---

## Güvenlik Önlemleri

### ⚠️ ÖNEMLİ:

1. **Kart bilgilerini asla veritabanına kaydetmeyin!**
2. **SSL sertifikası kullanın (HTTPS)**
3. **API anahtarlarını .env dosyasında saklayın**
4. **Frontend'de kart bilgilerini doğrulayın**
5. **3D Secure kullanın (zorunlu)**
6. **IP adresi ve fraud kontrolü yapın**

---

## Canlıya Geçiş (Production)

### 1. Sandbox'tan Production'a Geçiş

```env
# .env dosyasını güncelleyin
IYZICO_API_KEY=your-production-api-key
IYZICO_SECRET_KEY=your-production-secret-key
IYZICO_BASE_URL=https://api.iyzipay.com
```

### 2. SSL Sertifikası

- Vercel/Netlify otomatik sağlar
- Kendi sunucunuzda: Let's Encrypt kullanın

### 3. Test Edin

- Gerçek kartla küçük bir ödeme yapın
- İade işlemini test edin
- Hata senaryolarını kontrol edin

---

## Maliyetler

### iyzico Komisyonları:

| İşlem Türü | Komisyon |
|------------|----------|
| Tek Çekim | %2.49 + KDV |
| 2-3 Taksit | %2.99 + KDV |
| 4-6 Taksit | %3.49 + KDV |
| 7-9 Taksit | %3.99 + KDV |
| 10-12 Taksit | %4.49 + KDV |

### Aylık Sabit Ücret:
- Yok (sadece işlem başına)

### Para Çekme:
- Ücretsiz (banka hesabınıza otomatik transfer)
- Transfer süresi: 1-2 iş günü

---

## Alternatif: PayTR

Daha düşük komisyon istiyorsanız:

```bash
npm install paytr
```

PayTR komisyonları genellikle %1.99'dan başlar.

---

## Yasal Gereklilikler

### E-Ticaret için Zorunlu:

1. **Mesafeli Satış Sözleşmesi**
2. **Gizlilik Politikası**
3. **Kullanım Koşulları**
4. **İade ve İptal Koşulları**
5. **KVKK Aydınlatma Metni**
6. **Şirket/Şahıs bilgileri (iletişim)**

Bu belgeleri sitenize eklemelisiniz!

---

## Yardım ve Destek

- iyzico Dokümantasyon: https://dev.iyzipay.com
- iyzico Destek: destek@iyzico.com
- PayTR Dokümantasyon: https://www.paytr.com/entegrasyon
- Telefon: iyzico 0850 XXX XXXX

---

## Özet Checklist

- [ ] iyzico hesabı oluştur
- [ ] Gerekli belgeleri yükle
- [ ] API anahtarlarını al
- [ ] Backend'e iyzipay paketi yükle
- [ ] Ödeme endpoint'i oluştur
- [ ] Frontend'de ödeme formu yap
- [ ] Sandbox ile test et
- [ ] SSL sertifikası al
- [ ] Yasal metinleri ekle
- [ ] Canlıya geç
- [ ] Gerçek ödeme testi yap

İyi satışlar! 🚀
