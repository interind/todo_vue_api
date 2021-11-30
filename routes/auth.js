const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const config = require('config');
const checkPassword = require('../middlewares/checkPassword');
const { regProfile } = require('../utils/reg.ext');

const {
  login,
  createUser,
} = require('../controllers/users.js');

router.post(
  '/signup',
  checkPassword,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).regex(regProfile)
        .required(),
      email: Joi.string().required().custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message(config.get('messageErrorEmail'));
      }),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser,
);
router.post(
  '/signin',
  checkPassword,
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message(config.get('messageErrorEmail'));
      }),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);

module.exports = router;
