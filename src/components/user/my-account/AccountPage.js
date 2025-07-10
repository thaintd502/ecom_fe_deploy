import React, { useState } from "react";
import AccountSidebar from "./AccountSidebar";
import AccountProfile from "./AccountProfile";
// import AccountAddresses from "./AccountAddresses";
import AddressForm from "./AddressForm";
import AccountChangePassword from "./AccountChangePassword";
import "./AccountPage.css";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="account-page">
      <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="account-content">
        {activeTab === "profile" && <AccountProfile />}
        {/* {activeTab === "addresses" && <AccountAddresses />} */}
        {/* {activeTab === "addresses" && <AddressForm />} */}
        {activeTab === "password" && <AccountChangePassword />}
      </div>
    </div>
  );
};

export default AccountPage;
