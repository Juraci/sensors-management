import express from 'express';

const router = express.Router();

export default ({ datasource, jsonParser }) => {
  router.route('/')
    .post(jsonParser, (req, res) => {
      const User = datasource.models.User;

      User.find({ where: { email: req.body.email }})
        .then((record) => {
          if (record.password !== req.body.password) {
            return res.status(200).json({
              success: false,
              message: 'Authentication failed',
            });
          }
          return res.status(200).json({
            success: true,
            message: 'enjoy your token',
            token: 'auth-token',
          });
        })
    });

  return router;
};
