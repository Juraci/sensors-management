import chai from 'chai';
import config from '../../app/config/config';
import datasource from '../../app/config/datasource';

global.expect = chai.expect;

global.config = config;

global.app = {
  get: property => app[property],
};

global.setup = () => {
  app.config = config;
  const ds = datasource(app);
  return ds.sequelize.sync()
    .then(() => {
      app.datasource = ds;
      return ds;
    })
    .then((db) => {
      global.User = db.models.User;
      global.Sensor = db.models.Sensor;
      global.Alert = db.models.Alert;
    })
    .then(() => Alert.destroy({ where: {} }))
    .then(() => Sensor.destroy({ where: {} }))
    .then(() => User.destroy({ where: {} }));
};
