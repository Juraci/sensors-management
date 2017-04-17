import jwt from 'jsonwebtoken';

describe('sensors', () => {
  const User = app.get('datasource').models.User;
  const Sensor = app.get('datasource').models.Sensor;
  const email = 'user-sample@sensors.com';
  const password = 'my-secret-password';

  beforeEach(done => destroyAll(done));

  describe('GET /sensors', () => {
    context('for an authenticated request', () => {
      let user;
      let sensor;
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

      it('returns the sensors', (done) => {
        request
          .get('/sensors')
          .set('x-access-token', token)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data).to.have.length(1);
            const record = res.body.data[0];
            expect(record.type).to.equal('sensors');
            expect(record.attributes).to.have.all.keys('description', 'board-id');
            expect(record.attributes['board-id']).to.be.equal(sensor.boardId);
            done(err);
          });
      });
    });

    context('for an unauthenticated request', () => {
      beforeEach(() => User.create({ email, password })
        .then(user => Sensor.create({
          UserId: user.id,
          boardId: 'my-board-id',
          description: 'motion sensor in the living room',
        })),
      );

      it('returns 401 unauthorized', (done) => {
        request
          .get('/sensors')
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });
    });

    context('for a request with a fake token', () => {
      let fakeToken;
      let user;

      beforeEach(() => User.create({ email, password })
        .then((record) => {
          user = record;
        })
        .then(() => Sensor.create({
          UserId: user.id,
          boardId: 'my-board-id',
          description: 'motion sensor in the living room',
        }))
        .then(() => {
          fakeToken = jwt.sign({
            id: user.id,
            email: user.email,
          }, 'wrongSecret', { expiresIn: '24h' });
        }),
      );

      it('returns unauthorized', (done) => {
        request
          .get('/sensors')
          .set('x-access-token', fakeToken)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });
    });
  });

  describe('POST /sensors', () => {
    let token;

    beforeEach((done) => {
      User.create({ email, password })
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

    it('creates the sensor', (done) => {
      const sensor = {
        data: {
          attributes: {
            description: 'Garage sensor',
            'board-id': '1231l23k12lkKÇLJKÇLSK230oKOKS93jnnJH',
          },
          type: 'sensors',
        },
      };

      request
        .post('/sensors')
        .set('x-access-token', token)
        .send(sensor)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          const record = res.body.data;
          expect(record.type).to.equal('sensors');
          expect(record.attributes).to.have.all.keys('description', 'board-id');
          done(err);
        });
    });
  });

  describe('DELETE /sensors/:id', () => {
    let user;
    let sensor;
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

    it('deletes the sensor', (done) => {
      request
        .del(`/sensors/${sensor.id}`)
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done(err);
        });
    });
  });
});
