# 🟢 Node.js Kurulum Rehberi

## Node.js Nedir?

Node.js, JavaScript kodlarını bilgisayarınızda çalıştırmanızı sağlayan bir platformdur. Bu projeyi çalıştırmak için gereklidir.

---

## Windows için Kurulum

### Adım 1: İndirin

1. Tarayıcınızda şu adresi açın: **https://nodejs.org/**

2. Ana sayfada iki seçenek göreceksiniz:
   - **LTS (Önerilen)** - Uzun süreli destek, daha kararlı
   - **Current** - En yeni özellikler
   
   → **LTS versiyonunu seçin** (örn: 20.10.0 LTS)

3. "Download Node.js (LTS)" butonuna tıklayın

4. İndirme otomatik başlayacak (yaklaşık 30 MB)

### Adım 2: Kurun

1. İndirilen dosyayı bulun (genellikle "İndirilenler" klasöründe)
   - Dosya adı: `node-v20.x.x-x64.msi` gibi olacak

2. Dosyaya çift tıklayın

3. Kurulum sihirbazı açılacak:
   - "Next" tıklayın
   - Lisans sözleşmesini kabul edin → "Next"
   - Kurulum yeri (varsayılan bırakın) → "Next"
   - Özellikler (hepsini seçili bırakın) → "Next"
   - "Install" tıklayın
   - Windows yönetici izni isteyecek → "Evet" tıklayın

4. Kurulum tamamlanınca "Finish" tıklayın

### Adım 3: Bilgisayarı Yeniden Başlatın

**ÖNEMLİ:** Node.js'in düzgün çalışması için bilgisayarınızı yeniden başlatın!

### Adım 4: Kontrol Edin

1. Bilgisayar yeniden başladıktan sonra:

2. **PowerShell** veya **Command Prompt** açın:
   - Windows tuşuna basın
   - "cmd" veya "powershell" yazın
   - Enter'a basın

3. Şu komutu yazın ve Enter'a basın:
   ```bash
   node --version
   ```

4. Versiyon numarası görmelisiniz:
   ```
   v20.10.0
   ```

5. npm'i de kontrol edin:
   ```bash
   npm --version
   ```
   
   Çıktı:
   ```
   10.2.3
   ```

✅ **Başarılı!** Node.js kuruldu.

---

## Kurulum Sonrası

Artık projeyi çalıştırabilirsiniz:

1. Proje klasörünü açın
2. `KURULUM-ADIM-ADIM.md` dosyasını okuyun
3. Adımları takip edin

---

## Sorun Giderme

### "node: command not found" hatası alıyorum

**Çözüm 1:** Bilgisayarı yeniden başlatın

**Çözüm 2:** Terminali kapatıp yeniden açın

**Çözüm 3:** Node.js'i kaldırıp tekrar kurun:
- Ayarlar → Uygulamalar → Node.js → Kaldır
- Tekrar indirip kurun

### Kurulum sırasında hata alıyorum

**Çözüm 1:** Antivirüs programını geçici olarak kapatın

**Çözüm 2:** Yönetici olarak çalıştırın:
- Kurulum dosyasına sağ tıklayın
- "Yönetici olarak çalıştır" seçin

**Çözüm 3:** Eski Node.js versiyonunu kaldırın:
- Ayarlar → Uygulamalar → Node.js → Kaldır
- Bilgisayarı yeniden başlatın
- Tekrar kurun

### npm çalışmıyor

npm, Node.js ile birlikte gelir. Eğer çalışmıyorsa:
- Node.js'i tamamen kaldırın
- Bilgisayarı yeniden başlatın
- Node.js'i tekrar kurun

---

## Alternatif Kurulum Yöntemleri

### Chocolatey ile (İleri seviye)

```bash
choco install nodejs-lts
```

### Winget ile (Windows 11)

```bash
winget install OpenJS.NodeJS.LTS
```

---

## Faydalı Linkler

- Resmi Site: https://nodejs.org/
- Dokümantasyon: https://nodejs.org/docs/
- npm Dokümantasyon: https://docs.npmjs.com/

---

## Video Rehberler

YouTube'da aratın:
- "Node.js kurulumu Windows"
- "Node.js installation Windows"
- "How to install Node.js"

---

Node.js kurulumunu tamamladıktan sonra `KURULUM-ADIM-ADIM.md` dosyasına dönün ve projeyi çalıştırın!
