const user = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { NODE_ENV, JWT_SECRET } = process.env;

const signin = (req, res, next) => {
  const { email, password } = req.body;

  user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "strong-secret",
        {
          expiresIn: "1d",
        }
      );
      //временно выключены параметры защиты
      return res
        .cookie("jwt", token, {
          httpOnly: true,
          secure: false,
          maxAge: 3600000 * 24,
        })
        .end();
    })
    .catch(next);
};

module.exports = {
  signin,
};
