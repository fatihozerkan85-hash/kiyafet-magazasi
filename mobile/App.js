import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnaSayfa from './src/screens/AnaSayfa';
import UrunDetay from './src/screens/UrunDetay';
import Sepet from './src/screens/Sepet';

const Stack = createStackNavigator();

export default function App() {
  const [sepet, setSepet] = useState([]);

  const sepeteEkle = (urun, beden, renk) => {
    setSepet(prev => {
      const mevcut = prev.find(item => 
        item.urun.id === urun.id && 
        item.secilenBeden === beden && 
        item.secilenRenk === renk
      );
      
      if (mevcut) {
        return prev.map(item =>
          item.urun.id === urun.id && 
          item.secilenBeden === beden && 
          item.secilenRenk === renk
            ? { ...item, adet: item.adet + 1 }
            : item
        );
      }
      
      return [...prev, { urun, adet: 1, secilenBeden: beden, secilenRenk: renk }];
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#667eea' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen 
          name="AnaSayfa" 
          options={{ title: 'Kıyafet Mağazası' }}
        >
          {props => <AnaSayfa {...props} sepetAdet={sepet.length} />}
        </Stack.Screen>
        <Stack.Screen 
          name="UrunDetay" 
          options={{ title: 'Ürün Detayı' }}
        >
          {props => <UrunDetay {...props} sepeteEkle={sepeteEkle} />}
        </Stack.Screen>
        <Stack.Screen 
          name="Sepet" 
          options={{ title: 'Sepetim' }}
        >
          {props => <Sepet {...props} sepet={sepet} setSepet={setSepet} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
