import jwt from 'jsonwebtoken';
import ApplicationController from './application';

export default class UsersController extends ApplicationController {
  constructor(app) {
    const User = app.get('datasource').models.User;
    super({ model: User });

    this.User = User;
    this.jwtConfig = app.get('config').jwt;
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

        const token = jwt.sign({
          id: record.id,
          email: record.email
        }, this.jwtConfig.secret, this.jwtConfig.expiresIn);

        return UsersController.ok({
          success: true,
          message: 'enjoy your token',
          token
        });
      });
  }
};
