import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useState } from "react";
import {View, Text, TextInput, Button, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import { Hotel } from "lucide-react-native";






type CnpjScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Cnpj'
>;

type Props = {
    navigation: CnpjScreenNavigationProp;
};

export interface Cnpj {
    cnpj: string;
    razao_social: string;
    nome_fantasia: string;
    cnae_fiscal_descricao: string;
    municipio: string;
    uf: string;
    cep: string;
    bairro: string;
    logradouro: string;
    numero: string;
    ddd_telefone_1: string;
    data_inicio_atividade: string;
    capital_social: number;
}

export default function CnpjScreen({ navigation }: Props) {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [result, setResult] = useState({
        cnpj: '',
        razao_social: '',
        nome_fantasia: '',
        cnae_fiscal_descricao: '',
        municipio: '',
        uf: '',
        cep: '',
        bairro: '',
        logradouro: '',
        numero: '',
        ddd_telefone_1: '',
        data_inicio_atividade: '',
        capital_social: 1
    });

    const fetchCnpj = async (cnpj: string) => {
        try {
            setShow(false);
            console.log('Buscando daods');
            setLoading(true);
            const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setResult({
                    cnpj: data.cnpj,
                    razao_social: data.razao_social,
                    nome_fantasia: data.nome_fantasia,
                    cnae_fiscal_descricao: data.cnae_fiscal_descricao,
                    municipio: data.municipio,
                    uf: data.uf,
                    cep: data.cep,
                    bairro: data.bairro,
                    logradouro: data.logradouro,
                    numero: data.numero,
                    ddd_telefone_1: data.ddd_telefone_1,
                    data_inicio_atividade: data.data_inicio_atividade,
                    capital_social: data.capital_social
                });
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
            flexDirection:'column',
            alignItems:'center'
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
            {(show && !loading) ? (
                <View style={[styles.card, {marginBottom:60}]}>
                    <View style={styles.row}>
                        <Hotel size={24} color='blue' />
                        <Text>Informações da Empresa</Text>
                    </View>
                    <View style={styles.dataWrap}>
                        {Object.entries(result).map(([key, value]) => (
                            <View style={styles.result}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                    color: '#666',
                                }} key={key}>{key.toUpperCase()}</Text>
                                <Text style={{
                                    fontSize: 15,
                                    color: '#333',
                                }}>{value}</Text>
                            </View>
                        ))}
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