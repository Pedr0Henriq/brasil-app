import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { RootStackParamList } from "../../types/navigation";
import CardFunc from "../../components/CardFunc";
import CountCard from "../../components/CountCard";
import { getCeps } from "../Cep/actions";
import { getCnpjs } from "../Cnpj/actions";
import { Cep } from "../Cep/model";
import { Cnpj } from "../Cnpj/model";
import { useIsFocused } from "@react-navigation/native";

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Home'
>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const serviceNames: string[] = ['Cep', 'Cnpj', 'Feriados'];

export default function HomeScreen({ navigation }: Props) {
    const [ceps, setCep] = useState<Cep[]>([]);
    const [cnpjs, setCnpjs] = useState<Cnpj[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) return;
        let mounted = true;
        (async () => {
            const qtdCeps = await getCeps();
            const qtdCnpjs = await getCnpjs();
            if (!mounted) return;
            setCep(qtdCeps);
            setCnpjs(qtdCnpjs);
        })();
        return () => { mounted = false; };
    }, [isFocused]);
    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.headerTitle}>Consultas Disponíveis</Text>

            <View style={styles.cardList}>
                {serviceNames.map((name) => (
                    <CardFunc key={name} name={name} navigation={navigation} />
                ))}
            </View>
            <CountCard cep={ceps.length} cnpj={cnpjs.length} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        color: '#333',
    },
    cardList: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginBottom: 20,
    },
    footerText: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 14,
        color: '#666',
    },
});