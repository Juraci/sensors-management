const app = require('../build/app').default;

const User = app.get('datasource').models.User;
const Sensor = app.get('datasource').models.Sensor;
const Alert = app.get('datasource').models.Alert;

app.get('datasource').sequelize.sync().then(() => {
  Sensor.destroy({ where: {} })
    .then(() => User.destroy({ where: {} }))
    .then(() => User.create({ email: 'sample@example.com', password: 'pass123' }))
    .then(user1 => Sensor.create({ UserId: user1.id, description: 'Living room sensor', boardId: '09273ABC' }))
    .then(sensor1 => Alert.create({ SensorId: sensor1.id, message: 'Movement detected', seen: false }))
    .then(() => User.create({ email: 'sample2@example.com', password: 'pass123' }))
    .then(user2 => Sensor.create({ UserId: user2.id, description: 'Bedroom sensor', boardId: '09273ADC' }))
    .catch(err => console.log('default seed script error\n:', err));
});
