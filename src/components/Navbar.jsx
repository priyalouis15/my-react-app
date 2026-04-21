import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {

  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

 
  useEffect(() => {

    const updateUser = () => {
      setUser(localStorage.getItem("userEmail"));
    };

    updateUser();

    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
    };

  }, []);

  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${search}`);
  };

 
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUser(null);
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="navbar">

      <div className="nav-logo">
        <h2>Reliance<span>digital</span></h2>
      </div>

      
      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Products & Brands"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

     
      <div className="nav-right">

        <div className="top-links">
          <p>Orders</p>
          <p>Contact us</p>
        </div>

        <div className="icons">

        
          <div className="icon-box">
            <FaShoppingCart />
            <Link to="/cart">Cart</Link>
          </div>

          
          <div className="icon-box">
            <FaHeart />
            <span>Wishlist</span>
          </div>

          
          <div className="icon-box">
            <FaUser />

            {!user ? (
              <Link to="/login">Login</Link>
            ) : (
              <>
                <Link to="/profile" style={{ marginRight: "10px" }}>
                  Profile
                </Link>

                <span
                  onClick={handleLogout}
                  style={{ cursor: "pointer", color: "red" }}
                >
                  Logout
                </span>
              </>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;