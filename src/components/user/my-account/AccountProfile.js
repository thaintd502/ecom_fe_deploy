import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./AccountProfile.css";

const AccountProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        customerId: "", 
        name: "",
        email: "",
        phone: "",
        birthdate: "",
        gender: "",
        userName: "",
        imageUrl: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:9090/api/public/customer", {
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                if (!response.ok) {
                    throw new Error("Lỗi khi lấy dữ liệu");
                }
    
                const data = await response.json();
    
                // Chuyển đổi birthdate về định dạng YYYY-MM-DD
                const formattedBirthdate = data.birthdate ? data.birthdate.split(" ")[0] : ""; 
    
                setProfile({
                    ...data,
                    birthdate: formattedBirthdate, // Gán lại birthdate với định dạng hợp lệ
                });
    
                setImagePreview(data.image);
            } catch (error) {
                console.error("Lỗi tải thông tin hồ sơ:", error);
            }
        };
        fetchProfile();
    }, []);
    

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile({ ...profile, imageUrl: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("customerId", profile.customerId);
        formData.append("name", profile.name);
        formData.append("phone", profile.phone);
        formData.append("gender", profile.gender);
    
        // Nếu birthdate không rỗng/null thì mới gửi lên server
        if (profile.birthdate) {
            formData.append("birthdate", profile.birthdate);
        }
    
        // Nếu có ảnh mới và là File thì mới gửi lên server
        if (profile.imageUrl && profile.imageUrl instanceof File) {
            formData.append("imageUrl", profile.imageUrl);
        }
    
        try {
            const response = await fetch(`http://localhost:9090/api/public/edit-customer/${profile.customerId}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` }, 
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error("Lỗi cập nhật hồ sơ");
            }
    
            alert("Cập nhật thành công!");
            navigate("/account");
        } catch (error) {
            alert(error.message);
        }
    };
    

    return (
        <div className="account-profile">
            <h2>📄 Hồ Sơ Của Tôi</h2>
            <form onSubmit={handleUpdateProfile}>
                <div className="profile-avatar">
                    <img src={imagePreview || "/default-avatar.png"} alt="Avatar" />
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                <div className="profile-info">
                    <p className="profile-info-username">Tên đăng nhập: {profile.userName}</p>

                    <label>Họ và Tên:</label>
                    <input type="text" name="name" value={profile.name} onChange={handleChange} required />

                    <label>Email:</label>
                    <input type="email" name="email" value={profile.email}  />

                    <label>Số Điện Thoại:</label>
                    <input type="text" name="phone" value={profile.phone} onChange={handleChange} required />

                    <label>Ngày Sinh:</label>
                    <input type="date" name="birthdate" value={profile.birthdate} onChange={handleChange} />

                    <label>Giới Tính:</label>
                    <select name="gender" value={profile.gender} onChange={handleChange}>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>

                <button type="submit">Cập Nhật</button>
            </form>
        </div>
    );
};

export default AccountProfile;
