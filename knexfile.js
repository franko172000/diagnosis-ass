require('dotenv').config();

const environment = process.env;
// Update with your config settings.

module.exports = {
  development: {
    client: environment.DATABASE_CLIENT,
    connection: {
      database: environment.DB_SCHEMA,
      user: environment.DB_USER,
      password: environment.DB_PASS,
      host: environment.DB_HOST,
      port: environment.DB_PORT,
    },
  },
  staging: {
    client: 'pg',
    connection: {
      database: environment.DB_SCHEMA,
      user: environment.DB_USER,
      password: environment.DB_PASS,
      host: environment.DB_HOST,
      port: environment.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      database: environment.DB_SCHEMA,
      user: environment.DB_USER,
      password: environment.DB_PASS,
      host: environment.DB_HOST,
      port: environment.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
