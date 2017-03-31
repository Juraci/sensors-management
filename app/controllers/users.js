import jwt from 'jsonwebtoken';
import ApplicationController from './application';

export default class UsersController extends ApplicationController {
  constructor(app) {
    const User = app.get('datasource').models.User;
    super({ model: User });

    this.User = User;
    this.jwtConfig = app.get('config').jwt;
  }

  static throwIfWrongPassord(user, password) {
    if (!user.isValidPassword(password)) {
      throw new Error(UsersController.failedAuthMessage());
    }
    return user;
  }

  static throwIfNotFound(user) {
    if (!user) {
      throw new Error(UsersController.failedAuthMessage());
    }
    return user;
  }

  static authFailed(err) {
    if (err.message === UsersController.failedAuthMessage()) {
      return UsersController.ok({
        success: false,
        message: UsersController.failedAuthMessage(),
      });
    }
    throw err;
  }

  static authSuccess(token) {
    return UsersController.ok({
      success: true,
      message: 'enjoy your token',
      token,
    });
  }

  static failedAuthMessage() {
    return 'Authentication failed';
  }

  signToken(user) {
    return jwt.sign({
      id: user.id,
      email: user.email,
    }, this.jwtConfig.secret, { expiresIn: this.jwtConfig.expiresIn });
  }

  authenticate({ email, password }) {
    return this.User.find({ where: { email } })
      .then(UsersController.throwIfNotFound)
      .then(user => UsersController.throwIfWrongPassord(user, password))
      .then(user => this.signToken(user))
      .then(UsersController.authSuccess)
      .catch(UsersController.authFailed);
  }
}
