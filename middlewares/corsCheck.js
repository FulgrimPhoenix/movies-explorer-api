const allowedDomens = [
  'http://localhost:3000',
  'http://mymovie.nomoredomainsmonster.ru',
  'https://mymovie.nomoredomainsmonster.ru',
];

// eslint-disable-next-line consistent-return
const corsCheck = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const reqHeaders = req.headers['access-control-request-headers'];
  const allowedMethods = 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedDomens.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.status(200);
  }/* else{
    throw new AccessError(errorMassages.AccessError);
  } */

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', reqHeaders);
    res.status(200);
    return res.end();
  }

  next();
};

module.exports = {
  corsCheck,
};
