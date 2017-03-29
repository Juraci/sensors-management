import chai from 'chai';
import config from '../../app/config/config';
import datasource from '../../app/config/datasource';

global.expect = chai.expect;

global.setupDatasource = () => {
  const ds = datasource({
    get: () => config
  });
  return ds.sequelize.sync()
      .then(() => ds);
};

global.destroyAll = (ds) => {
  const User = ds.models.User;
  const Sensor = ds.models.Sensor;

  return ds.sequelize.sync()
    .then(() => Sensor.destroy({ where: {} }))
    .then(() => User.destroy({ where: {} }));
};
