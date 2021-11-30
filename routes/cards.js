const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regProfile } = require('../utils/reg.ext');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

router.get('/cards', getCards);
router.post('/cards',
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().min(2).max(30).regex(regProfile)
        .required(),
      description: Joi.string().min(10).max(200)
        .required(),
      date: Joi.date().min(2).max(30)
        .required(),
    }),
  }), createCard);
router.delete('/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }), deleteCard);
router.put('/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }), likeCard);
router.delete('/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }), dislikeCard);

module.exports = router;
