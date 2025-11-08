import { View, StyleSheet, Text } from "react-native";
import { Globe } from "lucide-react-native";


export default function HomeHeader() {

    return (
        <View style={styles.header}>
            <Globe size={28} color='yellow' fill='green'/>
            <View style={styles.column}>
                <Text style={styles.title}>Brasil App</Text>
                <Text style={styles.subtitle}>Explore dados do Brasil</Text>
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create({
    header:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingLeft: 12
    },
    column: {
        flexDirection: 'column',
        alignItems:'flex-start',
        marginLeft:16
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'white'
    },
    subtitle:{
        fontSize:12,
        color:'white'
    }
});

