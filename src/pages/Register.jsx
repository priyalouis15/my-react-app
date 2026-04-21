import "./Register.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SimpleNavbar from "../components/SimpleNavbar";
function Register() {
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const handleVerify = async () => {
  if (!otp) {
    setError("Enter OTP");
    return;
  }

  try {
    await axios.post("http://127.0.0.1:3001/verify-otp", {
      email,
      otp,
    });

   
    localStorage.setItem("userEmail", email);

    alert("Login successful");

   
    window.location.href = "/";

  } catch (err) {
    setError("Invalid OTP");
  }
};
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-right">
          <h1>Enter OTP</h1>
          <p>OTP sent to: {email}</p>

          <input
            type="text"
            placeholder="Enter 4-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button onClick={handleVerify}>
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;