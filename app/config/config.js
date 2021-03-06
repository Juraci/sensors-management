export default {
  database: process.env.DB_NAME || 'sensors_management',
  username: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  params: {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    dialectOptions: {
      ssl: !(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'),
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: process.env.NODE_ENV !== 'production' ? console.log : false,
  },
  corsOptions: {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  },
  jwt: {
    secret: process.env.SECRET || 'mysecret',
    expiresIn: '24h',
  },
  sse: process.env.NODE_ENV === 'test' ? 'http://localhost:3000' : process.env.SSE,
};
