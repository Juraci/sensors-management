describe('POST /authenticate', () => {
  const User = app.datasource.models.User;
  const email = 'user-sample@sensors.com';
  const password = 'my-secret-password';

  beforeEach(done => destroyAll(done));

  context('when the user sends valid credentials', () => {
    beforeEach(() => User.create({ email, password }));

    it('returns the json web token', (done) => {
      const credentials = { email, password };
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
});
