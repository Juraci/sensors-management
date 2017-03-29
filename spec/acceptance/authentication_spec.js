import jwt from 'jsonwebtoken';

describe('POST /authenticate', () => {
  const User = app.get('datasource').models.User;
  const email = 'user-sample@sensors.com';
  const password = 'my-secret-password';

  beforeEach(done => destroyAll(done));

  context('when the user sends valid credentials', () => {
    let user;

    beforeEach(() => User.create({ email, password })
        .then((record) => {
          user = record;
        }));

    it('returns the json web token', (done) => {
      const credentials = { email, password };
      request
        .post('/authenticate')
        .send(credentials)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.equal(true);
          expect(res.body.message).to.be.equal('enjoy your token');
          const decoded = jwt.verify(res.body.token, app.get('config').jwt.secret);
          expect(decoded.id).to.be.equal(user.id);
          expect(decoded.email).to.be.equal(user.email);
          done(err);
        });
    });
  });
});
