const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  saving: { type: Number, default: 0 },
});


// methods for generating tokens and comparing passwords

UserSchema.methods.validatePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

UserSchema.methods.generateToken = async () => {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

// static method to get hash password

UserSchema.statics.getHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
