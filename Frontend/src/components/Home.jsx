import React, { useEffect } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import ExpensesList from "./ExpensesList";
import Dashboard from "./Dashboard";
import ExpensesChart from "./ExpensesChart";
import { useContext } from "react";
import { ExpesesContext } from "../context/ExpesesProvider";

function Home() {
  const { start } = useContext(ExpesesContext);
  useEffect(() => {
    start(); // Start the app when the component mounts.
  }, []);
  return (
    <div id="home-page">
      <Navbar />
      <main>
        <Dashboard />
        <ExpensesChart />
        <ExpensesList />
      </main>
    </div>
  );
}

export default Home;
