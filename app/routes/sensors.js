import express from 'express';
import SensorsController from '../controllers/sensors';

const router = express.Router();

export default ({ app, auth/* , jsonParser */ }) => {
  const sensorsController = new SensorsController(app);

  router.route('/')
    .get(auth, (req, res) => {
      sensorsController.findAll({ UserId: req.user.id })
        .then(result => res.status(result.status).json(result.data));
    });

  return router;
};
