const router = require('express').Router();
const routerAuth = require('./auth');
const routerUsers = require('./users');
const routerCards = require('./cards');
const routerError = require('./error');
const auth = require('../middlewares/auth');

router.use(routerAuth);
router.use(auth, routerUsers);
router.use(auth, routerCards);
router.use(routerError);

module.exports = router;
