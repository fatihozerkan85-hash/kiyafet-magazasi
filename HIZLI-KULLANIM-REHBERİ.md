# 🚀 HIZLI KULLANIM REHBERİ - YENİ ÖZELLİKLER

## 📊 1. RAPORLAMA SİSTEMİ

### Nasıl Kullanılır?
1. Admin paneline gir: https://kiyafet-magazasi-web-18b6.vercel.app/admin-tam.html
2. Kullanıcı: `admin` / Şifre: `admin123`
3. **"Raporlar"** sekmesine tıkla

### Ne Görebilirsin?
- **Satış Raporu**: Günlük/Haftalık/Aylık satış istatistikleri
- **En Çok Satanlar**: Top 10 ürün listesi
- **Kategori Satışları**: Hangi kategori ne kadar satıyor?
- **Gelir Grafiği**: Son 30 günlük gelir trendi

### Örnek Kullanım
```
1. "Günlük" butonuna tıkla → Bugünün satışlarını gör
2. "Haftalık" butonuna tıkla → Son 7 günün satışlarını gör
3. "Aylık" butonuna tıkla → Son 30 günün satışlarını gör
```

---

## 👥 2. MÜŞTERİ SEGMENTASYONU

### Nasıl Kullanılır?
1. Admin paneline gir
2. **"Kullanıcılar"** sekmesine tıkla

### Segmentler
- **👑 VIP**: 5+ sipariş VEYA 5000+ TL harcama
- **⭐ Sadık**: 3-4 sipariş
- **🆕 Yeni**: 1-2 sipariş (son 90 gün)
- **😴 Pasif**: 90+ gün sipariş yok

### Ne Yapabilirsin?
1. Her segment'i ayrı ayrı görüntüle
2. Müşteri detaylarını incele (sipariş sayısı, harcama, son sipariş)
3. Segment'e toplu email gönder
4. Segment'e toplu SMS gönder

### Örnek Kullanım
```
1. "VIP" butonuna tıkla → VIP müşterileri gör
2. "Segment'e Email Gönder" → Kampanya mesajı yaz
3. Mesaj tüm VIP müşterilere gönderilir
```

---

## 🌍 3. DİL DEĞİŞTİRME

### Nasıl Kullanılır?
1. Ana siteye git: https://kiyafet-magazasi.vercel.app
2. Header'da (sağ üstte) dil seçiciyi bul
3. 🇹🇷 Türkçe veya 🇬🇧 English seç

### Ne Değişir?
- Tüm butonlar
- Menü metinleri
- Form etiketleri
- Bildirim mesajları
- Ürün sayfaları

### Özellikler
- Sayfa yenilenmeden dil değişir
- Seçim localStorage'da kaydedilir
- Bir sonraki ziyarette aynı dil açılır

### Örnek Kullanım
```
1. Dil seçicide "English" seç
2. "Giriş Yap" → "Login" olur
3. "Sepete Ekle" → "Add to Cart" olur
4. "Siparişlerim" → "My Orders" olur
```

---

## 🎯 HIZLI TEST

### Raporları Test Et
```bash
1. Admin panel > Raporlar
2. "Günlük" butonuna tıkla
3. Satış istatistiklerini gör
4. En çok satanlar listesini incele
5. Gelir grafiğini kontrol et
```

### Segmentasyonu Test Et
```bash
1. Admin panel > Kullanıcılar
2. "VIP" segment'ini seç
3. Müşteri listesini gör
4. "Segment'e Email Gönder" butonunu dene
5. Test mesajı yaz ve gönder
```

### Dil Değiştirmeyi Test Et
```bash
1. Ana site > Header
2. Dil seçicide "English" seç
3. Tüm sayfaları gez
4. Metinlerin İngilizce olduğunu gör
5. Tekrar "Türkçe" seç
```

---

## 📱 EKRAN GÖRÜNTÜLERİ

### Raporlar Sekmesi
```
┌─────────────────────────────────────┐
│ 📊 Satış Raporu                     │
│ [Günlük] [Haftalık] [Aylık]        │
│                                     │
│ Toplam Satış: 150                   │
│ Toplam Gelir: 45,000 ₺              │
│ Ortalama Sepet: 300 ₺               │
│                                     │
│ 🏆 En Çok Satan Ürünler             │
│ 1. Çiçek Desenli Elbise - 25 adet  │
│ 2. Klasik Jean Pantolon - 20 adet  │
│                                     │
│ 💰 Gelir Grafiği                    │
│ [Bar Chart - Son 30 Gün]           │
└─────────────────────────────────────┘
```

### Müşteri Segmentleri
```
┌─────────────────────────────────────┐
│ 👥 Kullanıcılar                     │
│ [👑 VIP] [⭐ Sadık] [🆕 Yeni] [😴 Pasif] │
│                                     │
│ [📧 Email Gönder] [📱 SMS Gönder]   │
│                                     │
│ Ad Soyad    | Sipariş | Harcama    │
│ ─────────────────────────────────── │
│ Ahmet Yılmaz | 8      | 12,500 ₺   │
│ Ayşe Demir   | 6      | 8,900 ₺    │
└─────────────────────────────────────┘
```

### Dil Seçici
```
┌─────────────────────────────────────┐
│ KIYAFET MAĞAZASI    [🇹🇷 Türkçe ▼] │
│                     [🔍 Ara...]     │
│                     [🔐 Giriş]      │
│                     [🛒 (3)]        │
└─────────────────────────────────────┘
```

---

## 🔧 SORUN GİDERME

### Raporlar Görünmüyor
```
✓ Admin paneline giriş yaptın mı?
✓ "Raporlar" sekmesine tıkladın mı?
✓ Backend çalışıyor mu? (API_URL kontrol et)
```

### Segmentler Boş
```
✓ Sistemde kullanıcı var mı?
✓ Kullanıcıların siparişi var mı?
✓ Backend API çalışıyor mu?
```

### Dil Değişmiyor
```
✓ Dil seçiciyi kullandın mı?
✓ Sayfa yenilendi mi?
✓ localStorage temiz mi?
```

---

## 📞 DESTEK

Sorun yaşarsan:
1. Browser console'u aç (F12)
2. Hata mesajlarını kontrol et
3. API_URL doğru mu kontrol et
4. Backend çalışıyor mu test et

---

✅ **HAZIRSIN! Yeni özellikleri kullanmaya başla!** 🎉
