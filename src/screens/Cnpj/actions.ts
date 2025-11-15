import { Cnpj } from "./model";
import {insertCnpj, deleteCnpjByCnpj, getAllCnpjs, getCnpjByCnpj} from "../../database/index"

export async function addCnpj(value:Cnpj): Promise<number> {
    return insertCnpj(value);
}

export async function removeCnpj(cnpj:string): Promise<number> {
    return deleteCnpjByCnpj(cnpj);
}

export async function getCnpj(cnpj:string): Promise<Cnpj | undefined> {
    return getCnpjByCnpj(cnpj);
}

export async function getCnpjs(): Promise<Cnpj[]> {
    return getAllCnpjs();
}