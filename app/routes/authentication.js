import express from 'express';

const router = express.Router();

export default ({ datasource, jsonParser }) => {
  router.route('/')
    .post(jsonParser, (req, res) => {
      res.status(200).json({ success: true, message: 'authToken' });
    });

  return router;
};
