import mariadb from 'mariadb';

export const db = mariadb.createPool({
    host: 'mariadb',
    user: 'root',
    password: 'rootpassword',
    database: 'camagru',
    connectionLimit: 5
});