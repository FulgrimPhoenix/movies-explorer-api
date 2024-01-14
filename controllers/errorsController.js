const errorController = (err, req, res, next) => {
  const { code, statusCode = 500, message } = err;

  if (code === 11000) {
    return res
      .status(code)
      .send({ message: "Пользователь с такими данным уже существует" });
  }

  return res
    .status(statusCode)
    .json({
      message: statusCode === 500 
        ? "На сервере произошла ошибка" 
        : message,
    });
};

module.exports = {
  errorController
}