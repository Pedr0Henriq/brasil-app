import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from '../screens/Home';
import CepScreen from '../screens/Cep';
import CnpjScreen from '../screens/Cnpj';
import FeriadosScreen from '../screens/Feriados';
import HomeHeader from '../components/HomeHeader';

const {Screen, Navigator} = createNativeStackNavigator();



export function StackRoutes(){
    return(
        <Navigator screenOptions={{
        headerTintColor: '#fff',
      }}>
        <Screen name='Home' component={HomeScreen} options={{
          headerBackground: () => (
            <LinearGradient
              colors={['#144714ff', '#56c019ff']}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} />
          ),
          headerTitle:() => <HomeHeader/>,

        }} />
        <Screen name='Cep' component={CepScreen} options={{
          headerBackground: () => (
            <LinearGradient
              colors={['#144714ff', '#56c019ff']}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} />
          ),
          title: 'Buscar Cep'
        }} />
        <Screen name='Cnpj' component={CnpjScreen} options={{
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
        <Screen name='Feriados' component={FeriadosScreen} options={{
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
      </Navigator>
    );
}