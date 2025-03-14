import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./AddAddressPage.css";

const AddAddressPage = () => {
    const [address, setAddress] = useState("");
    const [commune, setCommune] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("Việt Nam");
    const navigate = useNavigate();

    const handleSaveAddress = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập để thêm địa chỉ!");
            navigate("/login");
            return;
        }
    
        if (!address || !commune || !district || !city) {
            alert("Vui lòng nhập đầy đủ thông tin địa chỉ!");
            return;
        }
    
        // Lấy addressId nếu có (có thể từ API trước đó)
        const existingAddress = JSON.parse(localStorage.getItem("customerAddress")) || {}; 
        const newAddress = {
            addressId: existingAddress.addressId || null,  // Nếu có addressId thì gửi, nếu không thì null
            address,
            commune,
            district,
            city,
            country,
        };
    
        try {
            const response = await fetch("https://ecom-amwn.onrender.com/api/public/save-customer-address", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newAddress),
            });
    
            if (response.ok) {
                const updatedAddress = await response.json();
                localStorage.setItem("customerAddress", JSON.stringify(updatedAddress)); // Lưu lại địa chỉ mới
                alert("Đã lưu địa chỉ thành công!");
                navigate("/order"); // Quay lại trang đặt hàng
            } else {
                alert("Lưu địa chỉ thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi lưu địa chỉ:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };
    
    return (
        <div className="add-address-container">
            <h2>Thêm địa chỉ mới</h2>
            <div className="address-form">
                <label>Địa chỉ:</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

                <label>Phường/Xã:</label>
                <input type="text" value={commune} onChange={(e) => setCommune(e.target.value)} />

                <label>Quận/Huyện:</label>
                <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} />

                <label>Thành phố:</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

                <label>Quốc gia:</label>
                <input type="text" value={country} disabled />

                <button onClick={handleSaveAddress}>Lưu địa chỉ</button>
            </div>
        </div>
    );
};

export default AddAddressPage;
