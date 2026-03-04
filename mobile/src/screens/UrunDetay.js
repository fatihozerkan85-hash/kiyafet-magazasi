import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

export default function UrunDetay({ route, navigation, sepeteEkle }) {
  const { urunId } = route.params;
  const [urun, setUrun] = useState(null);
  const [secilenBeden, setSecilenBeden] = useState('');
  const [secilenRenk, setSecilenRenk] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/urunler/${urunId}`)
      .then(res => res.json())
      .then(data => {
        setUrun(data);
        setSecilenBeden(data.beden[0]);
        setSecilenRenk(data.renk[0]);
      })
      .catch(err => console.error(err));
  }, [urunId]);

  const handleSepeteEkle = () => {
    if (urun && secilenBeden && secilenRenk) {
      sepeteEkle(urun, secilenBeden, secilenRenk);
      Alert.alert('Başarılı', 'Ürün sepete eklendi!');
    }
  };

  if (!urun) {
    return (
      <View style={styles.loading}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: urun.resimler[0] }} style={styles.resim} />
      
      <View style={styles.bilgiContainer}>
        <Text style={styles.marka}>{urun.marka}</Text>
        <Text style={styles.ad}>{urun.ad}</Text>
        <Text style={styles.aciklama}>{urun.aciklama}</Text>
        
        <View style={styles.fiyatContainer}>
          <Text style={styles.fiyat}>{urun.fiyat} ₺</Text>
          {urun.eskiFiyat && (
            <Text style={styles.eskiFiyat}>{urun.eskiFiyat} ₺</Text>
          )}
        </View>

        <View style={styles.secimBolumu}>
          <Text style={styles.label}>Beden:</Text>
          <View style={styles.secenekler}>
            {urun.beden.map(beden => (
              <TouchableOpacity
                key={beden}
                style={[
                  styles.secenekBtn,
                  secilenBeden === beden && styles.secenekBtnAktif
                ]}
                onPress={() => setSecilenBeden(beden)}
              >
                <Text style={[
                  styles.secenekText,
                  secilenBeden === beden && styles.secenekTextAktif
                ]}>
                  {beden}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.secimBolumu}>
          <Text style={styles.label}>Renk:</Text>
          <View style={styles.secenekler}>
            {urun.renk.map(renk => (
              <TouchableOpacity
                key={renk}
                style={[
                  styles.secenekBtn,
                  secilenRenk === renk && styles.secenekBtnAktif
                ]}
                onPress={() => setSecilenRenk(renk)}
              >
                <Text style={[
                  styles.secenekText,
                  secilenRenk === renk && styles.secenekTextAktif
                ]}>
                  {renk}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.sepeteEkleBtn} onPress={handleSepeteEkle}>
          <Text style={styles.sepeteEkleText}>Sepete Ekle</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resim: {
    width: '100%',
    height: 400,
  },
  bilgiContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  marka: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  ad: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  aciklama: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  fiyatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  fiyat: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 15,
  },
  eskiFiyat: {
    fontSize: 20,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  secimBolumu: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  secenekler: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  secenekBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  secenekBtnAktif: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  secenekText: {
    fontSize: 14,
    color: '#333',
  },
  secenekTextAktif: {
    color: 'white',
    fontWeight: '600',
  },
  sepeteEkleBtn: {
    backgroundColor: '#667eea',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  sepeteEkleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
