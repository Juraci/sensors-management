import UsersController from '../../../app/controllers/users';

describe('UsersController', () => {
  let datasource;

  beforeEach(() => setupDatasource()
    .then((ds) => {
      datasource = ds;
    })
    .then(() => destroyAll(datasource)));

  describe('#authenticate', () => {
    const email = 'user-sample@sensors.com';
    const password = 'my-secret-password';

    beforeEach(() => datasource.models.User.create({ email, password }));

    context('when the user sends valid credentials', () => {
      it('returns the JWT', () => {
        const usersController = new UsersController(datasource.models);
        return usersController.authenticate({ email, password })
          .then((result) => {
            expect(result.status).to.be.equal(200);
            expect(result.data).to.be.deep.equal({
              success: true,
              message: 'enjoy your token',
              token: 'auth-token',
            });
          });
      });
    });

    context('when the user sends the wrong password', () => {
      it('returns Authentication failed message', () => {
        const usersController = new UsersController(datasource.models);
        return usersController.authenticate({ email, password: 'wrong-password' })
          .then((result) => {
            expect(result.status).to.be.equal(200);
            expect(result.data).to.be.deep.equal({
              success: false,
              message: 'Authentication failed',
            });
          });
      });
    });

    context('when the user does not exist', () => {
      it('returns Authentication failed message', () => {
        const usersController = new UsersController(datasource.models);
        return usersController.authenticate({ email: 'wrong-email@test.com', password })
          .then((result) => {
            expect(result.status).to.be.equal(200);
            expect(result.data).to.be.deep.equal({
              success: false,
              message: 'Authentication failed',
            });
          });
      });
    });
  });
});
