import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SimpleNavbar from "../components/SimpleNavbar";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:3001/product/${id}`)
      .then(res => {
        console.log("PRODUCT DATA:", res.data);
        setProduct(res.data);
      })
      .catch(err => {
        console.log("ERROR:", err);
        setProduct(null);
      });

  }, [id]);

  const addToCart = async () => {
    try {
      await axios.post("http://localhost:3001/cart", {
        productId: product._id
      });
      alert("Added to cart successfully");
    } catch (error) {
      console.log("CART ERROR:", error.response?.data || error.message);
      alert("Error adding to cart");
    }
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        buyNowItem: {
          productId: product._id,
          quantity: 1
        }
      }
    });
  };

  if (!product) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  }

  return (
    <>
      <SimpleNavbar />

      <div style={{ textAlign: "center", marginTop: "30px", padding: "20px" }}>

        
        <img
          src={product.image}
          width="400"
          alt={product.name}
          style={{ borderRadius: "10px" }}
        />

        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>₹ {product.price}</h3>

        <button
          onClick={addToCart}
          style={{
            padding: "15px 120px",
            background: "#1b563d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "15px"
          }}
        >
          Add to Cart
        </button>

        <br />

        <button
          onClick={handleBuyNow}
          style={{
            padding: "15px 120px",
            background: "#ff6f00",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Buy Now
        </button>

      </div>
    </>
  );
}

export default ProductDetails;