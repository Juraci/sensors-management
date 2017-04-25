import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import setupAuth from './middlewares/auth';
import authentication from './routes/authentication';
import sensors from './routes/sensors';
import alerts from './routes/alerts';

const app = express();
const jsonParser = bodyParser.json();

app.use(cors(config.corsOptions));
app.use(morgan('tiny'));
app.set('config', config);
app.set('datasource', datasource(app));
const auth = setupAuth(app);

app.use('/authenticate', authentication({ app, jsonParser }));
app.use('/sensors', sensors({ app, auth, jsonParser }));
app.use('/alerts', alerts({ app, auth }));

export default app;
