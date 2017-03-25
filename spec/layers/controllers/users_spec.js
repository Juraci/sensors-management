import UsersController from '../../../app/controllers/users';
import config from '../../../app/config/config';
import datasource from '../../../app/config/datasource';

describe('UsersController', () => {
  let usersController;
  let datasource;
  let User;

  beforeEach(() => {
    datasource = datasource({ config });
    return datasource.sequelize.sync()
      .then(() => {
        usersController = new UsersController(datasource.models);
      })
      .then(() => {

      });
  });

  describe('#authenticate', () => {
    it('', () => {
    });
  });
});
