const mongoose = require("mongoose");

const UserSchma = mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    verify: { type: Boolean, require: false },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchma);
module.exports = User;
