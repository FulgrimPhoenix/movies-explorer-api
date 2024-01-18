const mongoose = require("mongoose");
const { AuthError } = require("../errors/errors");
const bcryptjs = require("bcryptjs");
const { errorMassages } = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
      default: "NewUser",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
  },
  {
    versionKey: false,
  }
);

userSchema.statics.findUserByCredentials = async function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new AuthError(errorMassages.authDataError);
      }

      return bcryptjs.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthError(errorMassages.authDataError);
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
