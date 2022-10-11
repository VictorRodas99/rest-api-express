import { createPool } from 'mysql2/promise';

//equivalente a createConnection

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'vikmysql',
    database: 'companydb'
})