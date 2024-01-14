const { BadRequest } = require("../errors/errors");
const movie = require("../models/movie.js");
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
  req.body.owner = { _id: req.user._id};
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
    .findByIdAndDelete(req.params.movieId)
    .then((deletedMovie) => {
      if (!deletedMovie) {
        throw new BadRequest("Фильм с данным id не найден");
      }
      return res.status(200).json(deletedMovie);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
