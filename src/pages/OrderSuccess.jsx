import { useNavigate } from "react-router-dom";

function OrderSuccess() {

  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      <h1> Order Placed Successfully!</h1>
      <p>Your order has been confirmed.</p>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          marginTop: "20px"
        }}
      >
        Go to Home
      </button>

    </div>
  );
}

export default OrderSuccess;