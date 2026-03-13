import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

export default function AnaSayfa({ navigation, sepetAdet }) {
  const [urunler, setUrunler] = useState([]);
  const [kategoriler, setKategoriler] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/urunler')
      .then(res => res.json())
      .then(data => setUrunler(data))
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/kategoriler')
      .then(res => res.json())
      .then(data => setKategoriler(data))
      .catch(err => console.error(err));
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          style={styles.sepetBtn}
          onPress={() => navigation.navigate('Sepet')}
        >
          <Text style={styles.sepetIcon}>🛍️</Text>
          {sepetAdet > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{sepetAdet}</Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, sepetAdet]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Yeni Sezon Koleksiyonu</Text>
        <Text style={styles.heroSubtitle}>En şık kıyafetler şimdi indirimde!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kategoriler</Text>
        <FlatList
          horizontal
          data={kategoriler}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.kategoriCard}>
              <Image source={{ uri: item.resim }} style={styles.kategoriResim} />
              <Text style={styles.kategoriAd}>{item.ad}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Öne Çıkan Ürünler</Text>
        <FlatList
          data={urunler}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.urunCard}
              onPress={() => navigation.navigate('UrunDetay', { urunId: item.id })}
            >
              <Image source={{ uri: item.resimler[0] }} style={styles.urunResim} />
              {item.eskiFiyat && (
                <View style={styles.indirimBadge}>
                  <Text style={styles.indirimText}>İndirim</Text>
                </View>
              )}
              <View style={styles.urunBilgi}>
                <Text style={styles.marka}>{item.marka}</Text>
                <Text style={styles.urunAd} numberOfLines={2}>{item.ad}</Text>
                <View style={styles.fiyatContainer}>
                  <Text style={styles.fiyat}>{item.fiyat} ₺</Text>
                  {item.eskiFiyat && (
                    <Text style={styles.eskiFiyat}>{item.eskiFiyat} ₺</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  hero: {
    backgroundColor: '#667eea',
    padding: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  kategoriCard: {
    marginRight: 15,
    width: 150,
  },
  kategoriResim: {
    width: 150,
    height: 100,
    borderRadius: 12,
  },
  kategoriAd: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  urunCard: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  urunResim: {
    width: '100%',
    height: 200,
  },
  indirimBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  indirimText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  urunBilgi: {
    padding: 12,
  },
  marka: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  urunAd: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  fiyatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fiyat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  eskiFiyat: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  sepetBtn: {
    marginRight: 15,
    position: 'relative',
  },
  sepetIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
