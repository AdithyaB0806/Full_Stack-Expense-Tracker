import { useState } from "react";
import axios from "axios";

const CATEGORIES = ["Grocery", "Food", "Travel", "Shopping", "Miscellaneous", "Salary"];

export default function History({ transactions, refresh, api }) {
  const [editTx, setEditTx] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const deleteTx = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    try {
      await axios.delete(`${api}/transaction/${id}`);
      refresh();
    } catch (err) {
      alert("Failed to delete");
    }
  };


  const startEdit = (t) => {
    setEditTx(t.id);
    setForm({
      amount: t.amount,
      type: t.type,
      category: t.category,
      description: t.description || "",
    });
  };

  const saveEdit = async () => {
    if (!form.amount || parseFloat(form.amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`${api}/transaction/${editTx}`, {
        amount: parseFloat(form.amount),
        type: form.type,
        category: form.category,
        description: form.description || null,
      });
      setEditTx(null);
      refresh();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card history-card">
      <h3>Transaction History</h3>

      {transactions.length === 0 ? (
        <p style={{ color: "gray", marginTop: "10px" }}>No transactions yet</p>
      ) : (
        transactions.map((t) => (
          <div key={t.id} className="tx">
            <div className="tx-info">
              <span className="tx-category">{t.category}</span>
              <span className="tx-date">{t.date}</span>
              {t.description && (
                <span className="tx-desc">{t.description}</span>
              )}
            </div>
            <div className="tx-right">
              <span className={`tx-amount ${t.type}`}>
                {t.type === "income" ? "+" : "-"}₹{t.amount.toFixed(2)}
              </span>
              <div className="tx-actions">
                <button className="btn-edit" onClick={() => startEdit(t)}>Edit</button>
                <button className="btn-delete" onClick={() => deleteTx(t.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Edit Modal */}
      {editTx && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Transaction</h3>

            <label>Amount (₹)</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />

            <label>Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <label>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>

            <label>Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Optional"
            />

            <div className="modal-actions">
              <button onClick={saveEdit} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setEditTx(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
