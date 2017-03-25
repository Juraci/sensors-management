
module.exports = function (sequelize, DataTypes) {
  const Sensor = sequelize.define('Sensor', {
    boardId: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return Sensor;
};
