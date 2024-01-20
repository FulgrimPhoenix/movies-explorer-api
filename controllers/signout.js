const { responseMasseges } = require('../utils/constants');

const signout = (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.status(200).json({ message: responseMasseges.signOut });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signout,
};
