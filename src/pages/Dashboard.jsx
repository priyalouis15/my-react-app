import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import "./Dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar,Pie,Line,Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
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

  if (!data) return <h3>Loading..</h3>;

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthData = new Array(12).fill(0);

  data.salesByMonth.forEach(item => {
    monthData[item._id.month- 1] = item.count;
  });

  const ordersChart = {
    labels: months,
    datasets: [
      {
        label: "Orders",
        data: monthData,
        backgroundColor: "#007bff"
      }
    ]
 };

  const revenueData = new Array(12).fill(0);
  data.recentOrders.forEach(order => {
    const m = new Date(order.createdAt).getMonth();
    revenueData[m] += order.totalAmount;
  });
  const revenueChart = {
    labels: months,
    datasets: [
      {
        label: "Revenue",
        data: revenueData,
      borderColor: "#28a745",
        fill: false
      }
    ]
  };

  const paid = data.recentOrders.filter(o => o.paymentStatus === "Paid").length;
  const pending = data.recentOrders.filter(o => o.paymentStatus !== "Paid").length;

  const paymentChart = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        data: [paid, pending],
        backgroundColor: ["#4CAF50", "#FFC107"]
      }
    ]
  };

  const placed = data.recentOrders.filter(o => o.orderStatus === "Placed").length;
  const delivered = data.recentOrders.filter(o => o.orderStatus === "Delivered").length;

  const statusChart = {
    labels: ["Placed", "Delivered"],
    datasets: [
      {
        data: [placed, delivered],
        backgroundColor: ["orange", "green"]
      }
    ]
  };

  return (
    <div className="dashboard-wrapper">

      <div className="sidebar">
        <h3>Admin</h3>
        <p onClick={() => navigate("/dashboard")}>Dashboard</p>
        <p onClick={() => navigate("/add-product")}>Add Product</p>
        <p onClick={() => navigate("/manage-products")}>Manage Product</p>
        <p onClick={() => navigate("/manageorder")}>Manage Order</p>
        <p onClick={() => navigate("/manageuser")}>Manage User</p>
      </div>

      <div className="main"> 
        <h2>Admin Dashboard</h2>
        <div className="cards">
          <div className="card">
            <p>{data.totalProducts}</p>
            <span>Products</span>
          </div>

          <div className="card">
            <p>{data.totalOrders}</p>
            <span>Orders</span>
          </div>

          <div className="card">
            <p>{data.totalUsers}</p>
            <span>Users</span>
          </div>

          <div className="card">
            <p>₹ {data.totalRevenue.toLocaleString()}</p>
            <span>Revenue</span>
          </div>

        </div>

        <div className="charts">

          <div className="chart-box">
            <h4>Orders Per Month</h4>
            <Bar data={ordersChart} />
          </div>

          <div className="chart-box">
            <h4>Revenue Trend</h4>
            <Line data={revenueChart} />
          </div>

          <div className="chart-box">
            <h4>Payment Status</h4>
            <Pie data={paymentChart} />
          </div>

          <div className="chart-box">
            <h4>Order Status</h4>
            <Doughnut data={statusChart} />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;