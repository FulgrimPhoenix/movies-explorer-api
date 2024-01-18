const { Joi } = require('celebrate');

module.exports = {
  signupReq: {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(16).required(),
    }),
  },
  signinReq: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(16).required(),
    }),
  },
  createMovieReq: {
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .uri()
        .required()
        .pattern(/^https?:\/\//),
      trailerLink: Joi.string()
        .uri()
        .required()
        .pattern(/^https?:\/\//),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string()
        .uri()
        .required()
        .pattern(/^https?:\/\//),
      movieId: Joi.number().required(),
    }),
  },
  deleteMovieReq: {
    params: Joi.object().keys({
      movieId: Joi.string().hex().required().length(24),
    }),
  },
};
