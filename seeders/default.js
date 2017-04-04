const app = require('../build/app').default;

const User = app.get('datasource').models.User;
const Sensor = app.get('datasource').models.Sensor;

app.get('datasource').sequelize.sync().then(() => {
  Sensor.destroy({ where: {} })
    .then(() => User.destroy({ where: {} }))
    .then(() => User.create({ email: 'sample@example.com', password: 'pass123' }))
    .then(user1 => Sensor.create({ UserId: user1.id, description: 'Living room sensor', boardId: '09273ABC' }))
    .catch(err => console.log('default seed script error\n:', err));
});
