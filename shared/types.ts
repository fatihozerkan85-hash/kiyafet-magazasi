export interface Urun {
  id: string;
  ad: string;
  aciklama: string;
  fiyat: number;
  eskiFiyat?: number;
  kategori: string;
  beden: string[];
  renk: string[];
  resimler: string[];
  stokDurumu: boolean;
  marka: string;
}

export interface Kategori {
  id: string;
  ad: string;
  resim: string;
  altKategoriler?: Kategori[];
}

export interface SepetItem {
  urun: Urun;
  adet: number;
  secilenBeden: string;
  secilenRenk: string;
}

export interface Kullanici {
  id: string;
  ad: string;
  soyad: string;
  email: string;
  telefon: string;
  adresler: Adres[];
}

export interface Adres {
  id: string;
  baslik: string;
  adres: string;
  il: string;
  ilce: string;
  postaKodu: string;
}

export interface Siparis {
  id: string;
  kullaniciId: string;
  urunler: SepetItem[];
  toplamTutar: number;
  durum: 'beklemede' | 'hazirlaniyor' | 'kargoda' | 'teslim-edildi';
  teslimatAdresi: Adres;
  olusturmaTarihi: Date;
}
