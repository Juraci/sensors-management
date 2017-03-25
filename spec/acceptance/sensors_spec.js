describe('GET /sensors', () => {
  const User = app.datasource.models.User;
  const Sensor = app.datasource.models.Sensor;

  beforeEach(done => destroyAll(done));

  context('an authenticated user', () => {
    let user;
    let sensor;

    beforeEach(() => {
      return User.create({ email: 'user-sample@sensors.com', password: 'my-secret-password' })
        .then((newRecord) => user = newRecord)
        .then(() => Sensor.create({ boardId: 'proto01', userId: user.id }))
        .then((newRecord) => sensor = newRecord);
    });

    it('returns the sensors', () => {

    });
  });
});
