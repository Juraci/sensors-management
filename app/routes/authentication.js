import express from 'express';
import UsersController from '../controllers/users';

const router = express.Router();

export default ({ datasource, jsonParser }) => {
  const usersController = new UsersController(datasource.models);

  router.route('/')
    .post(jsonParser, (req, res) => {
      usersController.authenticate({ email: req.body.email, password: req.body.password })
        .then(result => res.status(result.status).json(result.data));
    });

  return router;
};
