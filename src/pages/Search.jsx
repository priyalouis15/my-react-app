import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api";
import "./Search.css";
function Search() {

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [products, setProducts] = useState([]);
  useEffect(() => {

    if (!query) return;

    axios.get(`${BASE_URL}/search?q=${query}`)
      .then((res) => {
        setProducts(res.data);
      });

  }, [query]);



return (
  <div className="search-container">

    <h2 className="search-title">
      Search Results for "{query}"
    </h2>

    <div className="product-grid">

      {products.map((p) => (
        <div key={p._id} className="product-card">

          <img
            src={p.image}
            alt={p.name}
            className="product-image"
          />

          <h4 className="product-name">{p.name}</h4>

          <p className="product-price">₹ {p.price}</p>

          <button
            className="btn cart-btn"
            onClick={async () => {
              await axios.post(`${BASE_URL}/cart`, {
                productId: p._id
              });
              alert("Added to cart");
            }}
          >
            Add to Cart
          </button>

          <button
            className="btn buy-btn"
            onClick={() => {
              navigate("/checkout", {
                state: {
                  buyNowItem: {
                    productId: p._id,
                    quantity: 1
                  }
                }
              });
            }}
          >
            Buy Now
          </button>

        </div>
      ))}

    </div>

  </div>
);
}

export default Search;