import express from 'express';
import SensorsController from '../controllers/sensors';

const router = express.Router();

export default ({ app, auth, jsonParser }) => {
  const sensorsController = new SensorsController(app);

  router.route('/')
    .get(auth, (req, res) => {
      sensorsController.findAll({ UserId: parseInt(req.user.id, 10) })
        .then(result => res.status(result.status).json(result.data));
    })
    .post(auth, jsonParser, (req, res) => {
      sensorsController.create(parseInt(req.user.id, 10), req.body)
        .then(result => res.status(result.status).json(result.data));
    });

  router.route('/:id')
    .delete(auth, (req, res) => {
      sensorsController.deleteById(parseInt(req.user.id, 10), parseInt(req.params.id, 10))
        .then(result => res.status(result.status).json(result.data));
    });

  return router;
};
