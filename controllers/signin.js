const user = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const signin = (req, res, next) => {
  const { email, password } = req.body;

  user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "1d",
      });
      // console.log(token);
      //временно выключены параметры защиты
      return res
        .cookie("jwt", token, {
          httpOnly: false,
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
