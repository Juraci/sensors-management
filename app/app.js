import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import authentication from './routes/authentication';

const app = express();
const jsonParser = bodyParser.json();

app.use(cors(config.corsOptions));
app.use(morgan('tiny'));
app.set('config', config);
app.set('datasource', datasource(app));

app.use('/authenticate', authentication({ app, jsonParser }));

export default app;
