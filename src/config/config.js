const fs = require('fs');

module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    username: 'ldr',
    password: '1234',
    database: 'book_api_dev',
    define: {
        timestamps: true,
        underscored: true,
    }
  },
  test: {
    dialect: 'postgres',
    host: 'localhost',
    username: 'ldr',
    password: '1234',
    database: 'book_api_test',
    define: {
        timestamps: true,
        underscored: true,
    }
  },
  production: {
    dialect: 'postgres',
    host: 'localhost',
    username: 'ldr',
    password: '1234',
    database: 'book_api_production',
    define: {
        timestamps: true,
        underscored: true,
    },
  }
}