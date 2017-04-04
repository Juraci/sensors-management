
module.exports = function (sequelize, DataTypes) {
  const Sensor = sequelize.define('Sensor', {
    boardId: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        Sensor.belongsTo(models.User);
      },
    },
  });
  return Sensor;
};
