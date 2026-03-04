# 🚀 iyzico Hızlı Başlangıç

## 5 Adımda iyzico Entegrasyonu

### 1️⃣ iyzico Hesabı Aç (5 dakika)

1. https://merchant.iyzipay.com/auth/register adresine git
2. E-posta ve şifre belirle
3. Telefon doğrulaması yap
4. İşletme türünü seç:
   - **Şahıs Şirketi** (bireysel)
   - **Limited/Anonim Şirket**

### 2️⃣ Test Anahtarlarını Al (1 dakika)

1. Giriş yap: https://merchant.iyzipay.com
2. Sol menüden "Ayarlar" > "API Anahtarları"
3. "Sandbox" sekmesinde anahtarları kopyala:
   ```
   API Key: sandbox-xxxxx
   Secret Key: sandbox-yyyyy
   ```

### 3️⃣ Backend'e Ekle (2 dakika)

Terminal'de:
```bash
cd backend
npm install iyzipay
```

`backend/.env` dosyasına ekle:
```env
IYZICO_API_KEY=sandbox-your-api-key-here
IYZICO_SECRET_KEY=sandbox-your-secret-key-here
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
```

### 4️⃣ Test Et (2 dakika)

Test kartı:
- **Kart No:** 5528 7900 0000 0008
- **Son Kullanma:** 12/30
- **CVC:** 123
- **İsim:** Test User

### 5️⃣ Canlıya Geç

Belgeler onaylandıktan sonra:
- Sandbox yerine Production anahtarlarını kullan
- `IYZICO_BASE_URL=https://api.iyzipay.com`

---

## Hemen Kullanılabilir Kod

### Backend (server.js)

```javascript
const Iyzipay = require('iyzipay');
require('dotenv').config();

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.IYZICO_BASE_URL
});

// Basit ödeme endpoint'i
app.post('/api/odeme-yap', (req, res) => {
  const request = {
    locale: 'tr',
    conversationId: Date.now().toString(),
    price: '100.00',
    paidPrice: '100.00',
    currency: 'TRY',
    installment: '1',
    basketId: 'B' + Date.now(),
    paymentChannel: 'WEB',
    paymentGroup: 'PRODUCT',
    
    paymentCard: {
      cardHolderName: req.body.cardHolderName,
      cardNumber: req.body.cardNumber.replace(/\s/g, ''),
      expireMonth: req.body.expireMonth,
      expireYear: req.body.expireYear,
      cvc: req.body.cvc
    },
    
    buyer: {
      id: 'BY' + Date.now(),
      name: req.body.name || 'Test',
      surname: req.body.surname || 'User',
      email: req.body.email || 'test@test.com',
      identityNumber: '11111111111',
      registrationAddress: 'Test Adres',
      city: 'Istanbul',
      country: 'Turkey',
      ip: req.ip || '85.34.78.112'
    },
    
    shippingAddress: {
      contactName: 'Test User',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Test Adres'
    },
    
    billingAddress: {
      contactName: 'Test User',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Test Adres'
    },
    
    basketItems: [{
      id: 'P1',
      name: 'Test Ürün',
      category1: 'Giyim',
      itemType: 'PHYSICAL',
      price: '100.00'
    }]
  };

  iyzipay.payment.create(request, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ success: false, error: err });
    }
    
    console.log(result);
    
    if (result.status === 'success') {
      res.json({ 
        success: true, 
        message: 'Ödeme başarılı!',
        paymentId: result.paymentId 
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: result.errorMessage 
      });
    }
  });
});
```

### Frontend (Basit Form)

```javascript
const [form, setForm] = useState({
  cardHolderName: '',
  cardNumber: '',
  expireMonth: '',
  expireYear: '',
  cvc: '',
  name: '',
  surname: '',
  email: ''
});

const handleOdeme = async () => {
  const response = await fetch('http://localhost:5000/api/odeme-yap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  });
  
  const result = await response.json();
  
  if (result.success) {
    alert('Ödeme başarılı!');
  } else {
    alert('Ödeme başarısız: ' + result.message);
  }
};
```

---

## Sık Sorulan Sorular

### Hesap açmak için ne gerekli?
- TC Kimlik No / Vergi No
- Banka hesabı (IBAN)
- E-posta ve telefon

### Onay süresi ne kadar?
- Test hesabı: Anında
- Canlı hesap: 1-3 iş günü

### Komisyon ne kadar?
- Başlangıç: %2.49 + KDV
- Ciro arttıkça düşer

### Para ne zaman hesabıma geçer?
- 1-2 iş günü içinde otomatik

### 3D Secure zorunlu mu?
- Evet, Türkiye'de zorunlu

### Test kartları gerçek para çeker mi?
- Hayır, sandbox tamamen test ortamı

---

## Destek

- 📧 E-posta: destek@iyzico.com
- 📞 Telefon: 0850 XXX XXXX
- 💬 Canlı destek: merchant.iyzipay.com
- 📚 Dokümantasyon: https://dev.iyzipay.com

---

## Sonraki Adımlar

1. ✅ Test ortamında dene
2. ✅ Gerçek belgelerle başvur
3. ✅ Onay bekle (1-3 gün)
4. ✅ Production anahtarlarını al
5. ✅ Canlıya geç
6. ✅ İlk satışını yap! 🎉
