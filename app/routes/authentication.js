import express from 'express';
import UsersController from '../controllers/users';

const router = express.Router();

export default ({ app, jsonParser }) => {
  const usersController = new UsersController(app);

  router.route('/')
    .post(jsonParser, (req, res) => {
      usersController.authenticate({ email: req.body.email, password: req.body.password })
        .then(result => res.status(result.status).json(result.data));
    });

  return router;
};
