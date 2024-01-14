const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const { router } = require("./routes/app");
const cookieParser = require("cookie-parser");
const { errorController } = require("./controllers/errorsController");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const app = express();
require("dotenv").config(); //включение переменных окружения

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса 
app.use(cookieParser());

const { PORT = 3000, URL = "mongodb://0.0.0.0:27017/bitfilmsdb" } = process.env;

mongoose
  .connect(URL)
  .then(() => console.log("connected to data base"))
  .catch((err) => console.log(`data base connection error: ${err}`));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`server listen PORT ${PORT}`);
});

app.use(requestLogger);
app.use(router);
app.use(errorLogger)
app.use(errorController);