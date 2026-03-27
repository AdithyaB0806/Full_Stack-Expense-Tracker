import { useState } from "react";
import axios from "axios";

const CATEGORIES = ["Grocery", "Food", "Travel", "Shopping", "Miscellaneous", "Salary"];



export default function AddTransaction({ refresh, api }) {
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: "Food",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.amount || parseFloat(form.amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${api}/transaction`, {
        amount: parseFloat(form.amount),
        type: form.type,
        category: form.category,
        description: form.description || null,
      });
      setForm({ amount: "", type: "expense", category: "Food", description: "" });
      refresh();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Add Transaction</h3>

      <div className="form-row">
        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            name="amount"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder="Optional note"
            value={form.description}
            onChange={handleChange}
          />
        </div>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Adding..." : "+ Add Transaction"}
      </button>
    </div>
  );
}
