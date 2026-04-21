import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Search() {

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q");

  const [products, setProducts] = useState([]);

  useEffect(() => {

    if (!query) return;

    axios.get(`http://localhost:3001/search?q=${query}`)
      .then((res) => {
        setProducts(res.data);
      });

  }, [query]);

  return (
    <div style={{ padding: "40px" }}>

      <h2>Search Results for "{query}"</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

        {products.map((p) => (

          <div key={p._id} style={{ width: "220px" }}>

            {/* ✅ FIXED IMAGE */}
            <img
              src={p.image}
              width="150"
              alt={p.name}
            />

            <h4>{p.name}</h4>
            <p>₹ {p.price}</p>

            <button
              onClick={async () => {
                await axios.post("http://localhost:3001/cart", {
                  productId: p._id
                });
                alert("Added to cart");
              }}
            >
              Add to Cart
            </button>

            <button
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