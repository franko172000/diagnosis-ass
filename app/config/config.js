require('dotenv').config();
const redis = require('redis');

const environment = process.env;
const client = redis.createClient({
    host:environment.REDIS_SERVER,
    port: 6379
});
module.exports = {
    redis: client,
    appSecret: environment.API_SECRET_KEY,
    dbConnection: {
        client: environment.DATABASE_CLIENT,
        connection: {
            host: environment.DB_HOST,
            user: environment.DB_USER,
            password: environment.DB_PASS,
            database: environment.DB_SCHEMA,
            port: environment.DB_PORT,
        },
        pool: {min: 0, max: 10},
    },
};
