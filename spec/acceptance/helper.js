import request from 'supertest';
import chai from 'chai';
import app from '../../app/app';

global.app = app;
global.request = request(app);
global.expect = chai.expect;

global.destroyAll = (done) => {
  const User = app.get('datasource').models.User;
  const Sensor = app.get('datasource').models.Sensor;

  app.get('datasource').sequelize.sync()
    .then(() => Sensor.destroy({ where: {} }))
    .then(() => User.destroy({ where: {} }))
    .then(() => done());
};
