import "./Admin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "priya25@gmail.com" && password === "admin123") {
      navigate("/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="admin-container">

      <div className="admin-box">

        <h1>Admin Login</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter your Email"
            className="admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
           type="password"
            placeholder="Enter your Password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="admin-btn">
            Proceed
          </button>

        </form>

      </div>

    </div>
  );
}

export default Admin;