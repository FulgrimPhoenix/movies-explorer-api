const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1000 * 60 * 10, // временной интервал
  limit: 200, // количество запросов с одного айпи
  standardHeaders: 'draft-7',
  legacyHeaders: false, // старые заголовки в запросах
});

module.exports = {
  limiter,
};
