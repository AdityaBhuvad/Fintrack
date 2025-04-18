const express = require("express");
const { body } = require("express-validator");
const ExpenseController = require("../controllers/expense.controller")


const router = express.Router();
// { username, categoryName, subCategories }

router.post(
    '/create',
    [
        body("username").isLength({min:6}).withMessage("Username is required"),
        body("category").isLength({min:2}).withMessage("Category name is required"),
    ],
    ExpenseController.createExpense
)


router.get('/fetch/:username',ExpenseController.fetchExpense)


module.exports = router;
