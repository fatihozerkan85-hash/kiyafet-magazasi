# 🚀 En Basit GitHub Yükleme Rehberi

## 3 Adımda GitHub'a Yükle

### 📋 Önce Bunları Yap:

1. **GitHub hesabı aç:** https://github.com/signup
2. **GitHub'da repository oluştur:**
   - Git: https://github.com/new
   - İsim: `kiyafet-magazasi`
   - Public seç
   - Create repository tıkla
   - **Sayfayı açık tut!**

---

## 🎯 Yöntem 1: Otomatik Script (Kolay)

1. **github-yukle.bat** dosyasına çift tıkla
2. Bilgileri gir:
   - GitHub kullanıcı adın
   - Adın soyadın
   - Email adresin
3. GitHub şifreni gir
4. Bekle, tamamlanacak!

✅ **TAMAMLANDI!**

---

## 🎯 Yöntem 2: Manuel (Adım Adım)

### 1. VS Code'da Terminal Aç
- Terminal menüsü → New Terminal

### 2. Bu Komutları Sırayla Çalıştır:

#### A) Git Yapılandır (İlk kez)
```bash
git config --global user.name "Adınız Soyadınız"
git config --global user.email "email@example.com"
```

#### B) Projeyi Hazırla
```bash
git init
git add .
git commit -m "İlk yükleme"
git branch -M main
```

#### C) GitHub'a Bağlan
```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/kiyafet-magazasi.git
```
**ÖNEMLİ:** `KULLANICI_ADINIZ` yerine kendi kullanıcı adınızı yazın!

#### D) Yükle
```bash
git push -u origin main
```

GitHub şifrenizi girin ve bekleyin!

✅ **TAMAMLANDI!**

---

## 🎉 Kontrol Et

GitHub repository sayfanızı yenileyin (F5)
Tüm dosyalarınızı görmelisiniz!

**Repository URL:**
```
https://github.com/KULLANICI_ADINIZ/kiyafet-magazasi
```

---

## ⏭️ Sonraki Adım: Vercel'e Deploy

Artık **HIZLI-DEPLOY.md** dosyasını açıp Vercel'e deploy edebilirsiniz!

---

## 🆘 Sorun mu Var?

### Git kurulu değil:
https://git-scm.com/download/win adresinden indirin

### Şifre istemiyor:
GitHub → Settings → Developer settings → Personal access tokens
Token oluşturun ve şifre yerine kullanın

### "Repository already exists":
GitHub'da aynı isimde repo var, farklı isim kullanın

---

## 💡 İpucu

Kod değiştirdikten sonra tekrar yüklemek için:
```bash
git add .
git commit -m "Değişiklik"
git push
```

**Başarılar! 🚀**
