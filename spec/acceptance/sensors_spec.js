describe('GET /sensors', () => {
  const User = app.datasource.models.User;
  const Sensor = app.datasource

  context('an authenticated user', () => {

    it('returns the sensors', () => {
      let user;
      let sensor;

      return User.create({ email: 'user-sample@sensors.com', password: 'my-secret-password' })
        .then((newRecord) => {
          user = newRecord;
          return;
        })
        .then(() => {
          return Sensor.create({ boardId: 'proto01', userId: user.id });
        })
        .then((newRecord) => {
          sensor = newRecord;
        });
    });

  });
});
