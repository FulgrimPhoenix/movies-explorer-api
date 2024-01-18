const { Router } = require("express");
const { usersRouter } = require("./usersRouter");
const { moviesRouter } = require("./moviesRouter");
const { celebrate, Joi } = require("celebrate");
const { signup } = require("../controllers/signup");
const { signin } = require("../controllers/signin");
const { signout } = require("../controllers/signout");
const { auth } = require("../middlewares/auth");
const { corsCheck } = require("../middlewares/corsCheck");
const { NotFoundError } = require("../errors/errors");
const { errorMassages } = require("../utils/constants");

const router = Router();

router.post(
  "/signup", corsCheck,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(16).required(),
    }),
  }),
  signup
);

router.post(
  "/signin", corsCheck,
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(16).required(),
    }),
  }),
  signin
);

router.post('/signout', corsCheck, signout);

router.use("/users", corsCheck, auth, usersRouter);
router.use("/movies", corsCheck, auth, moviesRouter);
router.use("/:trash", (req, res, next) => {
  throw new NotFoundError(errorMassages.notFound);
  next();
})

module.exports = {
  router,
};
