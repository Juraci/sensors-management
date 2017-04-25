import express from 'express';
import AlertsController from '../controllers/alerts';

const router = express.Router();

export default ({ app, auth }) => {
  const alertsController = new AlertsController(app);

  router.route('/:id')
    .delete(auth, (req, res) => {
      alertsController.deleteById(/* parseInt(req.user.id, 10),*/ parseInt(req.params.id, 10))
        .then(result => res.status(result.status).json(result.data));
    });

  return router;
};
