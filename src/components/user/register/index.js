import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await fetch("https://ecom-amwn.onrender.com/api/public/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          userName: formData.userName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng ký thất bại!");
      }

      alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Đăng ký</h2>
      {error && <p className="register-error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="register-form-group">
          <label className="register-label">Họ và tên</label>
          <input className="register-input" type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="register-form-group">
          <label className="register-label">Tài khoản</label>
          <input className="register-input" type="text" name="userName" value={formData.userName} onChange={handleChange} required />
        </div>
        <div className="register-form-group">
          <label className="register-label">Email</label>
          <input className="register-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="register-form-group">
          <label className="register-label">Số điện thoại</label>
          <input className="register-input" ype="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="register-form-group">
          <label className="register-label">Mật khẩu</label>
          <input className="register-input" type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="register-form-group">
          <label className="register-label">Xác nhận mật khẩu</label>
          <input className="register-input" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit" className="register-button">Đăng ký</button>
      </form>
      <p className="register-login-link">
        Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
      </p>
    </div>
  );
};

export default RegisterForm;
