const { Router } = require('express');
const { celebrate } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/moviesUtils');
const { createMovieReq, deleteMovieReq } = require('../utils/validation');

const moviesRouter = Router();

moviesRouter.get('/', getMovies);
moviesRouter.post('/', celebrate(createMovieReq), createMovie);
moviesRouter.delete('/:movieId', celebrate(deleteMovieReq), deleteMovie);

module.exports = { moviesRouter };
