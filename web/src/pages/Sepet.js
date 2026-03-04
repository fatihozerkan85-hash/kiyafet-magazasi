import React from 'react';
import { Link } from 'react-router-dom';
import './Sepet.css';

function Sepet({ sepet, setSepet }) {
  const toplamTutar = sepet.reduce((sum, item) => sum + (item.urun.fiyat * item.adet), 0);

  const adetArtir = (index) => {
    setSepet(prev => prev.map((item, i) => 
      i === index ? { ...item, adet: item.adet + 1 } : item
    ));
  };

  const adetAzalt = (index) => {
    setSepet(prev => prev.map((item, i) => 
      i === index && item.adet > 1 ? { ...item, adet: item.adet - 1 } : item
    ));
  };

  const urunSil = (index) => {
    setSepet(prev => prev.filter((_, i) => i !== index));
  };

  if (sepet.length === 0) {
    return (
      <div className="container sepet-bos">
        <h2>Sepetiniz Boş</h2>
        <p>Alışverişe başlamak için ürünleri inceleyin</p>
        <Link to="/" className="alisverise-don-btn">Alışverişe Başla</Link>
      </div>
    );
  }

  return (
    <div className="container sepet-sayfa">
      <h1>Sepetim</h1>
      
      <div className="sepet-grid">
        <div className="sepet-urunler">
          {sepet.map((item, index) => (
            <div key={index} className="sepet-item">
              <img src={item.urun.resimler[0]} alt={item.urun.ad} />
              
              <div className="item-bilgi">
                <h3>{item.urun.ad}</h3>
                <p>Beden: {item.secilenBeden}</p>
                <p>Renk: {item.secilenRenk}</p>
              </div>
              
              <div className="item-adet">
                <button onClick={() => adetAzalt(index)}>-</button>
                <span>{item.adet}</span>
                <button onClick={() => adetArtir(index)}>+</button>
              </div>
              
              <div className="item-fiyat">
                {(item.urun.fiyat * item.adet).toFixed(2)} ₺
              </div>
              
              <button className="sil-btn" onClick={() => urunSil(index)}>🗑️</button>
            </div>
          ))}
        </div>
        
        <div className="sepet-ozet">
          <h2>Sipariş Özeti</h2>
          <div className="ozet-satir">
            <span>Ara Toplam:</span>
            <span>{toplamTutar.toFixed(2)} ₺</span>
          </div>
          <div className="ozet-satir">
            <span>Kargo:</span>
            <span>Ücretsiz</span>
          </div>
          <div className="ozet-satir toplam">
            <span>Toplam:</span>
            <span>{toplamTutar.toFixed(2)} ₺</span>
          </div>
          <button className="odeme-btn">Ödemeye Geç</button>
        </div>
      </div>
    </div>
  );
}

export default Sepet;
