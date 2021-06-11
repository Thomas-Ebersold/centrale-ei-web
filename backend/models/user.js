const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
});

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;
