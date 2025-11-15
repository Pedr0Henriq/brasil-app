import { View, Text, StyleSheet } from 'react-native';
import { ChartNoAxesCombined } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CountCard({ cep, cnpj }: { cep: number, cnpj: number }) {

    return (
        <LinearGradient
            colors={['#144714ff', '#56c019ff']}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <View style={styles.row}>
                <Text style={{
                    fontSize: 20,
                    color:'white'
                }}>Estatísticas de Uso</Text>
                <ChartNoAxesCombined size={24} color={'yellow'} />
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.value}>{cep.toString()}</Text>
                    <Text style={styles.label}>Consultas Cep</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.value}>{cnpj.toString()}</Text>
                    <Text style={styles.label}>Consultas Cnpj</Text>
                </View>
            </View>
        </LinearGradient>
    );

}

const styles = StyleSheet.create({
    card: {
        minHeight: 150,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        margin: 16
    },
    row: {
        flex:1,
        width:'100%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        marginTop: 12
    },
    value:{
        color:'yellow',
        fontSize: 24,
        fontWeight:'bold'
    },
    label:{
        color:'white',
        fontSize: 10
    }
});