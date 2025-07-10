import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Giới thiệu */}
        <div className="footer-section">
          <h3>Về chúng tôi</h3>
          <p>Chúng tôi cung cấp các sản phẩm điện tử chất lượng cao với giá tốt nhất.</p>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div className="footer-section">
          <h3>Liên kết</h3>
          <ul>
            <li><Link to="/home">Trang chủ</Link></li>
            <li><Link to="/home">Sản phẩm</Link></li>
            <li><Link to="/about">Giới thiệu</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div className="footer-section">
          <h3>Liên hệ</h3>
          <p>📍 Địa chỉ: Hà Nội</p>
          <p>📞 Hotline: 0123 456 789</p>
          <p>📧 Email: public.net.vn@gmail.com</p>
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div className="footer-bottom">
        <p>&copy; 2025 E-Commerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
