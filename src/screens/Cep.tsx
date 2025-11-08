import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ActivityIndicator, ToastAndroid, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { MapPin } from "lucide-react-native";

type CepScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Cep'
>;

type Props = {
    navigation: CepScreenNavigationProp;
};

export interface Cep {
    cep: string,
    estado: string,
    cidade: string,
    bairro: string,
    logradouro: string,
}


export default function CepScreen({ navigation }: Props) {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [result, setResult] = useState({
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        logradouro: ''
    });

    const fetchCep = async (cep: string) => {
        try {
            setShow(false);
            console.log('Buscando daods');
            setLoading(true);
            const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
            if(response.ok){
                const data = await response.json();
            console.log(data)
            setResult({
                cep: data.cep,
                estado: data.state,
                cidade: data.city,
                bairro: data.neighborhood,
                logradouro: data.street
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
        <View style={styles.container}>
            {loading ? (<ActivityIndicator size='large' />)
                : (
                    <View style={[styles.card]}>
                        <Text style={{
                            fontSize: 20
                        }}>Digite o Cep</Text>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setValue}
                                value={value}
                                placeholder="00000000"
                                keyboardType="numeric"
                                maxLength={8}
                            />
                            <Button
                                title="Buscar"
                                color='green'
                                onPress={() => fetchCep(value)}
                            />
                        </View>
                    </View>

                )
            }
            {(show && !loading) ? (
                <View style={styles.card}>
                    <View style={styles.row}>
                        <MapPin size={24} color='green' />
                        <Text>Informações do Endereço</Text>
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
                                }}>{value.length>0 ? (value) : 'Não informado'}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
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