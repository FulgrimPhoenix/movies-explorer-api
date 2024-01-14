const mongoose = require("mongoose");
const { AuthError } = require("../errors/errors");
const bcryptjs = require("bcryptjs");

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
    },
  },
  {
    versionKey: false,
  }
);

userSchema.statics.findUserByCredentials = async function (email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      throw new AuthError("Неправильные почта или пароль");
    }

    return bcryptjs.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new AuthError("Неправильные почта или пароль");
      }
      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
