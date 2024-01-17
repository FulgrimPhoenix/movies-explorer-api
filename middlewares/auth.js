const jwt = require("jsonwebtoken");
const { AuthError, BadRequest } = require("../errors/errors");
const { errorMassages } = require("../utils/constants");
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    let payload;

    if (!token) {
      throw new AuthError(errorMassages.authError);
    }

    try {
      payload = jwt.verify(
        token,
        NODE_ENV === "production" ? JWT_SECRET : "strong-secret"
      );
    } catch {
      throw new AuthError(errorMassages.authError);
    }

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  auth,
};
