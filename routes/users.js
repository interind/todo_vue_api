const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regProfile } = require('../utils/reg.ext');
const {
  getUsers,
  getUser,
  updateUser,
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.patch('/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).regex(regProfile),
      email: Joi.string().email(),
      password: Joi.string().min(6),
    }).unknown(),
  }), updateUser);

module.exports = router;
