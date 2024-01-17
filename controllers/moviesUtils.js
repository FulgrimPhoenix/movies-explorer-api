const { NotFoundError, accessError } = require("../errors/errors");
const movie = require("../models/movie.js");
const { errorMassages } = require("../utils/constants.js");
//Получение полного списка сохраненных фильмов
const getMovies = (req, res, next) => {
  movie
    .find({})
    .then((movies) => {
      return res.status(200).json(movies);
    })
    .catch(next);
};
//Добавление фильма в избранное. Автор захардкожен пока нет авторизации
const createMovie = (req, res, next) => {
  req.body.owner = { _id: req.user._id };
  const newMovie = new movie(req.body);
  newMovie
    .save()
    .then((newMovie) => {
      return res.status(201).json(newMovie);
    })
    .catch(next);
};
//Удаление фильма из избранного
const deleteMovie = (req, res, next) => {
  movie
    .findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMassages.notFound);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new accessError(errorMassages.accessError);
      }
      movie
        .findByIdAndDelete(req.params.movieId)
        .then((deletedMovie) => {
          return res.status(200).json(deletedMovie);
        })
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
