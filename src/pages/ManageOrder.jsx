import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageOrder.css";
import { useNavigate } from "react-router-dom";

function ManageOrder() {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3001/orders");
      console.log("ORDERS DATA:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/order/${id}`);
      alert("Deleted");
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="manage-container">

      <h2>Manage Orders</h2>

      <table className="order-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Total</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.fullName}</td>
                <td>₹ {order.totalAmount}</td>
                <td>{order.orderStatus}</td>
                <td>{order.paymentStatus}</td>
                <td>
                  <button onClick={() => deleteOrder(order._id)}>
                    Delete
                  </button>

                  <button onClick={() => navigate(`/edit-order/${order._id}`)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Orders Found</td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}

export default ManageOrder;