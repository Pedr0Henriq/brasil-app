import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from './src/screens/Home';
import CepScreen from './src/screens/Cep';
import HomeHeader from './src/components/HomeHeader';
import CnpjScreen from './src/screens/Cnpj';
import FeriadosScreen from './src/screens/Feriados';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTintColor: '#fff',
      }}>
        <Stack.Screen name='Home' component={HomeScreen} options={{
          headerBackground: () => (
            <LinearGradient
              colors={['#144714ff', '#56c019ff']}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} />
          ),
          headerTitle:() => <HomeHeader/>,

        }} />
        <Stack.Screen name='Cep' component={CepScreen} options={{
          headerBackground: () => (
            <LinearGradient
              colors={['#144714ff', '#56c019ff']}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} />
          ),
          title: 'Buscar Cep'
        }} />
        <Stack.Screen name='Cnpj' component={CnpjScreen} options={{
          headerBackground: () => (
            <LinearGradient
              colors={['#01074aff', '#0015f8ff']}
              style={{flex:1}}
              start={{x:0,y:0}}
              end={{x:1,y:0}}
            />
          ),
          title:'Buscar Cnpj'
        }} />
        <Stack.Screen name='Feriados' component={FeriadosScreen} options={{
          headerBackground: () => (
            <LinearGradient
              colors={['#252525ff', '#959595ff']}
              style={{flex:1}}
              start={{x:0,y:0}}
              end={{x:1,y:0}}
            />
          ),
          title:'Feriados Nacionais'
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}