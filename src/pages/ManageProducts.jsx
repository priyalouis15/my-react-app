import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageProducts.css";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import SimpleNavbar from "../components/SimpleNavbar";
function ManageProducts() {

const navigate = useNavigate();

const editProduct = (product) => {
  navigate("/addproducts", { state: product });
};
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3001/products");
    setProducts(res.data);
  };

 


const deleteProduct = async (id) => {

  try {

    await axios.delete(`http://localhost:3001/deleteproduct/${id}`);

    alert("Product deleted successfully");

    fetchProducts();

  } catch (error) {

    console.log(error);

  }

};


return (
    <div className="manage-container">
      <h2>Manage Products</h2>

      <table className="product-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (

            <tr key={product._id}>

              <td>
              <img
  src={product.image}
  alt="product"
  width="90"
/>
              </td>

              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>

              <td>
              <button
  className="edit-btn"
  onClick={() => editProduct(product)}
>
  Edit
</button>
                <button
  className="delete-btn"
  onClick={() => deleteProduct(product._id)}
>
  Delete
</button>
              </td>

            </tr>

          ))}
        </tbody>

      </table>

    </div>
  );
}

export default ManageProducts;