import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="admin-page">

      <h2>ADMIN DASHBOARD</h2>

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