import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Payment.css";
import BASE_URL from "../api";
function Payment() {

  const location = useLocation();
  const navigate = useNavigate();

  const [method, setMethod] = useState("cod");
  const [orderId, setOrderId] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (location.state?.orderId && location.state?.total) {
      setOrderId(location.state.orderId);
      setTotal(location.state.total);
    } else {
      navigate("/checkout");
    }
  }, [location.state]);
const handlePayment = async () => {
  try {

    if (!orderId) {
      alert("Order not found");
      return;
    }

    if (method === "cod") {

      await axios.put(`${BASE_URL}/update-payment/${orderId}`, {
        paymentMethod: "cod",
        status: "pending"
      });

      navigate("/success");

    } else {

      if (!window.Razorpay) {
        alert("Razorpay not loaded");
        return;
      }

      if (!total || total <= 0) {
        alert("Invalid amount");
        return;
      }

      const res = await axios.post(
        `${BASE_URL}/create-razorpay-order`,
        { amount: total }
      );

      const order = res.data;

      if (!order || !order.id) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: "rzp_test_SdqUctk0G7I27f",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "My Shop",
        description: "Order Payment",

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${BASE_URL}/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: orderId
              }
            );

            if (verifyRes.data.success) {
              navigate("/success");
            } else {
              alert("Payment verification failed ");
            }

          } catch (err) {
            console.log("VERIFY ERROR:", err);
            alert("Verification error");
          }
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.log("FAILED:", response);
        alert("Payment Failed ");
      });

      rzp.open();
    }

  } catch (err) {
    console.log("PAYMENT ERROR:", err.response?.data || err.message);
    alert("Payment error ");
  }
};
  return (
    <>
      <Navbar />

      <div className="payment-container">
        <div className="payment-box">

          <h2>Payment</h2>

          <p className="payment-amount">₹ {total}</p>

          <label className="payment-option">
            <input
              type="radio"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
            />
            Cash on Delivery
          </label>

          <label className="payment-option">
            <input
              type="radio"
              checked={method === "online"}
             onChange={() => setMethod("online")}
            />
            Online Payment
          </label>

          <button className="pay-btn" onClick={handlePayment}>
            Confirm & Pay
          </button>

        </div>
      </div>
    </>
  );
}

export default Payment;