import {View,StyleSheet, Text, TouchableOpacity} from 'react-native';
import { MapPin, Calendar, Hotel, Info } from 'lucide-react-native';

interface CardData {
    color: string;
    IconComponent: React.ElementType; 
    label: string;
    title: string;
    subtitle: string;
}

const cardDataMap: { [key: string]: CardData } = {
    'Cep': {
        color: 'green',
        IconComponent: MapPin,
        label: 'CEP',
        title: 'Consultar CEP',
        subtitle: 'Encontre endereços',
    },
    'Cnpj': {
        color: 'blue',
        IconComponent: Hotel,
        label: 'CNPJ',
        title: 'Consultar CNPJ',
        subtitle: 'Dados da empresa',
    },
    'Feriados': {
        color: 'grey',
        IconComponent: Calendar,
        label: 'Feriados',
        title: 'Feriados',
        subtitle: 'Datas nacionais',
    },
};

const defaultCardData: CardData = {
    color: 'yellow',
    IconComponent: Info,
    label: 'Geral',
    title: 'Serviço Desconhecido',
    subtitle: 'Nenhum serviço correspondente encontrado.',
};

export default function CardFunc({name, navigation}:{name:string, navigation: any}){
   const data = cardDataMap[name] || defaultCardData;
    const {color, IconComponent, label, title, subtitle} = data
    return (
        <TouchableOpacity onPress={()=> navigation.navigate(name)}>
                <View style={[style.card, {backgroundColor: color}]}>
            <View style={style.header}>
                <IconComponent size={24} color='#ffff00ff' style = {style.icon}/>
                <View style={style.container}>
                    <Text style={style.label}>{label}</Text>
                </View>
            </View>
            <Text style={style.title}>{title}</Text>
            <Text style={style.subtitle}>{subtitle}</Text>
        </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    card: {
        padding: 10,
        margin: 10,
        minWidth: 150,
        borderRadius: 10,
        elevation:3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width:0, height:2}
    },
    header: {
        flexDirection: 'row',
        paddingRight:10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom:10,
    },
    icon: {
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
    },
    container:{
        backgroundColor:'#9997978d',
        borderRadius: 16,
        padding:8,
    },
    label:{
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    }
})