const { userAlreadyExists } = require("../errors/errors");
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const { errorMassages } = require("../utils/constants");

const signup = (req, res, next) => {
  const { email, name, password } = req.body;

  user
    .findOne({ email })
    .then((existUser) => {
      if (existUser) {
        throw new userAlreadyExists(errorMassages.userAlreadyExist);
      }

      return bcrypt.hash(password, 10).then((hash) => {
        const newUser = new user({
          email: email,
          name: name,
          password: hash,
        });

        return newUser.save().then((user) =>
          res.status(201).json({
            _id: user._id,
            email: user.email,
          })
        );
      });
    })
    .catch(next);
};

module.exports = {
  signup,
};
