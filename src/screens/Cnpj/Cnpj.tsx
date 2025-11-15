import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Hotel } from "lucide-react-native";
import { Cnpj } from "./model";
import { fetchGetCnpj } from "../../api/requests";
import { insertCnpj } from "../../database";






type CnpjScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Cnpj'
>;

type Props = {
    navigation: CnpjScreenNavigationProp;
};

export default function CnpjScreen({ navigation }: Props) {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [result, setResult] = useState<Cnpj | null>(null);

    const CnpjLabels: Record<string, string> = {
    cnpj: 'CNPJ',
    razao_social: 'Razão Social',
    nome_fantasia: 'Nome Fantasia',
    municipio: 'Município',
    uf: 'UF',
    cep: 'CEP',
    bairro: 'Bairro',
    logradouro: 'Logradouro',
    numero: 'Número',
    data_inicio_atividade: 'Início Atividade',
    capital_social: 'Capital Social',
};

    const fetchCnpj = async (cnpj: string) => {
        try {
            setShow(false);
            console.log('Buscando daods');
            setLoading(true);
            const response = await fetchGetCnpj(cnpj);
            if (response) {
                console.log(response);
                insertCnpj(response);
                setResult(response);
                setShow(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {loading ? (<ActivityIndicator size='large' />)
                : (
                    <View style={[styles.card]}>
                        <Text style={{
                            fontSize: 20
                        }}>Digite o Cnpj</Text>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setValue}
                                value={value}
                                placeholder="00000000000000"
                                keyboardType="numeric"
                                maxLength={14}
                            />
                            <Button
                                title="Buscar"
                                color='blue'
                                onPress={() => fetchCnpj(value)}
                            />
                        </View>
                    </View>

                )
            }
            {(show && !loading && result) ? (
                <View style={[styles.card, { marginBottom: 60 }]}>
                    <View style={styles.row}>
                        <Hotel size={24} color='blue' style={{
                            marginRight:8
                        }} />
                        <Text>Informações da Empresa</Text>
                    </View>
                    <View style={styles.dataWrap}>
                        {Object.entries(result).map(([key,value]) => {
                            const date = result['data_inicio_atividade'].split('-'); 
                            return  (
                                <View style={styles.result} key={key}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 12,
                                        color: '#666',
                                    }}>{CnpjLabels[key]}</Text>
                                    <Text style={{
                                        fontSize: 15,
                                        color: '#333',
                                    }}>{key !== 'data_inicio_atividade' ? value : `${date[2]}/${date[1]}/${date[0]}`}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            )
                : null}
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderRadius: 16,
        flexDirection: 'column',
        paddingHorizontal: 24,
        paddingVertical: 16,
        alignItems: 'flex-start',
        width: '100%',
        minHeight: 150,
        margin: 12
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12
    },
    input: {
        flex: 1,
        height: 40,
        marginRight: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 16,
    },
    dataWrap: {
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    result: {
        width: '48%',
        marginBottom: 8,
        padding: 5,
    }

})