import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditOrder.css";

function EditOrder() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/order/${id}`);
      setOrderStatus(res.data.orderStatus);
      setPaymentStatus(res.data.paymentStatus);
    } catch (err) {
      console.log(err);
    }
  };

  const updateOrder = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3001/update-order/${id}`,
        {
          orderStatus,
          paymentStatus
        }
      );

      alert(res.data.message);
      navigate("/manageorder");

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert("Update failed");
    }
  };

  return (
    <div className="edit-page">
      <div className="edit-container">

        <h2>Edit Order</h2>

        <label>Order Status</label>
        <select
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Placed">Placed</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <label>Payment Status</label>
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button onClick={updateOrder}>
          Update Order
        </button>

      </div>
    </div>
  );
}

export default EditOrder;