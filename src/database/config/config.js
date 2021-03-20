"use strict";
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    development: {
        dialect: 'mysql',
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    test: {
        dialect: 'mysql',
        database: process.env.TEST_DB_NAME,
        host: process.env.TEST_DB_HOST,
        username: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PASSWORD,
    },
    production: {
        dialect: 'mysql',
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOST,
        username: process.env.PROD_DB_USER,
        password: process.env.PROD_DB_PASSWORD,
    },
};
