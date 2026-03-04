import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';

export default function Sepet({ sepet, setSepet, navigation }) {
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
      <View style={styles.bosContainer}>
        <Text style={styles.bosBaslik}>Sepetiniz Boş</Text>
        <Text style={styles.bosAciklama}>Alışverişe başlamak için ürünleri inceleyin</Text>
        <TouchableOpacity 
          style={styles.alisveriseBaslaBtn}
          onPress={() => navigation.navigate('AnaSayfa')}
        >
          <Text style={styles.alisveriseBaslaText}>Alışverişe Başla</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sepet}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.sepetItem}>
            <Image source={{ uri: item.urun.resimler[0] }} style={styles.resim} />
            
            <View style={styles.bilgiContainer}>
              <Text style={styles.urunAd}>{item.urun.ad}</Text>
              <Text style={styles.detay}>Beden: {item.secilenBeden}</Text>
              <Text style={styles.detay}>Renk: {item.secilenRenk}</Text>
              
              <View style={styles.altBilgi}>
                <View style={styles.adetContainer}>
                  <TouchableOpacity 
                    style={styles.adetBtn}
                    onPress={() => adetAzalt(index)}
                  >
                    <Text style={styles.adetBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.adet}>{item.adet}</Text>
                  <TouchableOpacity 
                    style={styles.adetBtn}
                    onPress={() => adetArtir(index)}
                  >
                    <Text style={styles.adetBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.fiyat}>
                  {(item.urun.fiyat * item.adet).toFixed(2)} ₺
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.silBtn}
              onPress={() => urunSil(index)}
            >
              <Text style={styles.silIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      
      <View style={styles.ozetContainer}>
        <View style={styles.ozetSatir}>
          <Text style={styles.ozetLabel}>Toplam:</Text>
          <Text style={styles.toplamTutar}>{toplamTutar.toFixed(2)} ₺</Text>
        </View>
        <TouchableOpacity style={styles.odemeBtn}>
          <Text style={styles.odemeBtnText}>Ödemeye Geç</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bosBaslik: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bosAciklama: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  alisveriseBaslaBtn: {
    backgroundColor: '#667eea',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  alisveriseBaslaText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sepetItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 12,
  },
  resim: {
    width: 100,
    height: 130,
    borderRadius: 8,
  },
  bilgiContainer: {
    flex: 1,
    marginLeft: 15,
  },
  urunAd: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  detay: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  altBilgi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  adetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 5,
  },
  adetBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  adetBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  adet: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  fiyat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  silBtn: {
    padding: 10,
  },
  silIcon: {
    fontSize: 20,
  },
  ozetContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  ozetSatir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  ozetLabel: {
    fontSize: 18,
    color: '#666',
  },
  toplamTutar: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  odemeBtn: {
    backgroundColor: '#667eea',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  odemeBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
