const sensor = (sequelize, DataTypes) => {
  const Sensor = sequelize.define('Sensor', {
    boardId: DataTypes.STRING,
    description: DataTypes.STRING,
  });

  Sensor.associate = (models) => {
    Sensor.belongsTo(models.User);
    Sensor.hasMany(models.Alert, { as: 'alerts' });
  };

  return Sensor;
};

module.exports = sensor;
