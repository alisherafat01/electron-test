require('dotenv').config();
module.exports = {
  "development": {
    // "username": process.env.DB_USERNAME,
    // "password": process.env.DB_PASSWORD,
    // "database": process.env.DB_DATABASE,
    // "host": process.env.DB_HOST,
    // "port": process.env.DB_PORT,
    "dialect": "sqlite",
    "storage": './database.sqlite'
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "database": "xxx",
    "dialect": "sqlite",
    "logging": false,
    "storage": './database.sqlite'
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "sqlite",
    "logging": false
  }
};