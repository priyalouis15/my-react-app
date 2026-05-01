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

import { Bar, Pie } from "react-chartjs-2";
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
      console.log("Dashboard error:", err);
    }
  };

  if (!data) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  
  const labels =
    data.salesByMonth?.map(i =>
      new Date(2024, i._id.month - 1).toLocaleString("default", { month: "short" })
    ) || [];

  const values = data.salesByMonth?.map(i => i.count) || [];

  const barData = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: values,
        backgroundColor: "#007bff"
      }
    ]
  };

 
  const paid =
    data.recentOrders?.filter(o => o.paymentStatus === "Paid").length || 0;

  const pending =
    data.recentOrders?.filter(o => o.paymentStatus !== "Paid").length || 0;

  const pieData = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        data: [paid, pending],
        backgroundColor: ["#4CAF50", "#FFC107"]
      }
    ]
  };

  return (
    <div className="dashboard">

      <h2>Admin Dashboard</h2>

   
      <div className="cards">

        <div className="card">
          <p>{data.totalProducts}</p>
          <span>Total Products</span>
        </div>

        <div className="card">
          <p>{data.totalOrders}</p>
          <span>Total Orders</span>
        </div>

        <div className="card">
          <p>{data.totalUsers}</p>
          <span>Total Users</span>
        </div>

        <div className="card">
          <p>₹ {data.totalRevenue.toLocaleString()}</p>
          <span>Total Revenue</span>
        </div>

      </div>

      <div className="charts">

        <div className="chart-box">
          <h4>Sales Per Month</h4>
          <Bar data={barData} />
        </div>

        <div className="chart-box">
          <h4>Payment Status</h4>
          <Pie data={pieData} />
        </div>

      </div>

      <div className="table-box">
        <h4>Recent Orders</h4>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.recentOrders?.map(order => (
              <tr key={order._id}>
                <td>{order._id.slice(-6)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>₹ {order.totalAmount.toLocaleString()}</td>
                <td
                  style={{
                    color:
                      order.orderStatus === "Placed"
                        ? "orange"
                        : "green",
                    fontWeight: "bold"
                  }}
                >
                  {order.orderStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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