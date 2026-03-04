# 🔧 Vercel Root Directory Sorunu - Kesin Çözüm

## 🔍 Sorun

Admin panel 404 veriyor çünkü Vercel yanlış klasörü deploy ediyor.

**Neden?**
- Vercel root klasörü deploy ediyor
- `web` klasörünü deploy etmesi gerekiyor
- `admin-tam.html` dosyası `web/public/` içinde

## ✅ Kesin Çözüm

### Adım 1: Vercel Settings

1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **"kiyafet-magazasi-web"** projesine tıkla
3. **"Settings"** sekmesi
4. **"General"** bölümü
5. **"Root Directory"** bul

**Şu anda ne yazıyor?**
- Boş ise → `web` yaz
- `.` ise → `web` yaz
- Başka bir şey ise → `web` yaz

6. **"Save"** tıkla

### Adım 2: Build Settings Kontrol

Aynı Settings sayfasında:

**Build & Development Settings:**
```
Framework Preset: Create React App
Build Command: npm run build
Output Directory: build
Install Command: npm install
Root Directory: web          ← ÖNEMLİ!
```

### Adım 3: Redeploy

1. **"Deployments"** sekmesi
2. En son deployment → **"..."** menü
3. **"Redeploy"**
4. 2-3 dakika bekle

### Adım 4: Test

Deploy bitince:
```
https://kiyafet-magazasi.vercel.app/admin-tam.html
```

---

## 🔍 Alternatif: Hangi Proje Doğru?

Vercel'de 3 proje var:
1. `kiyafet-magazasi-web-18b6` (Hash'li)
2. `kiyafet-magazasi-backend`
3. `kiyafet-magazasi-web`

**Doğru proje:** `kiyafet-magazasi-web` (hash'siz)

**Test URL'leri:**
```
https://kiyafet-magazasi-web.vercel.app/admin-tam.html
https://kiyafet-magazasi-web-18b6.vercel.app/admin-tam.html
```

Hangisi çalışıyor?

---

## 📊 Build Loglarını Kontrol

Deployment'a tıklayın ve logları kontrol edin:

**Aranacak Satırlar:**
```
✓ Copying files from "public" directory
  - index.html
  - admin.html          ← Bu olmalı
  - admin-tam.html      ← Bu olmalı
  - admin-full.html     ← Bu olmalı
```

Eğer bu satırlar yoksa, Root Directory yanlış!

---

## 🎯 Kesin Test

Şu URL'leri deneyin:

**Ana Site (Çalışıyor):**
```
https://kiyafet-magazasi.vercel.app/
```

**Admin Panel (Test):**
```
https://kiyafet-magazasi.vercel.app/admin.html
https://kiyafet-magazasi.vercel.app/admin-tam.html
https://kiyafet-magazasi.vercel.app/admin-full.html
```

Hangisi çalışıyor? Hiçbiri çalışmıyorsa Root Directory yanlış.

---

## 🔧 Manuel Kontrol

Local'de kontrol edin:

```bash
cd web/public
dir
```

Şunları görmelisiniz:
- index.html
- admin.html
- admin-tam.html
- admin-full.html

Eğer bu dosyalar varsa, sorun Vercel ayarlarında.

---

## ✅ Çözüm Adımları Özet

1. Vercel → Settings → Root Directory → "web" yaz
2. Save
3. Deployments → Redeploy
4. 2-3 dakika bekle
5. Test: https://kiyafet-magazasi.vercel.app/admin-tam.html

---

## 🚨 Hala Çalışmıyorsa

Vercel'de yeni bir deployment oluşturun:

1. Vercel Dashboard
2. "kiyafet-magazasi-web" projesi
3. Settings → General
4. "Root Directory" → "web"
5. Save
6. Git → GitHub'a boş commit:
   ```bash
   git commit --allow-empty -m "Trigger deploy"
   git push
   ```
7. Vercel otomatik deploy edecek

---

## 📞 Son Çare

Eğer hiçbir şey çalışmazsa:

1. Vercel'de projeyi silin
2. Yeniden import edin
3. Root Directory'yi baştan "web" olarak ayarlayın
4. Deploy edin

Ama önce yukarıdaki adımları deneyin!
