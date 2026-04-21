import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./pages/Checkout";

import Dashboard from "./pages/Dashboard";
import AddProducts from "./pages/AddProducts";
import Home from "./Home/Home";
import Login from "./pages/Login";

import Admin from "./pages/Admin";
import ManageProducts from "./pages/ManageProducts";
import ProductDetails from "./pages/ProductDetails";
  import EditOrder from "./pages/EditOrder";
import Cart from "./pages/Cart";
import ManageOrder from "./pages/ManageOrder"
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Search from "./pages/Search";
  import ManageUser from "./pages/ManageUser";

import Profile from "./pages/Profile";
import Otp from "./pages/Otp";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
     
        <Route path="/profile" element={<Profile />} />
         <Route path="/checkout" element={<Checkout />} />
     
       
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProducts />} />
        <Route path="/manageproducts" element={<ManageProducts />} />
      

<Route path="/otp" element={<Otp />} /> 

<Route path="/manageuser" element={<ManageUser />} />
        
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />       
         <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<OrderSuccess />} />
            <Route path="/search" element={<Search />} />
        <Route path="/edit-order/:id" element={<EditOrder />} />
<Route path="/manageorder" element={<ManageOrder />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;