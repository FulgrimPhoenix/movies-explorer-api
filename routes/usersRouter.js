const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const { getMyUserInfo, patchUserInfo } = require('../controllers/usersUtils');

const usersRouter = Router();

usersRouter.get('/me', getMyUserInfo);
usersRouter.post('/me', celebrate({
  body: {
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  },
}), patchUserInfo);

module.exports = {
  usersRouter,
};
