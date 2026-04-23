import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Checkout.css";
import BASE_URL from "../api";
function Checkout() {

  const [cartItems, setCartItems] = useState([]);

  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const buyNowItem = location.state?.buyNowItem;

  const loadBuyNow = async () => {
    try {
      const res = await axios.get(
    `${BASE_URL}/product/${buyNowItem.productId}`
      );

      setCartItems([
        {
          productId: res.data,
          quantity: buyNowItem.quantity
        }
      ]);
    } catch (err) {
      console.log(err);
    }
  };


  const loadCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/cart`);
         setCartItems(res.data?.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
 const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }

    if (buyNowItem) loadBuyNow();
    else loadCart();

  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
const gst = total * 0.18;
  const grandTotal = total + gst;

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert("Email missing");
      return;
    }
    try {

      const checkoutItems = cartItems.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      }));
      const res = await axios.post(`${BASE_URL}/order`, {
        fullName,
        email: userEmail,
        phone,
        address,
        city,
        state: stateName,
        pincode,
        items: checkoutItems,
        payment: "pending"
      });

      if (!res.data || !res.data.orderId) {
        alert("Order failed");
        return;
      }
   navigate("/payment", {
        state: {
          orderId: res.data.orderId,
          total: grandTotal
        }
      });

    } catch (err) {
      console.log("CHECKOUT ERROR:", err.response?.data || err.message);
         alert("Server error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="checkout-container">

  <div className="checkout-left">
       <h2>Shipping Details</h2>

    <form onSubmit={handleSubmit} className="checkout-form">

      <div className="form-group">
        <label>Full Name</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </div>

      <div className="form-group">
              <label>Email</label>
        <input value={userEmail} readOnly />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Address</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>

      <div className="row">
      <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
        <input placeholder="State" value={stateName} onChange={(e) => setStateName(e.target.value)} required />
      </div>

      <input
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        required
      />

      <button className="checkout-btn">
        Proceed to Payment
      </button>

    </form>
  </div>


  <div className="checkout-right">
    <h3>Order Summary</h3>

    {cartItems.map((item) => (
      <div className="summary-item" key={item.productId._id}>
        <span>{item.productId.name}</span>
        <span>₹ {item.productId.price * item.quantity}</span>
      </div>
    ))}

    <hr />

    <div className="summary-row">
      <span>Total</span>
      <span>₹ {total}</span>
    </div>

    <div className="summary-row">
      <span>GST (18%)</span>
      <span>₹ {gst.toFixed(2)}</span>
    </div>

    <div className="grand-total">
      <span>Grand Total</span>
      <span>₹ {grandTotal.toFixed(2)}</span>
    </div>
  </div>

</div>
    </>
  );
}

export default Checkout;