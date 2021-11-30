const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      handleRejections: true,
    }),
  ],
  format: winston.format.json(),
});

const errorConsoleLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'errorConsole.log',
      handleExceptions: true,
    }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
  errorConsoleLogger,
};
