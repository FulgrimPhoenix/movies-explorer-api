const { NotFoundError } = require('../errors/errors');
const User = require('../models/user');
const { errorMassages } = require('../utils/constants');
// Получение информации о текущем пользователе
const getMyUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User
    .findById(_id)
    .then((findedUser) => {
      if (!findedUser) {
        throw new NotFoundError(errorMassages.notFound);
      }
      return res.status(200).json(User);
    })
    .catch(next);
};
// Обновление информации о текущем пользователе
const patchUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User
    .findOneAndUpdate(
      _id,
      { email: req.body.email, name: req.body.name },
      { new: true, runValidators: true },
    )
    .then((updatedUser) => {
      if (!updatedUser) {
        throw NotFoundError(errorMassages.notFound);
      }
      return res.status(200).json(User);
    })
    .catch(next);
};

module.exports = {
  getMyUserInfo,
  patchUserInfo,
};
