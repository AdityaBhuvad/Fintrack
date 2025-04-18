import React, { useContext, useState } from "react";
import "./ExpensesList.css";
import ExpensesForm from "./ExpensesForm";
import { ExpesesContext } from "../context/ExpesesProvider";
function ExpensesList() {
  const { expenses } = useContext(ExpesesContext);
  // if (expenses) {
  //   console.log(expenses);
  // }

  return (
    <div id="expenses-list">
      <ExpensesForm />
      <div className="list">
        {!expenses
          ? ""
          : expenses.map((expense) => (
              <div key={expense._id} className="expense">
                <div className="data-time">
                  <p>
                    {expense.date[0]} {expense.date[1]} {expense.date[2]}
                  </p>
                  <p>{expense.date[4]} </p>
                </div>
                <div>
                  <span>{expense.category}: </span>
                  <span>{expense.amount}</span>
                </div>
                <span style={{ fontSize: "10px", fontWeight: "400" }}>
                  {expense.subCategory}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}

export default ExpensesList;
