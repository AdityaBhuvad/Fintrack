const UserModel = require("../model/user.model");
const { validationResult } = require("express-validator");
const UserSrv = require("../services/user.service");
const BlackListedTokenModel = require("../model/blacklistedtoken.model");

module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password, email } = req.body;
    const hashedPassword = await UserModel.getHashPassword(password);
    const user = await UserSrv.createService({
      username,
      password: hashedPassword,
      email,
    });
    const token = await user.generateToken();
    res.cookie("token", token);
    res.status(200).json({
      message: "User registered successfully",
      isRegistered: true,
    });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res
      .status(500)
      .json({ message: "Can't register user", isRegistered: false });
  }
};
////-------------------------------------------------------------
module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, email } = req.body;
    console.log(req.body);
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalide email or password" });
    } else {
      const isValide = await user.validatePassword(password, user.password);
      console.log(isValide);
      if (!isValide) {
        return res.status(401).send({ message: "Invalid email or password" });
      } else {
        const token = await user.generateToken();
        res.cookie("token", token);
        res.json({
          message: "User logged in successfully",
          username: user.username,
        });
      }
    }
  } catch (err) {
    console.error("Error logging in user:", err.message);
    res.status(401).send({ message: "Invalid credentials" });
  }
};
module.exports.logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({ message: "No token, user not logged in" });
    } else {
      await BlackListedTokenModel.create({ token });
      res.clearCookie("token");
      res.json({ message: "User logged out successfully" });
    }
  } catch (err) {
    console.error("Error logging out user:", err.message);
    res.status(500).send({ message: "Can't log out user" });
  }
};
module.exports.fetchFinance = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).json({ balance: user.balance, saving: user.saving });
    }
  } catch (err) {
    console.error("Error fetching balance:", err.message);
    res.status(500).send({ message: "Can't fetch balance" });
  }
};

module.exports.updateBalance = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await UserModel.findOneAndUpdate(
      { username: req.params.username },
      { $set: { balance: req.body.balance } },
      { new: true }
    );
    res.status(200).json({ balance: user.balance });
  } catch (err) {
    console.error("Error updating balance:", err.message);
    res.status(500).send({ message: "Can't update balance" });
  }
};
module.exports.fetchSavingTarget = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).json({ saving: user.saving });
    }
  } catch (err) {
    console.error("Error fetching balance:", err.message);
    res.status(500).send({ message: "Can't fetch balance" });
  }
};

module.exports.updateSavingTarget = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await UserModel.findOneAndUpdate(
      { username: req.params.username },
      { $set: { saving: req.body.saving } },
      { new: true }
    );
    res.status(200).json({ saving: user.saving });
  } catch (err) {
    console.error("Error updating balance:", err.message);
    res.status(500).send({ message: "Can't update balance" });
  }
};
