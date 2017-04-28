import jwt from 'jsonwebtoken';
import UsersController from '../../../app/controllers/users';

describe('UsersController', () => {
  beforeEach(() => setup());

  describe('#authenticate', () => {
    const email = 'user-sample@sensors.com';
    const password = 'my-secret-password';
    let user;

    beforeEach(() => User.create({ email, password })
        .then((record) => {
          user = record;
        }));

    context('when the user sends valid credentials', () => {
      it('returns the JWT', () => {
        const usersController = new UsersController(app);
        return usersController.authenticate({ email, password })
          .then((result) => {
            expect(result.status).to.be.equal(200);
            expect(result.data.success).to.be.equal(true);
            expect(result.data.message).to.be.equal('enjoy your token');
            const decoded = jwt.verify(result.data.token, config.jwt.secret);
            expect(decoded.id).to.be.equal(user.id);
            expect(decoded.email).to.be.equal(user.email);
          });
      });
    });

    context('when the user sends the wrong password', () => {
      it('returns Authentication failed message', () => {
        const usersController = new UsersController(app);
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
        const usersController = new UsersController(app);
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
