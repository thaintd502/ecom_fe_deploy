import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "../../../components/user/home/Header.js";
import Footer from "../../../components/user/home/Footer.js";
import HomePage from "./HomePage.js";
import "./index.css";
import FilterPage from "./FilterPage.js";
import CategoryPage from "./CategoryPage.js";
import ProductDetail from "./ProductDetail.js";
import CartPage from "./CartPage.js";
import Order from "./Order.js";
import PaymentSuccessPage from "./PaymentSuccessPage.js";
import UserRegister from "../register/index.js";
import AddAddressPage from "./AddAddressPage.js";
import OrdersPage from "../orders/OrdersPage.js";
import OrderDetail from "../orders/OrderDetail.js";
import SearchResults from "./SearchResults.js";
import ForgotPassword from "../forgot-password/ForgotPassword.js";
import VerifyOtp from "../forgot-password/VerifyOtp.js";
import ResetPassword from "../forgot-password/ResetPassword.js";
import AccountPage from "../my-account/AccountPage.js";
import NotificationBox from "../../websocket/NotificationBox.js";

const Home = () => {

  return (
    <div className="app-container">
      <Header />

      <FilterPage />

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/add-address" element={<AddAddressPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/order/:orderId" element={<OrderDetail />} />
        <Route path="/search" element={<SearchResults />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/verify-otp" element={<VerifyOtp />} /> 
        <Route path="/reset-password" element={<ResetPassword />} /> 
        <Route path="/account" element={<AccountPage />} /> 

        <Route path="/notify" element={<NotificationBox />} /> 

      </Routes>
      <Footer />
    </div>
  );
};

export default Home;
