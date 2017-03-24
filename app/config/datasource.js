import Sequelize from 'sequelize';

let database = null;

const loadModels = (sequelize, DataType) => {
  const models = [];
  return models;
};

export default (app) => {
  if (!database) {
    const config = app.config;
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params,
    );

    database = {
      sequelize,
      Sequelize,
      models: {},
    };

    database.models = loadModels(sequelize, Sequelize);
    Object.keys(database.models)
      .filter(m => Object.prototype.hasOwnProperty.call(database.models[m], 'associate'))
      .forEach((m) => {
        database.models[m].associate(database.models);
      });
  }

  return database;
};
