const jwt = require("jsonwebtoken");
const { AuthError, BadRequest } = require("../errors/errors");
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    let payload;

    if (!token) {
      throw new AuthError("Вы не авторизованы");
    }

    try {
      payload = jwt.verify(
        token,
        NODE_ENV === "production" ? JWT_SECRET : "strong-secret"
      );
    } catch {
      throw new AuthError("Вы не авторизованы");
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
