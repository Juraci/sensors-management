import request from 'supertest';
import chai from 'chai';
import app from '../../app/app';

global.app = app;
global.request = request(app);
global.expect = chai.expect;

global.destroyAll = (done) => {
  const User = app.datasource.models.User;
  const Sensor = app.datasource.models.Sensor;

  app.datasource.sequelize.sync().then(() => {
    Sensor
      .destroy({ where: {} })
      .then(() => User.destroy({ where: {} }))
      .then(() => done());
  });
};
