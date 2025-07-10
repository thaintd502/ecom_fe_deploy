import React, { useState } from "react";
import "./AccountChangePassword.css";

const AccountChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await fetch("http://localhost:9090/api/public/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: new URLSearchParams({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      const result = await response.text();
      if (response.ok) {
        setMessage("🎉 Đổi mật khẩu thành công!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage(`❌ ${result}`);
      }
    } catch (error) {
      setMessage("❌ Lỗi khi đổi mật khẩu, vui lòng thử lại!");
    }
  };

  return (
    <div className="account-change-password">
      <h2 className="account-change-password__title">🔒 Đổi Mật Khẩu</h2>
      {message && <p className="account-change-password__message">{message}</p>}
      <form className="account-change-password__form" onSubmit={handleChangePassword}>
        <div className="account-change-password__group">
          <label className="account-change-password__label">Mật khẩu cũ:</label>
          <input
            type="password"
            className="account-change-password__input"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="account-change-password__group">
          <label className="account-change-password__label">Mật khẩu mới:</label>
          <input
            type="password"
            className="account-change-password__input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="account-change-password__group">
          <label className="account-change-password__label">Xác nhận mật khẩu mới:</label>
          <input
            type="password"
            className="account-change-password__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="account-change-password__button">Cập nhật</button>
      </form>
    </div>
  );
};

export default AccountChangePassword;
