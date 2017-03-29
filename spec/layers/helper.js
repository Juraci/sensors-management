import chai from 'chai';
import config from '../../app/config/config';
import datasource from '../../app/config/datasource';

global.expect = chai.expect;

global.config = config;

global.app = {
  get: property => app[property],
};

global.setupDatasource = () => {
  app.config = config;
  const ds = datasource(app);
  return ds.sequelize.sync()
      .then(() => {
        app.datasource = ds;
        return ds;
      });
};

global.destroyAll = (ds) => {
  const User = ds.models.User;
  const Sensor = ds.models.Sensor;

  return ds.sequelize.sync()
    .then(() => Sensor.destroy({ where: {} }))
    .then(() => User.destroy({ where: {} }));
};
