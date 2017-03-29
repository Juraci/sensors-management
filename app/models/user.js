
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Sensor, { as: 'sensors' });
      },
    },
  });
  return User;
};
