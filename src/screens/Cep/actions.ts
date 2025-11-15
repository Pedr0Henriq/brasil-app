import { Cep } from "./model";
import {insertCep, deleteCepByCep, getAllCeps, getCepByCep} from "../../database/index"

export async function addCep(value:Cep): Promise<number> {
    return insertCep(value);
}

export async function removeCep(cep:string): Promise<number> {
    return deleteCepByCep(cep);
}

export async function getCep(cep:string): Promise<Cep | undefined> {
    return getCepByCep(cep);
}

export async function getCeps(): Promise<Cep[]> {
    return getAllCeps();
}