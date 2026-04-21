import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import "./Log.css";
import Navbar from "../components/Navbar";

function Login() {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (!validator.isEmail(value)) {
      setEmailError("Enter valid Email!");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return;

    try {
      await axios.post("http://localhost:3001/login", { email });

      alert("OTP sent to your email");

      navigate("/otp", { state: { email } });

    } catch (err) {
      console.log(err);
      alert("Server error or backend not running");
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-container">

        <div className="login-box">

        
          <div className="login-left">
            <div className="info">
              <h2>Manage Your Orders</h2>
              <p>Track your orders and returns easily with our platform.</p>
            </div>
          </div>

          <div className="login-right">

            <h1>Login</h1>
            <p>Enter email to receive OTP</p>

            <form onSubmit={handleSubmit}>

              <input
                className="email-field"
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => validateEmail(e.target.value)}
                required
              />

              {emailError && <p className="error-text">{emailError}</p>}

              <button type="submit" className="proceed-btn">
                Proceed
              </button>

            </form>

            <p className="bottom-text">
              New user? <Link to="/register">Register</Link>
            </p>

            <p className="bottom-text">
              Are you admin? <Link to="/admin">Admin</Link>
            </p>

          </div>

        </div>

      </div>
    </>
  );
}

export default Login;