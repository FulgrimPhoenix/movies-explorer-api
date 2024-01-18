const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
require("dotenv").config(); //включение переменных окружения
const { errors } = require("celebrate");
const { router } = require("./routes/index");
const { errorController } = require("./controllers/errorsController");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { limiter } = require("./utils/rateLimiter");

const app = express();

const { NODE_ENV, DB_URL } = process.env;

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(cookieParser());

const { PORT = 3000, URL = NODE_ENV === 'production' ? DB_URL : 'mongodb://0.0.0.0:27017/devDB' } = process.env;

mongoose
  .connect(URL)
  .then(() => console.log("connected to data base"))
  .catch((err) => console.log(`data base connection error: ${err}`));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`server listen PORT ${PORT}`);
});

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorController);