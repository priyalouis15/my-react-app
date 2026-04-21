import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../components/Navbar";
import BASE_URL from "../api";
const Profile = () => {

  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {

    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);

    if (storedEmail) {
      fetch(`${BASE_URL}/my-orders/${storedEmail}`)
        .then(res => res.json())
        .then(data => {
          console.log("ORDERS:", data);
          setOrders(data);
        })
        .catch(err => console.log(err));
    }

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  if (!email) return <h2 style={{ textAlign: "center" }}>Please login first</h2>;

  return (
    <>
    <Navbar />

      <div className="profile-container">

       
        <div className="sidebar">
          <h2>User</h2>
          <p>{email}</p>

          <ul>
            <li
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              My Profile
            </li>

            <li
              className={activeTab === "orders" ? "active" : ""}
              onClick={() => setActiveTab("orders")}
            >
              My Orders
            </li>

            <li className="logout" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>

       
        <div className="profile-content">

         
          {activeTab === "profile" && (
            <>
              <h2>Profile Information</h2>

              <div className="info">
                <div>
                  <label>Email</label>
                  <p>{email}</p>
                </div>
              </div>
            </>
          )}

         
          {activeTab === "orders" && (
            <>
              <h2>My Orders</h2>

              {orders.length === 0 ? (
                <p>No orders found</p>
              ) : (
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Products</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>

                        <td>
                          {order.items.map((item, index) => (
                            <div key={index} className="order-item">

                            
                              <img
                                src={item.productId?.image}
                                alt=""
                                className="order-img"
                              />

                              <p>
                                {item.productId?.name} (x{item.quantity})
                              </p>

                            </div>
                          ))}
                        </td>

                        <td>₹ {order.totalAmount}</td>
                        <td>{order.orderStatus}</td>

                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

        </div>

      </div>
    </>
  );
};

export default Profile;