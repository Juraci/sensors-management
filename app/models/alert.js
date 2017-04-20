const alert = (sequelize, DataTypes) => {
  const Alert = sequelize.define('Alert', {
    message: DataTypes.STRING,
    seen: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate(models) {
        Alert.belongsTo(models.Sensor);
      },
    },
  });
  return Alert;
};

module.exports = alert;
