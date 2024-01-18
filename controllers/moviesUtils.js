const { NotFoundError, AccessError } = require('../errors/errors');
const Movie = require('../models/movie');
const { errorMassages } = require('../utils/constants');
// Получение полного списка сохраненных фильмов
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      const myMovie = movies.filter(
        (currentMovie) => currentMovie.owner.toString() === req.user._id,
      );
      return res.status(200).json(myMovie);
    })
    .catch(next);
};
// Добавление фильма в избранное. Автор захардкожен пока нет авторизации
const createMovie = (req, res, next) => {
  req.body.owner = { _id: req.user._id };
  const newMovie = new Movie(req.body);
  return newMovie
    .save()
    .then((createdMovie) => {
      res.status(201).json(createdMovie);
    })
    .catch(next);
};
// Удаление фильма из избранного
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((currentMovie) => {
      if (!currentMovie) {
        throw new NotFoundError(errorMassages.notFound);
      }
      if (currentMovie.owner.toString() !== req.user._id) {
        throw new AccessError(errorMassages.AccessError);
      }
      return Movie.findByIdAndDelete(req.params.movieId).then(
        (deletedMovie) => {
          res.status(200).json(deletedMovie);
        },
      );
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
