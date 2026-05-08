import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import "./Category.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { label: "Air Conditioners", value: "AC", img: "/assets/Ac.jpg" },
  { label: "Mobiles", value: "Mobile", img: "/assets/mobile.jpg" },
  { label: "Audio", value: "EarPods", img: "/assets/earpods.jpg" },
  { label: "Televisions", value: "Tv", img: "/assets/TV.jpg" },
  { label: "Tablets", value: "Tablet", img: "/assets/tablet.jpg" },
  { label: "Smart Wearables", value: "Watch", img: "/assets/watch.jpg" },
  { label: "Laptops", value: "Laptop", img: "/assets/laptop.jpg" },
  { label: "Refrigerators", value: "Refrigerator", img: "/assets/refrigertor.jpg" },
  { label: "Washing Machine", value: "ws", img: "/assets/ws.jpg" },
];

function Category() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const fetchProducts = async (category) => {

    try {

      const res = await axios.get(
        `${BASE_URL}/products/category/${category}`
      );

      setProducts(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <div>

      <div className="categories">

        {categories.map((cat, i) => (

          <div
            className="category"
            key={i}
            onClick={() => fetchProducts(cat.value)}
          >

            <img src={cat.img} alt={cat.label} />

            <p>{cat.label}</p>

          </div>

        ))}

      </div>

      <div className="product-grid">

        {products.map((p) => (

          <div
            className="product-card"
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
          >

            <img src={p.image} alt={p.name} />

            <h4>{p.name}</h4>

            <p>₹ {p.price}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Category;