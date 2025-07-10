import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // ✅ Nhận email từ trang Verify OTP
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    setMessage("");
    setError("");

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError("Vui lòng nhập mật khẩu mới!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9090/api/public/reset-password?email=${email}&newPassword=${newPassword}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const text = await response.text();

      if (response.ok) {
        setMessage(text);
        setTimeout(() => {
          navigate("/login"); // ✅ Chuyển về trang Login sau khi đổi mật khẩu thành công
        }, 2000);
      } else {
        setError(text);
      }
    } catch (err) {
      setError("Lỗi kết nối đến server!");
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-title">Đặt lại mật khẩu</h2>
      <p className="reset-password-description">
        Nhập mật khẩu mới cho tài khoản của bạn
        {/* <strong>{email}</strong> */}
      </p>

      <input
        className="reset-password-input"
        type="password"
        placeholder="Nhập mật khẩu mới"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <input
        className="reset-password-input"
        type="password"
        placeholder="Xác nhận mật khẩu mới"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className="reset-password-button" onClick={handleResetPassword}>
        Đặt lại mật khẩu
      </button>

      {message && <p className="reset-password-success">{message}</p>}
      {error && <p className="reset-password-error">{error}</p>}
    </div>
  );
};

export default ResetPassword;
