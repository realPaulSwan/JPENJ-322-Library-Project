//THIS FILE MAY BE DEPRECATED, I HONESTLY HAVE NO CLUE

import postgresql from 'pg';
import os from 'os';

const { Pool } = postgresql;

export default (callback = null) => {
    // NOTE: PostgreSQL creates a superuser by default on localhost using the OS username.
    const pool = new Pool({
        user: process.env.NODE_ENV === 'development' && (os.userInfo() || {}).username || 'postgres',
        database: 'libraryapp', //CHANGE TO WHATEVER DATABASE IS BEING USED: LIKELY new_sql_test
        password: 'postgres',   //CHANGE TO YOUR postgres ACCOUNT PASSWORD
        host: '127.0.0.1',
        port: 5432,
    });

    const connection = {
        pool,
        query: (...args) => {
            return pool.connect().then((client) => {
                return client.query(...args).then((res) => {
                    client.release();
                    return res.rows;
                });
            });
        },
    };

    process.postgresql = connection;

    if (callback) {
        callback(connection);
    }

    return connection;
};