describe('sensors', () => {
  const User = app.get('datasource').models.User;
  const Sensor = app.get('datasource').models.Sensor;
  const Alert = app.get('datasource').models.Alert;
  const email = 'user-sample@sensors.com';
  const password = 'my-secret-password';

  beforeEach(done => destroyAll(done));

  describe('DELETE /alerts/:id', () => {
    let user;
    let sensor;
    let alert;
    let token;

    beforeEach((done) => {
      User.create({ email, password })
        .then((record) => {
          user = record;
        })
        .then(() => Sensor.create({
          UserId: user.id,
          boardId: 'my-board-id',
          description: 'motion sensor in the living room',
        }))
        .then((sensorRecord) => {
          sensor = sensorRecord;
        })
        .then(() => Alert.create({
          SensorId: sensor.id,
          message: 'Motion detected',
          seen: false,
        }))
        .then((newAlert) => {
          alert = newAlert;
        })
        .then(() => {
          const credentials = { email, password };
          request
            .post('/authenticate')
            .send(credentials)
            .end((err, res) => {
              token = res.body.token;
              done();
            });
        });
    });

    it('deletes the alert', (done) => {
      request
        .del(`/alerts/${alert.id}`)
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done(err);
        });
    });
  });
});
