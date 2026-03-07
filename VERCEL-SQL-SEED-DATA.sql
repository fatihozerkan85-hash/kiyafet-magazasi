-- VERCEL NEON SQL EDITOR'DE ÇALIŞTIRIN
-- https://vercel.com/dashboard → Storage → Neon → SQL Editor

-- 1. Önce mevcut verileri temizle (varsa)
DELETE FROM siparis_urunler;
DELETE FROM siparisler;
DELETE FROM urunler;
DELETE FROM kampanyalar;
DELETE FROM kategoriler;
DELETE FROM kuponlar;

-- 2. Kategoriler ekle
INSERT INTO kategoriler (ad, ad_en, emoji, resim, sira, aktif) VALUES
('Tümü', 'All', '🛍️', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop', 1, true),
('Elbise', 'Dress', '👗', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop', 2, true),
('Pantolon', 'Pants', '👖', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=300&fit=crop', 3, true),
('Gömlek', 'Shirt', '👔', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop', 4, true),
('Ceket', 'Jacket', '🧥', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', 5, true),
('Ayakkabı', 'Shoes', '👟', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop', 6, true),
('Aksesuar', 'Accessories', '👜', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=300&fit=crop', 7, true),
('Spor', 'Sports', '🏃', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop', 8, true);

-- 3. Kampanyalar ekle
INSERT INTO kampanyalar (baslik, aciklama, resim, link, aktif, baslangic_tarihi, bitis_tarihi, renk, sira) VALUES
('❄️ KIŞ SEZONUNUN SON FIRSATLARI', 'Tüm kış ürünlerinde %70''e varan indirimler', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=500&fit=crop', '/kategori/Ceket', true, '2024-03-01', '2024-03-31', '#2c3e50', 1),
('👗 Yeni Sezon Koleksiyonu', 'En yeni trendler şimdi mağazamızda', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=500&fit=crop', '/kategori/Elbise', true, '2024-03-01', '2024-04-30', '#e74c3c', 2),
('🚚 Ücretsiz Kargo', '200 TL ve üzeri alışverişlerde kargo bedava', 'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=1920&h=500&fit=crop', '/kategori/Tümü', true, '2024-03-01', '2024-12-31', '#28a745', 3);

-- 4. Ürünler ekle
INSERT INTO urunler (ad, ad_en, aciklama, aciklama_en, fiyat, eski_fiyat, kategori, beden, renk, resimler, stok_durumu, marka) VALUES
('Çiçek Desenli Elbise', 'Floral Dress', 'Yazlık çiçek desenli şık elbise', 'Stylish summer floral dress', 299.99, 399.99, 'Elbise', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Mavi', 'Pembe', 'Beyaz'], ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop'], true, 'Moda Dünyası'),
('Klasik Jean Pantolon', 'Classic Jeans', 'Rahat kesim kot pantolon', 'Comfortable fit denim pants', 199.99, NULL, 'Pantolon', ARRAY['36', '38', '40', '42'], ARRAY['Mavi', 'Siyah'], ARRAY['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop'], true, 'Denim Co'),
('Beyaz Gömlek', 'White Shirt', 'Ofis için ideal şık gömlek', 'Elegant shirt ideal for office', 149.99, 199.99, 'Gömlek', ARRAY['S', 'M', 'L'], ARRAY['Beyaz', 'Siyah', 'Krem'], ARRAY['https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=600&fit=crop'], true, 'Elegant Style'),
('Deri Ceket', 'Leather Jacket', 'Suni deri şık ceket', 'Stylish faux leather jacket', 599.99, NULL, 'Ceket', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Siyah', 'Kahverengi'], ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop'], true, 'Leather Style'),
('Spor Ayakkabı', 'Sports Shoes', 'Rahat günlük spor ayakkabı', 'Comfortable daily sports shoes', 349.99, NULL, 'Ayakkabı', ARRAY['38', '39', '40', '41', '42', '43'], ARRAY['Beyaz', 'Siyah', 'Gri'], ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop'], true, 'Sport Pro');

-- 5. Kuponlar ekle
INSERT INTO kuponlar (kod, indirim_tipi, indirim_miktari, aktif, kullanim_sayisi) VALUES
('HOSGELDIN', 'yuzde', 10, true, 0),
('YENISEZON', 'yuzde', 15, true, 0),
('50TL', 'sabit', 50, true, 0);

-- 6. Kontrol et
SELECT 'Kategoriler' as tablo, COUNT(*) as adet FROM kategoriler
UNION ALL
SELECT 'Kampanyalar', COUNT(*) FROM kampanyalar
UNION ALL
SELECT 'Ürünler', COUNT(*) FROM urunler
UNION ALL
SELECT 'Kuponlar', COUNT(*) FROM kuponlar;
