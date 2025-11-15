import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { MapPin } from "lucide-react-native";
import { fetchGetCep } from "../../api/requests";
import { Cep } from "./model";
import { insertCep } from "../../database";

type CepScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Cep'
>;

type Props = {
    navigation: CepScreenNavigationProp;
};


export default function CepScreen({ navigation }: Props) {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [result, setResult] = useState<Cep | null>(null);

    const CepMap:Record<string,string> = {
        'cep':'Cep',
        'state':'Estado',
        'city':'Cidade',
        'neighborhood':'Bairro',
        'street':'Logradouro'
    };

    const fetchCep = async (cep: string) => {
        try {
            setShow(false);
            console.log('Buscando daods');
            setLoading(true);
            const response = await fetchGetCep(cep);
            if(response){
            console.log(response)
            insertCep(response);
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
            {(show && !loading && result) ? (
                <View style={styles.card}>
                    <View style={styles.row}>
                        <MapPin size={24} color='green' style={{
                            marginRight:8
                        }} />
                        <Text>Informações do Endereço</Text>
                    </View>
                    <View style={styles.dataWrap}>
                        {Object.entries(result).map(([key, value]) => (
                            key!=='service' ? 
                            (<View style={styles.result} key={key}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                    color: '#666',
                                }}>{CepMap[key]}</Text>
                                <Text style={{
                                    fontSize: 15,
                                    color: '#333',
                                }}>{value.length>0 ? (value) : 'Não informado'}</Text>
                            </View>) : null
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