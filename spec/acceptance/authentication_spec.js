describe('POST /authenticate', () => {
  const User = app.datasource.models.User;

  beforeEach(done => destroyAll(done));

  context('when the user sends valid credentials', () => {
    let user;

    beforeEach(() => User.create({ email: 'user-sample@sensors.com', password: 'my-secret-password' })
      .then((newRecord) => {
        user = newRecord;
      }));

    it('returns the json web token', (done) => {
      const credentials = { email: 'user-sample@sensors.com', password: 'my-secret-password' };
      request
        .post('/authenticate')
        .send(credentials)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.equal(true);
          expect(res.body.message).to.be.equal('enjoy your token');
          expect(res.body.token).to.be.equal('auth-token');
          done(err);
        });
    });
  });

  context('when the user sends invalid credentials', () => {
    let user;

    beforeEach(() => User.create({ email: 'user-sample@sensors.com', password: 'my-secret-password' })
      .then((newRecord) => {
        user = newRecord;
      }));

    it('returns Authentication failed message', (done) => {
      const credentials = { email: 'user-sample@sensors.com', password: 'my-wrong-password' };
      request
        .post('/authenticate')
        .send(credentials)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.message).to.be.equal('Authentication failed');
          expect(res.body).to.not.have.key('token');
          done(err);
        });
    });
  });
});
