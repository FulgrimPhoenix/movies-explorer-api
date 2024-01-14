const { Router } = require("express");
const { usersRouter } = require("./usersRouter");
const { moviesRouter } = require("./moviesRouter");
const { celebrate, Joi } = require("celebrate");
const { signup } = require("../controllers/signup");
const { signin } = require("../controllers/signin");
const { signout } = require("../controllers/signout");
const { auth } = require("../middlewares/auth");

const router = Router();

router.post(
  "/signup",
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
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(16).required(),
    }),
  }),
  signin
);

router.post('/signout', signout);

router.use("/users", auth, usersRouter);
router.use("/movies", auth, moviesRouter);

module.exports = {
  router,
};
