const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Sensor, { as: 'sensors' });
      },
    },
    instanceMethods: {
      isValidPassword(password) {
        return this.password === password;
      },
    },
  });
  return User;
};

module.exports = user;
