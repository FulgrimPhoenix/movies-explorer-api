const { NotFoundError } = require('../errors/errors');
const { errorMassages } = require('../utils/constants');

const trashController = (req, res, next) => {
  next(new NotFoundError(errorMassages.notFound));
};

module.exports = {
  trashController,
};
