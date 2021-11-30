const config = require('config');

module.exports.errorsResponse = (error, req, res, next) => {
  res.status(error.status || config.get('default')).send({
    message: error.message,
  }).setHeader('Content-Type', 'application/json');
  next();
};
