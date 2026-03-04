# 📋 Adım Adım Kurulum Rehberi

## ⚠️ ÖNEMLİ: Node.js Kurulumu Gerekli

Projeyi çalıştırmak için önce Node.js kurmanız gerekiyor.

### 1️⃣ Node.js Kurulumu

1. **İndirin:**
   - [Node.js İndir](https://nodejs.org/en/download/)
   - **LTS** (Long Term Support) versiyonunu seçin
   - Windows için: "Windows Installer (.msi)" - 64-bit

2. **Kurun:**
   - İndirilen dosyayı çalıştırın
   - "Next" ile devam edin
   - Tüm varsayılan ayarları kabul edin
   - "Install" tıklayın
   - Kurulum bitince bilgisayarı yeniden başlatın (önemli!)

3. **Kontrol Edin:**
   - Bilgisayarı yeniden başlattıktan sonra
   - Bu klasörde terminali açın (klasöre sağ tıklayıp "Open in Terminal")
   - Şu komutu çalıştırın:
   ```bash
   node --version
   ```
   - Versiyon numarası görmelisiniz (örn: v20.10.0)

---

### 2️⃣ Proje Bağımlılıklarını Yükleyin

Terminal açın ve sırayla çalıştırın:

```bash
cd backend
npm install
```

Bekleyin... (1-2 dakika sürebilir)

```bash
cd ../web
npm install
```

Bekleyin... (2-3 dakika sürebilir)

---

### 3️⃣ Uygulamayı Başlatın

**Yöntem 1: Otomatik (Kolay)**

`start.bat` dosyasına çift tıklayın

**Yöntem 2: Manuel**

İki terminal açın:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

Şunu görmelisiniz:
```
Backend sunucu 5000 portunda çalışıyor
```

**Terminal 2 (Web):**
```bash
cd web
npm start
```

Tarayıcı otomatik açılacak veya: http://localhost:3000

---

### 4️⃣ Test Edin

Web sitesi açıldığında:
- ✅ Ana sayfada ürünleri görebilmelisiniz
- ✅ Kategoriler görünmeli
- ✅ Bir ürüne tıklayın → Detay sayfası açılmalı
- ✅ Beden ve renk seçin
- ✅ "Sepete Ekle" butonuna tıklayın
- ✅ Sağ üstteki sepet ikonuna tıklayın
- ✅ Sepetinizde ürünü görmelisiniz

---

## ❌ Sorun mu Yaşıyorsunuz?

### "node: command not found" veya "node is not recognized"
→ Node.js kurulmamış veya bilgisayar yeniden başlatılmamış
→ Çözüm: Node.js'i kurun ve bilgisayarı yeniden başlatın

### "npm: command not found"
→ Node.js düzgün kurulmamış
→ Çözüm: Node.js'i kaldırıp tekrar kurun

### "Port 3000 already in use"
→ Başka bir uygulama 3000 portunu kullanıyor
→ Çözüm: Diğer uygulamayı kapatın veya:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID_NUMARASI> /F
```

### "Cannot GET /api/urunler" veya bağlantı hatası
→ Backend çalışmıyor
→ Çözüm: Backend terminalini kontrol edin, hata var mı bakın

### Sayfa boş görünüyor
→ Backend'e bağlanamıyor olabilir
→ Çözüm: http://localhost:5000/api/urunler adresini tarayıcıda açın
→ JSON verisi görmelisiniz

### "npm install" çok uzun sürüyor
→ Normal, ilk kurulumda 5-10 dakika sürebilir
→ İnternet bağlantınızı kontrol edin

---

## ✅ Başarılı Kurulum Kontrol Listesi

- [ ] Node.js kuruldu (node --version çalışıyor)
- [ ] npm kuruldu (npm --version çalışıyor)
- [ ] Backend bağımlılıkları yüklendi
- [ ] Web bağımlılıkları yüklendi
- [ ] Backend başlatıldı (port 5000)
- [ ] Web başlatıldı (port 3000)
- [ ] Tarayıcıda site açıldı
- [ ] Ürünler görünüyor
- [ ] Sepete ekleme çalışıyor

---

## 📞 Yardım

Hala sorun yaşıyorsanız:
1. Terminaldeki hata mesajını tam olarak kopyalayın
2. Hangi adımda takıldığınızı belirtin
3. Ekran görüntüsü alın

Node.js kurulumu: https://nodejs.org/
Node.js kurulum videosu: YouTube'da "Node.js kurulumu" aratın
