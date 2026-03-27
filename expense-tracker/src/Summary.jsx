export default function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;


  return (
    <div className="card summary">
      <h3>Summary</h3>

      <div className="summary-box">
        <div className="summary-label">Total Income</div>
        <div className="summary-value income">₹{income.toFixed(2)}</div>
      </div>

      <div className="summary-box">
        <div className="summary-label">Total Expense</div>
        <div className="summary-value expense">₹{expense.toFixed(2)}</div>
      </div>

      <div className="summary-box">
        <div className="summary-label">Balance</div>
        <div className="summary-value balance">₹{balance.toFixed(2)}</div>
      </div>
    </div>
  );
}
