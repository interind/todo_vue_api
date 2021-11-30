const createError = require('http-errors');
const config = require('config');

const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || !password.trim() || password.trim().length < 6) {
    return next(createError.BadRequest(config.get('messageBadRequest')));
  }
  return next();
};

module.exports = checkPassword;
