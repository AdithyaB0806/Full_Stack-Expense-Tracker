import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#00c49f", "#ff6b6b", "#4da6ff", "#f9c74f", "#a78bfa", "#fb923c"];
const CATEGORIES = ["Grocery", "Food", "Travel", "Shopping", "Miscellaneous", "Salary"];

export default function Chart({ transactions }) {
  const data = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      data[t.category] = (data[t.category] || 0) + t.amount;
    }
  });

  const chartData = Object.keys(data).map((key) => ({
    name: key,
    value: parseFloat(data[key].toFixed(2)),
  }));

  if (chartData.length === 0) {
    return (
      <div className="card">
        <h3>Expense Breakdown</h3>
        <p style={{ color: "gray", marginTop: "10px" }}>No expense data yet</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Expense Breakdown</h3>
      <PieChart width={450} height={350}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
      </PieChart>
    </div>
  );
}
