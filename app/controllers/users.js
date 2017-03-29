import jwt from 'jsonwebtoken';
import ApplicationController from './application';

export default class UsersController extends ApplicationController {
  constructor(models) {
    super({ model: models.User });

    this.User = models.User;
  }

  authenticate({ email, password }) {
    return this.User.find({ where: { email } })
      .then((record) => {
        if (!record || record.password !== password) {
          return UsersController.ok({
            success: false,
            message: 'Authentication failed',
          });
        }

        const token = jwt.sign({ id: record.id, email: record.email }, 'mysecret', { expiresIn: '24h' });
        return UsersController.ok({
          success: true,
          message: 'enjoy your token',
          token
        });
      });
  }
};
