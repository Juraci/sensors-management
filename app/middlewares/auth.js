import jwt from 'jsonwebtoken';

export default (app) => {
  const secret = app.get('config').jwt.secret;

  return (req, res, next) => {
    const token = req.headers['x-access-token'];

    let decoded;

    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return res.sendStatus(401);
    }

    /*eslint-disable*/
    req.user = decoded;
    /*eslint-enable*/
    return next();
  };
};
