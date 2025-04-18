const mongoose = require("mongoose");


const ExpenseSchema = mongoose.Schema({
  username: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Array, required: true, default: [] },
});

const ExpenseModel = mongoose.model("expense", ExpenseSchema);

module.exports = ExpenseModel;
