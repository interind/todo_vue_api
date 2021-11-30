const router = require('express').Router();
const createError = require('http-errors');
const config = require('config');

router.all('*', (req, res, next) => next(createError.NotFound(config('messageNotFound'))));

module.exports = router;
