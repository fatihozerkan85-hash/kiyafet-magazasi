# Vercel Deployment Kontrol

## Şu anda yapılması gerekenler:

### 1. Vercel Dashboard'ı Aç
https://vercel.com/fatihozerkan85-haas-projects/kiyafet-magazasi-backend

### 2. Deployment Durumunu Kontrol Et

En son deployment'ı bul (f86a8db commit hash'i ile):
- "Emergency fix: Add manual seed data endpoint + health check improvements"

Durum kontrolleri:
- ⏳ **Building** → Bekle
- ⏳ **Ready** → Deployment tamamlandı, seed data çalıştırabilirsin
- ❌ **Error** → Logs'a bak, hata var

### 3. Deployment Tamamlandıysa

Eğer durum "Ready" ise ama hala "Failed to fetch" alıyorsan:

#### A. Cache Problemi Olabilir
1. Tarayıcıda Ctrl+Shift+R (hard refresh)
2. Veya yeni bir incognito/private window aç
3. SEED-DATA-TRIGGER.html'i tekrar aç

#### B. URL Kontrol
Backend URL doğru mu kontrol et:
```
https://kiyafet-magazasi-backend.vercel.app/api/admin/seed-data
```

### 4. Manuel Test

Tarayıcıda bu URL'i aç:
```
https://kiyafet-magazasi-backend.vercel.app/api/health
```

Eğer çalışıyorsa, seed data endpoint'i de çalışıyor demektir.

### 5. Alternatif: Browser Console'dan Çalıştır

1. Tarayıcıda F12 bas (Developer Tools)
2. Console tab'ına git
3. Şu kodu yapıştır ve Enter'a bas:

```javascript
fetch('https://kiyafet-magazasi-backend.vercel.app/api/admin/seed-data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
.then(r => r.json())
.then(d => {
  console.log('✅ BAŞARILI!', d);
  alert('Seed data eklendi! Kategoriler: ' + d.counts.kategoriler + ', Kampanyalar: ' + d.counts.kampanyalar);
})
.catch(e => {
  console.error('❌ HATA:', e);
  alert('Hata: ' + e.message);
});
```

## Deployment Süresi

Normal deployment süresi: 1-3 dakika

Eğer 5 dakikadan fazla sürüyorsa:
1. Vercel Dashboard'da logs'a bak
2. Build error var mı kontrol et
3. Gerekirse redeploy yap

## Son Çare: Manuel Redeploy

Eğer deployment takılı kaldıysa:

1. Vercel Dashboard → kiyafet-magazasi-backend
2. En son deployment'ın yanındaki "..." menüsü
3. "Redeploy" → "Use existing Build Cache" seçeneğini KAPAT
4. "Redeploy" butonuna tıkla
