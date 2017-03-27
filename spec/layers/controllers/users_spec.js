import UsersController from '../../../app/controllers/users';

describe('UsersController', () => {
  let datasource;

  beforeEach(() => setupDatasource()
      .then((ds) => {
        datasource = ds;
      })
      .then(() => destroyAll(datasource)));

  describe('#authenticate', () => {
    context('valid credentials', () => {
      const email = 'user-sample@sensors.com';
      const password = 'my-secret-password';

      beforeEach(() => datasource.models.User.create({ email, password }));

      it('should authenticate user with valid credentials', () => {
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
  });
});
