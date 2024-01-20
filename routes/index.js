const { Router } = require('express');
const { celebrate } = require('celebrate');
const { usersRouter } = require('./usersRouter');
const { moviesRouter } = require('./moviesRouter');
const { signup } = require('../controllers/signup');
const { signin } = require('../controllers/signin');
const { signout } = require('../controllers/signout');
const { auth } = require('../middlewares/auth');
const { signupReq, signinReq } = require('../utils/validation');
const { corsCheck } = require('../middlewares/corsCheck');
const { trashController } = require('../controllers/trashController');

const router = Router();

router.post(
  '/signup',
  corsCheck,
  celebrate(signupReq),
  signup,
);

router.post(
  '/signin',
  corsCheck,
  celebrate(signinReq),
  signin,
);

router.post('/signout', corsCheck, signout);

router.use('/users', corsCheck, auth, usersRouter);
router.use('/movies', corsCheck, auth, moviesRouter);
router.use('/:trash', corsCheck, auth, trashController);

module.exports = {
  router,
};
