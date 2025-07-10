import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css"; // Nhớ import file CSS

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // ✅ Trạng thái loading
    const [otpSent, setOtpSent] = useState(false); // ✅ Trạng thái khi OTP đã được gửi


    const handleForgotPassword = async () => {
        setMessage("");
        setError("");
        setLoading(true); // ✅ Bắt đầu hiển thị "Đang gửi OTP..."

        if (!email.trim()) {
            setError("Vui lòng nhập email!");
            setLoading(false); // ❌ Dừng loading nếu lỗi
            return;
        }

        try {
            const response = await fetch("http://localhost:9090/api/public/forgot-password?email=" + email, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const text = await response.text(); // API trả về text

            if (response.ok) {
                setMessage(
                    <>
                        OTP đã được gửi tới email của bạn. <br />
                        Vui lòng kiểm tra hộp thư đến hoặc spam. <br />
                        Đang chuyển trang...
                    </>
                );
                setOtpSent(true); // ✅ Cập nhật trạng thái đã gửi OTP
                setTimeout(() => {
                    navigate("/verify-otp", { state: { email } }); // ✅ Chuyển trang & truyền email sang VerifyOtp
                }, 6000); // Chờ 2s hiển thị thông báo rồi chuyển trang
            } else {
                setError(text);
            }
        } catch (err) {
            setError("Lỗi kết nối đến server!");
        }

        setLoading(false); // ✅ Ẩn "Đang gửi OTP..."
    };

    return (
        <div className="forgot-password-container">
            <h2 className="forgot-password-title">Quên mật khẩu</h2>
            <p className="forgot-password-description">Nhập email của bạn để nhận mã OTP</p>

            <input
                className="forgot-password-input"
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button className="forgot-password-button"
                onClick={handleForgotPassword}
                disabled={loading || otpSent} 
            >
                {otpSent ? "Đã gửi OTP" : loading ? "Đang gửi OTP..." : "Gửi OTP"}
            </button>


            {message && <p className="forgot-password-success">{message}</p>}
            {error && <p className="forgot-password-error">{error}</p>}
        </div>
    );
};

export default ForgotPassword;
