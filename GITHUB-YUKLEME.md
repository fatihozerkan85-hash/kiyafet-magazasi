# 📤 GitHub'a Yükleme Rehberi

## Adım Adım GitHub'a Yükleme

### 1️⃣ GitHub Hesabı Oluştur (Yoksa)

1. https://github.com/signup adresine git
2. Email adresinizi girin
3. Şifre oluşturun
4. Kullanıcı adı seçin
5. Email'inizi doğrulayın

---

### 2️⃣ GitHub'da Repository Oluştur

1. https://github.com adresine git
2. Sağ üstte **"+"** işaretine tıkla
3. **"New repository"** seç
4. Repository bilgileri:
   - **Repository name:** `kiyafet-magazasi`
   - **Description:** "Online kıyafet mağazası e-ticaret sitesi"
   - **Public** seçili olsun (ücretsiz deployment için gerekli)
   - **Initialize this repository with:** HİÇBİR ŞEY SEÇMEYİN (boş bırakın)
5. **"Create repository"** tıkla

✅ Repository oluşturuldu! Şimdi sayfayı açık tutun.

---

### 3️⃣ VS Code'da Terminal Aç

1. VS Code'u açın
2. Üst menüden **Terminal** → **New Terminal**
3. Terminal alt kısımda açılacak

---

### 4️⃣ Git Yapılandırması (İlk Kez)

Terminal'de şu komutları çalıştırın (kendi bilgilerinizi yazın):

```bash
git config --global user.name "Adınız Soyadınız"
git config --global user.email "github-email@example.com"
```

**Örnek:**
```bash
git config --global user.name "Ahmet Yilmaz"
git config --global user.email "ahmet@example.com"
```

---

### 5️⃣ Projeyi Git'e Hazırla

Terminal'de sırayla şu komutları çalıştırın:

#### Komut 1: Git başlat
```bash
git init
```
✅ Çıktı: "Initialized empty Git repository..."

#### Komut 2: Tüm dosyaları ekle
```bash
git add .
```
✅ Sessizce tamamlanır

#### Komut 3: İlk commit
```bash
git commit -m "Kıyafet mağazası ilk yükleme"
```
✅ Çıktı: Dosya sayısı ve değişiklikler

#### Komut 4: Ana branch adını ayarla
```bash
git branch -M main
```
✅ Sessizce tamamlanır

---

### 6️⃣ GitHub'a Bağlan ve Yükle

GitHub'da oluşturduğunuz repository sayfasında **"…or push an existing repository from the command line"** bölümünü bulun.

Orada 2 komut göreceksiniz. Terminal'de sırayla çalıştırın:

#### Komut 1: Remote ekle
```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/kiyafet-magazasi.git
```

**ÖNEMLİ:** `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın!

**Örnek:**
```bash
git remote add origin https://github.com/ahmetyilmaz/kiyafet-magazasi.git
```

#### Komut 2: GitHub'a yükle
```bash
git push -u origin main
```

**İlk kez yüklüyorsanız:**
- GitHub kullanıcı adı ve şifre isteyebilir
- Veya tarayıcıda GitHub login sayfası açılabilir
- Giriş yapın ve izin verin

✅ Yükleme başladı! Tamamlanmasını bekleyin.

---

### 7️⃣ Kontrol Et

1. GitHub repository sayfanızı yenileyin (F5)
2. Tüm dosyalarınızı görmelisiniz!

✅ **BAŞARILI!** Kodunuz GitHub'da!

---

## 🎉 Tamamlandı!

Artık kodunuz GitHub'da ve şunları yapabilirsiniz:

1. ✅ Vercel'e deploy edebilirsiniz
2. ✅ Başkalarıyla paylaşabilirsiniz
3. ✅ Yedeklenmiş oldu
4. ✅ Versiyon kontrolü var

---

## 🔄 Değişiklik Yüklemek İçin

Kod değiştirdikten sonra:

```bash
git add .
git commit -m "Değişiklik açıklaması"
git push
```

---

## 🆘 Sorun Giderme

### "git: command not found" hatası:
Git kurulu değil. İndirin: https://git-scm.com/download/win

### "Permission denied" hatası:
GitHub şifreniz yanlış veya Personal Access Token gerekiyor.

**Personal Access Token oluşturmak için:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token (classic)"
3. Note: "Kiyafet Magazasi"
4. Expiration: 90 days
5. Scopes: **repo** seçin
6. "Generate token"
7. Token'ı kopyalayın (bir daha göremezsiniz!)
8. `git push` yaparken şifre yerine bu token'ı kullanın

### "Repository already exists" hatası:
GitHub'da aynı isimde repository var. Farklı isim kullanın veya eskisini silin.

---

## 📞 Yardım

Takıldığınız yerde:
1. Hata mesajını okuyun
2. Komutu tekrar deneyin
3. GitHub kullanıcı adınızı doğru yazdığınızdan emin olun

**Başarılar! 🚀**
