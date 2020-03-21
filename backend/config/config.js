require('dotenv').config();
const dbHost = process.env.SHOOOTSTA_DB_HOST;
const dbName = process.env.SHOOOTSTA_DB_NAME;
const dbUsername = process.env.SHOOOTSTA_DB_USERNAME;
const dbPassword = process.env.SHOOOTSTA_DB_PASSWORD;
const dbPort = process.env.SHOOOTSTA_DB_PORT || 5432;
module.exports = {
  development: {
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: 'postgres'
  },
  test: {
    username: dbUsername,
    password: dbPassword,
    database: 'shootsta_test',
    host: dbHost,
    port: dbPort,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: 'postgres'
  }
};