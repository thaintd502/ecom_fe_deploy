import React from "react";
import { useNavigate } from "react-router-dom";
import "./AccountSidebar.css";

const AccountSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="account-sidebar">
      <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Hồ sơ</button>
      {/* <button className={activeTab === "addresses" ? "active" : ""} onClick={() => setActiveTab("addresses")}>Địa chỉ</button> */}
      <button className={activeTab === "password" ? "active" : ""} onClick={() => setActiveTab("password")}>Đổi mật khẩu</button>
    </div>
  );
};

export default AccountSidebar;
