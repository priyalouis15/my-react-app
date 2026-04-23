import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Category from "./Category";
import Carousel from "./carousel";
import ProductCard from "./ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import "./Home.css";

function Home() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

 const images = [
  {
    image: "https://kreowebsite.s3.ap-south-1.amazonaws.com/Reliance%20Digital-08.jpg62223",
    link: "/product/1"
  },
  {
    image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1774447613864.jpeg",
    link: "/product/2"
  },
  {
    image: "https://img.magicpin.com/Analytics/content/reliance_digital_merchant_cb.png", // ✅ fixed
    link: "/product/3"
  }
];
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="home">

      <Navbar />

      <Category />

      <Carousel images={images} />

      <h2 className="title">Special Deals</h2>

      <div className="card-container">

        {products.map((item) => (

          <div key={item._id} onClick={() => handleClick(item._id)}>

            <ProductCard
              name={item.name}
              price={item.price}
              image={item.image}
            />

          </div>

        ))}

      </div>

      <Footer />

    </div>
  );
}

export default Home;