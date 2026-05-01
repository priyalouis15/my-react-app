import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./Cart.css";
import Navbar from "../components/Navbar";
import BASE_URL from "../api";
function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {

      const res = await axios.get(`${BASE_URL}/cart`);

      console.log("Cart response:", res.data);

      setCartItems(res.data?.items || []);

    } catch (error) {
      console.log("Error loading cart:", error);
    }
  };
const increaseQty = async (productId) => {
  try {

    await axios.put(`${BASE_URL}/cart/${productId}`, {
      action: "increase"
      });

    loadCart();

  }catch (error){
    console.log(error);
  }
};
 const decreaseQty =async (productId)=>{
  try {

    await axios.put(`${BASE_URL}/cart/${productId}`,{
      action: "decrease"
    });

    loadCart();

  }catch (error){
    console.log("Decrease error:", error);
  }
};
  const removeItem = async (productId)=>{
    try {
   await axios.delete(`${BASE_URL}/cart/${productId}`);
      loadCart();
   } catch (error) {
      console.log(error);
    }
  };
 const handleCheckout = () => {
navigate("/checkout");
  };

  const totalPrice = cartItems.reduce(
  (total, item) =>
  total + item.productId.price * item.quantity,
    0
  );

  return (
    <>
     <Navbar />
<div className="cart-container">
  <h2 className="cart-title">Your Cart</h2>
  {cartItems.length === 0 ? (
          <p className="cart-empty">No items in cart</p>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item)=>(
                <div className="cart-card" key={item.productId._id}>

                 <img
  className="image"
  src={item.productId.image}  
  alt=""
/>
                  <div className="cart-details">
                    <h3>{item.productId.name}</h3>
                    <p>₹ {item.productId.price}</p>

                    <div className="qty-controls">
                      <button onClick={() => decreaseQty(item.productId._id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.productId._id)}>+</button>
                    </div>
                  </div>

                  <button
                    className="btn"
                    onClick={() => removeItem(item.productId._id)}
                  >
                    Remove
                  </button>

                </div>

                ))}

            </div>

            <div className="cart-summary">
              <h3>Total: ₹ {totalPrice}</h3>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}

      </div>
    </>
  );
}

export default Cart;