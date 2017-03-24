import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';

const app = express();
// const jsonParser = bodyParser.json();

app.use(cors(config.corsOptions));
app.use(morgan('tiny'));
app.config = config;
app.datasource = datasource(app);

export default app;
