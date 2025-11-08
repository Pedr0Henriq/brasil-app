import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "lucide-react-native";
import { Holiday } from "../screens/Feriados";

export default function HolidayCard({name, date, type}: Holiday) {

    return (
        <View style={styles.card}>
            <View style={styles.cardIcon}>
                <Calendar size={30}/>
            </View>
            <View style={styles.column}>
                <Text style={styles.texts}>{name}</Text>
                <Text style={styles.texts}>{date}</Text>
                <Text style={styles.label}>
                    {type.replace('t','c').replace('n','N')}
                </Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    card:{
        backgroundColor:'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderRadius: 16,
        flexDirection:'row',
        padding:16,
        alignItems:'center',
        flex:1,
        margin:12
    },
    cardIcon:{
        backgroundColor:'grey',
        color:'white',
        borderRadius:16,
        width: 40,
        height: 40,
        alignItems:'center',
        justifyContent:'center',
        marginRight: 12
    },
    column:{
        flexDirection:'column',
        flex:1,
        alignItems:'flex-start',
        justifyContent:'space-between'
    },
    texts:{
        fontSize: 16,
        color:'#000',
    },
    label:{
        backgroundColor:'#ababab75',
        color:'black',
        paddingHorizontal: 8,
        borderRadius:16
    }
});