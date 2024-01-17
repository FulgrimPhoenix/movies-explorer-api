const { Router } = require("express");
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/moviesUtils");
const { celebrate, Joi } = require("celebrate");

const moviesRouter = Router();

moviesRouter.get("/", getMovies);
moviesRouter.post(
  "/",
  celebrate({
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
  }),
  createMovie
);
moviesRouter.delete(
  "/:movieId",
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().length(24).pattern(/\w+$/),
    }),
  }),
  deleteMovie
);

module.exports = { moviesRouter };
