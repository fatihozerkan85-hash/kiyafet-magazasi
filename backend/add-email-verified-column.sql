-- Email verified kolonu ekle
ALTER TABLE kullanicilar 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;

-- Mevcut kullanıcıları verified yap
UPDATE kullanicilar SET email_verified = true WHERE email_verified IS NULL;
