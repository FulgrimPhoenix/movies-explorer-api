const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const signin = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findUserByCredentials(email, password)
    .then((findedUser) => {
      const token = jwt.sign(
        { _id: findedUser._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'strong-secret',
        {
          expiresIn: '1d',
        },
      );
      // временно выключены параметры защиты
      return res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24,
          sameSite: 'none',
          secure: true,
        })
        .status(200).json({ email: findedUser.email, name: findedUser.name })
        .end();
    })
    .catch(next);
};

module.exports = {
  signin,
};
