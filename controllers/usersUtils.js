const { NotFoundError } = require("../errors/errors.js");
const user = require("../models/user.js");
//Получение информации о текущем пользователе
const getMyUserInfo = (req, res, next) => {
  const { _id } = req.user;

  user
    .findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("пользователь не найден");
      }
      return res.status(200).json(user);
    })
    .catch(next);
};
//Обновление информации о текущем пользователе
const patchUserInfo = (req, res, next) => {
  const { _id } = req.user;

  user
    .findOneAndUpdate(
      _id,
      { email: req.body.email, name: req.body.name },
      { new: true, runValidators: true }
    )
    .then((user) => {
      if (!user) {
        throw NotFoundError("пользователя не существует");
      }
      return res.status(200).json(user);
    })
    .catch(next);
};

module.exports = {
  getMyUserInfo,
  patchUserInfo
}
