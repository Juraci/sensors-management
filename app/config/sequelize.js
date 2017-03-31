module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'sensors_management',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'sensors_management',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: 'true',
    },
  },
};
