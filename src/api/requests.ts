import axios from "axios";
import { Cep } from "../screens/Cep/model";
import { BASE_URL } from "../constants";
import { Cnpj } from "../screens/Cnpj/model";
import { Holiday } from "../screens/Holidays/model";



export const fetchGetCep = async (cep: string) => {
    try {
        const url = `${BASE_URL}cep/v1/${cep}`;
        const response = await axios.get<Cep>(url);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Erro ao buscar os dados de cep na api:", error)
    }
}

export const fetchGetCnpj = async (valor: string) => {
    try {
        const url = `${BASE_URL}cnpj/v1/${valor}`;
        const response = await axios.get(url);
        if (response.status === 200) {
            const data = response.data;
            return {
                cnpj: data.cnpj,
                razao_social: data.razao_social,
                nome_fantasia: data.nome_fantasia,
                municipio: data.municipio,
                uf: data.uf,
                cep: data.cep,
                bairro: data.bairro,
                logradouro: data.logradouro,
                numero: data.numero,
                data_inicio_atividade: data.data_inicio_atividade,
                capital_social: data.capital_social
            };
        }
    } catch (error) {
        console.log("Erro ao buscar os dados de cep na api:", error)
    }
}


export const fetchGetHolidays = async (year: string) => {
    try {
        const url = `${BASE_URL}feriados/v1/${year}`;
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Erro ao buscar os dados de cep na api:", error)
    }
}