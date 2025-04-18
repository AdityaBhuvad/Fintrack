const ExpenseModel = require("../model/expense.model");
const { validationResult } = require("express-validator");

module.exports.createExpense = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, category, subCategories, amount, date } = req.body;

    const category_docs = await ExpenseModel.create({
      username,
      category,
      subCategory: subCategories,
      amount,
      date,
    });

    res.status(200).json({
      message: "Category Created successfully",
      category_docs,
    });
  } catch (err) {
    console.error("Error in creating category:", err.message);
    res.status(500).json({ message: "Can't Created Category" });
  }
};

module.exports.fetchExpense = async (req, res) => {
  try {
    const expenseList = await ExpenseModel.find({
      username: req.params.username,
    });
    res.status(200).json(expenseList);
  } catch (err) {
    console.error("Error in fetching category:", err.message);
    res.status(500).json({ message: "Can't fetch Category" });
  }
};
