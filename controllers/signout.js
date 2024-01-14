const signout = (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "cookies успешно удалены" });
  } catch (error) {
    next(err);
  }
};

module.exports = {
  signout,
};
