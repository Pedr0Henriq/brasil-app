import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {StyleSheet ,View, Text, ScrollView } from 'react-native';
import { RootStackParamList } from "../types/navigation";
import CardFunc from "../components/CardFunc";
import { useNavigation } from "@react-navigation/native";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const serviceNames: string[] = ['Cep', 'Cnpj', 'Feriados'];

export default function HomeScreen({ navigation }:Props) {

    return (
        <ScrollView contentContainerStyle={styles.container}>
            
            <Text style={styles.headerTitle}>Consultas Disponíveis</Text>

                <View style={styles.cardList}>
                {serviceNames.map((name) => (
                    <CardFunc key={name} name={name} navigation={navigation} /> 
                ))}
            </View>
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