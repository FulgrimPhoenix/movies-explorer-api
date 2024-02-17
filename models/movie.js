const mongoose = require('mongoose');

module.exports = mongoose.model('movie', new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\//.test(v);
      },
      massege: 'В поле "картинка" должна быть ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\//.test(v);
      },
      massege: 'В поле "трейлер" должна быть ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\//.test(v);
      },
      massege: 'В этом поле должна быть ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    /* validate: {
      validator(v) {
        return !/[a-z]/i.test(v);
      },
      message: 'Данное поле не должно содержать латинские символы',
    }, */
  },
  nameEN: {
    type: String,
    required: true,
    /* validate: {
      validator(v) {
        return !/[а-я]/i.test(v);
      },
      message: 'Данное поле не должно содержать кириллические символы',
    }, */
  },
}));
