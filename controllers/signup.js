const bcrypt = require('bcryptjs');
const { UserAlreadyExists } = require('../errors/errors');
const User = require('../models/user');
const { errorMassages } = require('../utils/constants');

const signup = (req, res, next) => {
  const { email, name, password } = req.body;

  User.findOne({ email })
    .then((existUser) => {
      if (existUser) {
        throw new UserAlreadyExists(errorMassages.userAlreadyExist);
      }

      return bcrypt.hash(password, 10).then((hash) => {
        const newUser = new User({
          email,
          name,
          password: hash,
        });

        return newUser
          .save()
          .then((createdUser) => res
            .status(201)
            .json({ _id: createdUser._id, email: createdUser.email }));
      });
    })
    .catch(next);
};

module.exports = {
  signup,
};
