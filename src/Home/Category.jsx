import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import "./Category.css";

const categories = [
  { name: "Air Conditioners", img: "/assets/Ac.jpg" },
  { name: "Mobiles", img: "/assets/mobile.jpg" },
  { name: "Audio", img: "/assets/earpods.jpg" },
  { name: "Televisions", img: "/assets/TV.jpg" },
  { name: "Tablets", img: "/assets/tablet.jpg" },
  { name: "Smart Wearables", img: "/assets/watch.jpg" },
  { name: "Laptops", img: "/assets/laptop.jpg" },
  { name: "Refrigerators", img: "/assets/refrigertor.jpg" },
  { name: "Washing Machine", img: "/assets/ws.jpg" },
];

function Category() {

  const [products, setProducts] = useState([]);

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
            onClick={() => fetchProducts(cat.name)}
          >
            <img src={cat.img} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

   
      <div className="product-grid">
        {products.map(p => (
          <div className="product-card" key={p._id}>
            <img src={p.image} alt="" />
            <h4>{p.name}</h4>
            <p>₹ {p.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Category;