const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const config = require('config');
const createError = require('http-errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(createError.Unauthorized(config.get('messageUnauthorized')));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : config.get('secretKey'));
  } catch (err) {
    next(createError.Unauthorized(config.get('messageUnauthorizedToken')));
  }

  req.user = payload;

  next();
  return true;
};
