import "./AddProducts.css";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleNavbar from "../components/SimpleNavbar";

function AddProducts() {
const BASE_URL = "https://full-stack-reliance-digital-website.onrender.com";
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state || null;
  const [file, setFile] = useState(null);

  const [product, setProduct] = useState({
    name: editData?.name || "",
    description: editData?.description || "",
    price: editData?.price || "",
    quantity: editData?.quantity || "",
    category: editData?.category || ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("quantity", product.quantity);
  formData.append("category", product.category);

  if (file) {
    formData.append("image", file);
  }

  try {
    if (editData && editData._id) {
     
      await axios.put(
        `${BASE_URL}/updateproduct/${editData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      alert("Product Updated Successfully");
    } else {
     
      await axios.post(
        `${BASE_URL}/addproduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      alert("Product Added Successfully");
    }

    navigate("/manage-products");

  } catch (error) {
    console.log(error);
    alert("Error saving product");
  }
};
  return (
    <>
      <SimpleNavbar />
      <div className="container">
        <h2>{editData ? "Edit Product" : "Add Product"}</h2>

        <form onSubmit={handleSubmit}>

          <label>Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} />

          <label>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} />

          <label>Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} />

          <label>Quantity</label>
          <input type="number" name="quantity" value={product.quantity} onChange={handleChange} />

          <label>Category</label>
          <select name="category" value={product.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option>Electronics</option>
            <option>Mobile</option>
            <option>Laptop</option>
              <option>Tv</option>
               <option>Watch</option>
                <option>Refrigerator</option>
                  <option>Tablet</option>
                    <option>AC</option>
                      <option>EarPods</option>
                        <option>ws</option>
          </select>

          <label>Product Image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <button type="submit">
            {editData ? "Update Product" : "Add Product"}
          </button>

        </form>
      </div>
    </>
  );
}

export default AddProducts;