import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Otp.css";
import Navbar from "../components/Navbar";
import BASE_URL from "../api";
function Otp() {

  const [otp, setOtp]=useState("");
  const [error, setError]=useState("");

  const navigate= useNavigate();
  const location =useLocation();

  const email =location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const handleVerify =async(e) =>{
    e.preventDefault();

    if (!otp){
      setError("Please enter OTP");
      return;
       }

    try {
      await axios.post(`${BASE_URL}/verify-otp`,{
        email,
        otp
      });

      localStorage.setItem("userEmail", email);

      alert("Login successful");


      window.location.href = "/";

    } catch (err) {
      setError("Invalid OTP");
    }
  };

  return (
    <>
      <Navbar />

      <div className="otp-container">

        <div className="otp-box">

        <h2>OTP Verification</h2>
        <p>Enter OTP sent to:</p>
         <p className="email-text">{email}</p>
          <form onSubmit={handleVerify}>

           <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="otp-input"
            />

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="verify-btn">
              Verify OTP
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default Otp;