const { errorMassages } = require('../utils/constants');

// eslint-disable-next-line no-unused-vars
const errorController = (err, req, res, next) => {
  const { code, statusCode = 500, message } = err;

  if (code === 11000) {
    return res
      .status(code)
      .send({ message: errorMassages.userAlreadyExist });
  }

  return res
    .status(statusCode)
    .json({
      message: statusCode === 500
        ? errorMassages.serverError
        : message,
    });
};

module.exports = {
  errorController,
};
