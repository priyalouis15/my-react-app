import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line, Bar, Pie } from "react-chartjs-2";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {

  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/dashboard`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return <p>Loading...</p>;

  const labels = data.salesByMonth.map(i => `M${i._id.month}`);
  const values = data.salesByMonth.map(i => i.count);

  const graphData = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: values
      }
    ]
  };

  return (
    <div className="dashboard">

      <h2>Admin Dashboard</h2>

      <div className="cards">

        <div className="card">
          <p>{data.totalOrders}</p>
          <span>Total Orders</span>
        </div>

        <div className="card">
          <p>{data.totalUsers}</p>
          <span>Total Users</span>
        </div>

        <div className="card">
          <p>₹ {data.totalRevenue}</p>
          <span>Total Revenue</span>
        </div>

      </div>

      <div className="charts">

        <div className="chart-box">
          <h4>Sales Per Month</h4>
          <Bar data={graphData} />
        </div>

      </div>

      <div className="buttons">

        <button onClick={() => navigate("/add-product")}>
          Add Product
        </button>

        <button onClick={() => navigate("/manage-products")}>
          Manage Product
        </button>

        <button onClick={() => navigate("/manageorder")}>
          Manage Order
        </button>

        <button onClick={() => navigate("/manageuser")}>
          Manage User
        </button>

      </div>

    </div>
  );
}

export default Dashboard;