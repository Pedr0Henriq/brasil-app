import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { FlatList, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import HolidayCard from "../components/HolidayCard";

type FeraidosScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Feriados'
>;

type Props = {
    navigation: FeraidosScreenNavigationProp;
};

export interface Holiday {
    date: string;
    name: string;
    type: string;
}

export default function FeriadosScreen({ navigation }: Props) {
    const [loading, setLoading] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const [list, setList] = useState<Holiday[]>([]);

    const fetchHolidays = async (year: string) => {
        try {
            setLoading(true);
            const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`);
            if (response.ok) {
                const data = await response.json();
                setList(data);
                console.log(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchHolidays(year.toString());
    }, [year]);

    return (
        <View style={styles.container}>
            {loading ? (<ActivityIndicator size='large' />)
                : (
                    <View style={[styles.card]}>
                        <Text style={{
                            fontSize: 20
                        }}>Ano</Text>
                        <View style={styles.navYear}>
                            <TouchableOpacity
                            onPress={() => setYear(prev => prev - 1)}
                            disabled={year===2024}
                            >
                            <ArrowLeft size={24} color={year === 2024 ? '#ccc' : '#333'}/>
                            </TouchableOpacity>
                            <Text style={{
                                fontSize:20,
                                fontWeight:'bold'
                            }}>{year}</Text>
                            <TouchableOpacity 
                            onPress={() => setYear(prev => prev + 1)}
                            disabled={year===2028}>
                            <ArrowRight size={24} color={year === 2028 ? '#ccc' : '#333'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
            {
                (list && list.length !=0 && !loading) ? (
                    <FlatList
                        data={list}
                        renderItem={({item, index}) => (
                            <HolidayCard
                            key={item.name || index}
                            name={item.name}
                            date={item.date}
                            type={item.type}
                            />
                        )}
                        
                        />
                ) : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:24,
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
        alignItems: 'center',
        width: '100%',
        minHeight: 100,
    },
    navYear:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        width: '100%'
    }
});