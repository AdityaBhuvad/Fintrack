const express = require("express");
const { body } = require("express-validator");

const UserController = require("../controllers/user.controller");

const router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 6 })
      .withMessage("Username must be at least 6 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
  ],
  UserController.registerUser
);

router.post(
  "/login",
  [
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
  ],
  UserController.loginUser
);

router.get("/logout", UserController.logoutUser);
router.get('/fetch-finance/:username',UserController.fetchFinance)
router.put('/update-balance/:username',UserController.updateBalance)
router.get('/fetch-saving/:username',UserController.fetchSavingTarget)
router.put('/update-saving/:username',UserController.updateSavingTarget)

module.exports = router;
