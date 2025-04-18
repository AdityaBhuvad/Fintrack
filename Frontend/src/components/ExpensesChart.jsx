
import React, { useContext, useEffect, useState } from "react";
import "./ExpensesChart.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { ExpesesContext } from "../context/ExpesesProvider";

function ExpensesChart() {
  const { expenses, categories } = useContext(ExpesesContext);
  const [category, setCategories] = useState(null);
  const [expensesAmt, setExpenseAmt] = useState(null);
  useEffect(() => {
    if (categories && expenses) {
      const categoryNames = categories.map((category) => category.categoryName);
      setCategories(categoryNames);

      const expenseTotals = categories.map((category) => {
        return expenses
          .filter((expense) => expense.category === category.categoryName)
          .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      });

      setExpenseAmt(expenseTotals);
    }
  }, [expenses, categories]);

  return (
    <div id="ex-chart">
      <div className="chart">
        {category && expensesAmt ? (
          <BarChart
            series={[
              { data: expensesAmt, label: "Total Expense", color: "#02B2AF" },
            ]}
            height={480}
            xAxis={[{ data: category, scaleType: "band" }]}
            margin={{ top: 0, bottom: 50, left: 60, right: 30 }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ExpensesChart;
