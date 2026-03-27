import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { CartesianGrid } from "recharts";

export default function MonthlyChart({ api }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${api}/monthly-summary`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="card">
      <h3>Monthly Expenses</h3>

      <BarChart width={400} height={250} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#00c49f" radius={[10, 10, 0, 0]}  />
      </BarChart>
    </div>
  );
}