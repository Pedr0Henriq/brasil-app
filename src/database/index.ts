import * as SQLite from 'expo-sqlite';
import { Cep } from '../screens/Cep/model';
import { Cnpj } from '../screens/Cnpj/model';


let db: any = null;

export async function createDatabase() {
    try {
        db = await SQLite.openDatabaseAsync('brasilapp.db');
        await db.execAsync(`
        PRAGMA journal_mode = WAL;

            CREATE TABLE IF NOT EXISTS Ceps (
                cep TEXT PRIMARY KEY NOT NULL,
                state TEXT NOT NULL,
                city TEXT NOT NULL,
                neighborhood TEXT,
                street TEXT,
                createdAt TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Cnpjs (
                cnpj TEXT PRIMARY KEY NOT NULL,
                razao_social TEXT NOT NULL,
                nome_fantasia TEXT,
                municipio TEXT NOT NULL,
                uf TEXT NOT NULL,
                cep TEXT,
                bairro TEXT,
                logradouro TEXT,
                numero TEXT,
                data_inicio_atividade TEXT,
                capital_social REAL,
                createdAt TEXT NOT NULL
            );
        `);
        console.log('Banco de dados e tabelas criados com sucesso.');
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);

    }
}

export async function insertCep(cepData: Cep): Promise<number> {
    const now = new Date().toISOString();
    try {
        const result = await db.runAsync(
            `INSERT OR REPLACE INTO Ceps (cep, state, city, neighborhood, street, createdAt)
             VALUES (?, ?, ?, ?, ?, ?)`,
            cepData.cep,
            cepData.state,
            cepData.city,
            cepData.neighborhood,
            cepData.street,
            now
        );
        console.log(`CEP ${cepData.cep} inserido/atualizado.`);
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao inserir CEP:', error);
        throw error;
    }
}

export async function getCepByCep(cep: string): Promise<Cep | undefined> {
    try {
        const row = await db.getFirstAsync('SELECT * FROM Ceps WHERE cep = ?', cep);
        return row as Cep;
    } catch (error) {
        console.error(`Erro ao buscar CEP ${cep}:`, error);
        throw error;
    }
}

export async function getAllCeps(): Promise<Cep[]> {
    try {
        const rows = await db.getAllAsync('SELECT * FROM Ceps ORDER BY createdAt DESC');
        return rows as Cep[];
    } catch (error) {
        console.error('Erro ao buscar todos os CEPs:', error);
        throw error;
    }
}

export async function deleteCepByCep(cep: string): Promise<number> {
    try {
        const result = await db.runAsync('DELETE FROM Ceps WHERE cep = ?', cep);
        console.log(`CEP ${cep} removido. Linhas afetadas: ${result.changes}`);
        return result.changes;
    } catch (error) {
        console.error(`Erro ao deletar CEP ${cep}:`, error);
        throw error;
    }
}

export async function insertCnpj(cnpjData: Cnpj): Promise<number> {
    const now = new Date().toISOString();
    try {
        const result = await db.runAsync(
            `INSERT OR REPLACE INTO Cnpjs (cnpj, razao_social, nome_fantasia, municipio, uf, cep, bairro, logradouro, numero, data_inicio_atividade, capital_social, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            cnpjData.cnpj,
            cnpjData.razao_social,
            cnpjData.nome_fantasia,
            cnpjData.municipio,
            cnpjData.uf,
            cnpjData.cep,
            cnpjData.bairro,
            cnpjData.logradouro,
            cnpjData.numero,
            cnpjData.data_inicio_atividade,
            cnpjData.capital_social,
            now
        );
        console.log(`CNPJ ${cnpjData.cnpj} inserido/atualizado.`);
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao inserir CNPJ:', error);
        throw error;
    }
}

export async function getCnpjByCnpj(cnpj: string): Promise<Cnpj | undefined> {
    try {
        const row = await db.getFirstAsync('SELECT * FROM Cnpjs WHERE cnpj = ?', cnpj);
        return row as Cnpj;
    } catch (error) {
        console.error(`Erro ao buscar CNPJ ${cnpj}:`, error);
        throw error;
    }
}

export async function getAllCnpjs(): Promise<Cnpj[]> {
    try {
        const rows = await db.getAllAsync('SELECT * FROM Cnpjs ORDER BY createdAt DESC');
        return rows as Cnpj[];
    } catch (error) {
        console.error('Erro ao buscar todos os CNPJs:', error);
        throw error;
    }
}

export async function deleteCnpjByCnpj(cnpj: string): Promise<number> {
    try {
        const result = await db.runAsync('DELETE FROM Cnpjs WHERE cnpj = ?', cnpj);
        console.log(`CNPJ ${cnpj} removido. Linhas afetadas: ${result.changes}`);
        return result.changes;
    } catch (error) {
        console.error(`Erro ao deletar CNPJ ${cnpj}:`, error);
        throw error;
    }
}