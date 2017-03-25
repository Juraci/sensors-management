describe('POST /authenticate', () => {
  const User = app.datasource.models.User;
  const Sensor = app.datasource.models.Sensor;

  beforeEach(done => destroyAll(done));

  context('when the user has valid credentials', () => {
    let user;
    let sensor;

    beforeEach(() => User.create({ email: 'user-sample@sensors.com', password: 'my-secret-password' })
      .then((newRecord) => {
        user = newRecord;
      })
      .then(() => Sensor.create({ boardId: 'proto01', userId: user.id }))
      .then((newRecord) => {
        sensor = newRecord;
      }));

    it('returns the json web token', (done) => {
      const credentials = { email: 'user-sample@sensors.com', password: 'my-secret-password' };
      request
        .post('/authenticate')
        .send(credentials)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.equal(true);
          expect(res.body.message).to.not.be.equal(undefined);
          done(err);
        });
    });
  });
});
