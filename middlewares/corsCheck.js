const { accessError } = require("../errors/errors");
const { errorMassages } = require("../utils/constants");

const allowedDomens = [
  "http://localhost:3000",
  "http://mymovie.nomoredomainsmonster.ru",
  "https://mymovie.nomoredomainsmonster.ru",
];

const corsCheck = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req
  const reqHeaders = req.header['access-control-request-headers'];
  const allowedMethods = 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE'

  if (allowedDomens.includes(origin)){
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.status(200);
  }/* else{
    throw new accessError(errorMassages.accessError);
  } */

  if (method === 'OPTION') {
      res.header('Access-Control-Allow-Methods', allowedMethods);
      res.header('Access-Control-Allow-Headers', reqHeaders);
      res.status(200);
      return res.end();
  }

  next();
}

module.exports = {
  corsCheck
}
