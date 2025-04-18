import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { ExpesesContext } from "../context/ExpesesProvider";
import { PieChart } from "@mui/x-charts";

function Dashboard() {
  const {
    current_expense,
    current_balance,
    saving_target,
    current_budget,
    setSaving,
    resetBalance,
    resetSaving,
  } = useContext(ExpesesContext);
  return (
    <div id="dashboard">
      <div className="cards">
        <div className="card">
          <p>Balance</p>

          <h1>
            <span>Rs.</span>{" "}
            <input
              type="text"
              value={current_balance}
              onChange={(e) => resetBalance(e.target.value)}
            />
          </h1>
        </div>
        <div className="card">
          <p>Saving Target</p>
          <h1>
            <span>Rs.</span>{" "}
            <input
              type="text"
              value={saving_target}
              onChange={(e) => resetSaving(e.target.value)}
            />
          </h1>
        </div>
        <div className="card">
          <p>Current Expenses</p>
          <h1>
            <span>Rs.</span> {current_expense}
          </h1>
        </div>
        <div className="card">
          <p>Budget</p>
          <h1>
            <span>Rs.</span> {current_budget}
          </h1>
        </div>
      </div>
      <div className="finance-chart">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: current_balance, label: "Current Balance" },
                { id: 1, value: saving_target, label: "Current Saving" },
                { id: 2, value: current_expense, label: "Current Expense" },
                { id: 3, value: current_budget, label: "Current Budget" },
              ],
            },
          ]}
          width={450}
          height={200}
        />
      </div>
    </div>
  );
}

export default Dashboard;
