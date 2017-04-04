import jwt from 'jsonwebtoken';

export default (app) => {
  const secret = app.get('config').jwt.secret;

  return (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.sendStatus(401);
    }
    /*eslint-disable*/
      req.user = jwt.verify(token, secret);
    /*eslint-enable*/
    return next();
  };
};
