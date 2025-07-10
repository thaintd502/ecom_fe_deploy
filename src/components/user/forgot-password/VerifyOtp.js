import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./VerifyOtp.css";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // ✅ Nhận email từ trang Forgot Password
  const [otpCode, setOtpCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleVerifyOtp = async () => {
    setMessage("");
    setError("");

    if (!otpCode.trim()) {
      setError("Vui lòng nhập mã OTP!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9090/api/public/verify-otp?email=${email}&otpCode=${otpCode}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const text = await response.text();

      if (response.ok) {
        setMessage(text);
        setTimeout(() => {
          navigate("/reset-password", { state: { email } }); // ✅ Chuyển sang Reset Password + gửi email
        }, 2000);
      } else {
        setError(text);
      }
    } catch (err) {
      setError("Lỗi kết nối đến server!");
    }
  };

  return (
    <div className="verify-otp-container">
      <h2 className="verify-otp-title">Xác nhận OTP</h2>
      <p className="verify-otp-description">
        Nhập mã OTP được gửi đến email 
        {/* <strong>{email}</strong> */}
      </p>

      <input
        className="verify-otp-input"
        type="text"
        placeholder="Nhập mã OTP"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
      />

      <button className="verify-otp-button" onClick={handleVerifyOtp}>
        Xác nhận OTP
      </button>

      {message && <p className="verify-otp-success">{message}</p>}
      {error && <p className="verify-otp-error">{error}</p>}
    </div>
  );
};

export default VerifyOtp;
