import { Link } from "react-router-dom";
import "./SimpleNavbar.css";

function SimpleNavbar() {
  return (
    <div className="rd-navbar">

      <div className="rd-logo">
        <h2>Reliance Digital</h2>
      </div>

      <div className="rd-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin</Link>
      </div>

    </div>
  );
}

export default SimpleNavbar;