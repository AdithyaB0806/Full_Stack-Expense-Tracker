import { useState, useEffect } from "react";
import axios from "axios";
import AddTransaction from "./AddTransaction";
import Summary from "./Summary";
import Chart from "./Chart";
import History from "./History";
import "./App.css";
import MonthlyChart from "./MonthlyChart";

const API = "http://localhost:8000";

function App() {
  const [transactions, setTransactions] = useState([]);


  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/transactions`);
      setTransactions(res.data || []);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setTransactions([]);
    }
  };

  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <p className="subtitle">Track your income and expenses</p>

      <div className="top-grid">
        <AddTransaction refresh={fetchData} api={API} />
        <Summary transactions={transactions} />
      </div>

      <div className="bottom-grid">
        <Chart transactions={transactions} />
        <History transactions={transactions} refresh={fetchData} api={API} />
      </div>

      <div className="bottom-grid">
        <MonthlyChart api={API} />
      </div>
    </div>
  );
}

export default App;
