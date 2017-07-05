const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Sensor, { as: 'sensors' });
  };

  User.prototype.isValidPassword = function (password) {
    return this.password === password;
  };

  return User;
};

module.exports = user;
