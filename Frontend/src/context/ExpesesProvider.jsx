import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ExpesesContext = createContext(null);

function ExpesesProvider({ children }) {
  const username = localStorage.getItem("user")
  const [user, setUser] = useState("");
  const [categories, setCategories] = useState(null);
  const [expenses, setExpenses] = useState(null);

  const [current_balance, setBalance] = useState(0);
  const [saving_target, setSaving] = useState(0);
  const [current_expense, setCurrentExpense] = useState(0);
  const [current_budget, setBuget] = useState(0);

  const logout = async () => {
    setUser("");
    localStorage.removeItem("user");
    window.location.assign("/")
  }
  const resetSaving = async (newAmount) => {
    try {
      await axios.put(`http://127.0.0.1:4000/users/update-saving/${username}`, {
        saving: newAmount,
      });
      console.log("Saving updated");
      getFinance();
    } catch (err) {
      console.error("Error updating balance", err);
    }
  };
  const resetBalance = async (newAmount) => {
    try {
      await axios.put(`http://127.0.0.1:4000/users/update-balance/${username}`, {
        balance: newAmount,
      });
      console.log("Balance updated");
      getFinance();
    } catch (err) {
      console.error("Error updating balance", err);
    }
  };
  const updateBalance = async (newAmount) => {
    try {
      await axios.put(`http://127.0.0.1:4000/users/update-balance/${username}`, {
        balance: current_balance - newAmount,
      });
      getFinance();
    } catch (err) {
      console.error("Error updating balance", err);
    }
  };

  const getFinance = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/users/fetch-finance/${username}`);
      setBalance(Number(response.data.balance));
      setSaving(Number(response.data.saving));
    } catch (error) {
      console.error("Error fetching finance", error);
    }
  };
  const getBudget = async () => {
    if (current_balance != 0) {
      setBuget(current_balance - saving_target);
    }
  };
  const getCategory = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/category/fetch/${username}`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };
  const getExpenses = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/expense/fetch/${username}`);
      setExpenses(response.data.reverse());
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  useEffect(() => {
    if (expenses) {
      let total_expenses = 0;
      expenses.forEach((expense) => {
        total_expenses += Number(expense.amount);
      });
      setCurrentExpense(total_expenses);
    } else {
      setCurrentExpense(0);
    }
    getBudget();
  });
  const start = () => {
    getCategory();
    getExpenses();
    getFinance();
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <ExpesesContext.Provider
      value={{
        categories,
        getCategory,
        expenses,
        getExpenses,
        current_expense,
        current_balance,
        saving_target,
        current_budget,
        setSaving,
        updateBalance,
        resetBalance,
        user,
        setUser,
        logout,
        resetSaving,
        start
      }}
    >
      {children}
    </ExpesesContext.Provider>
  );
}

export default ExpesesProvider;
