import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://34.92.164.246:9090/api/public/auth/signin', {
        username: phone,
        password,
      });
      
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirect or show success message
      alert('Đăng nhập thành công!');
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      alert('Đăng nhập thất bại!');
    }
  };

  return (
    <div className="member-col member-right">
      <form autoComplete="off" onSubmit={handleLogin}>
        <div className="form-subtitle">Đăng nhập</div>
        
        <div className="form-outline">
          <input
            inputMode="decimal"
            type="tel"
            className="form-input form-u"
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            value={phone}
            onChange={handlePhoneChange}
          />
          <label htmlFor="form-user" className="form-label">Nhập số điện thoại</label>
          <div className="outline-border phone">
            <div className="outline-border-leading"></div>
            <div className="outline-border-middle"></div>
            <div className="outline-border-tailing"></div>
          </div>
        </div>

        <div className="form-outline">
          <input
            type={showPassword ? "text" : "password"}
            className="form-input form-p"
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            value={password}
            onChange={handlePasswordChange}
          />
          <label htmlFor="form-pass" className="form-label">Mật khẩu</label>
          <div className="outline-border">
            <div className="outline-border-leading"></div>
            <div className="outline-border-middle"></div>
            <div className="outline-border-tailing"></div>
          </div>
          <span className="toggle-view show" onClick={togglePasswordVisibility}>
            <i className="fa fa-eye"></i>
          </span>
          <div className="slash"></div>
        </div>

        <div className="form-outline forgot">
          <a className="forgot-btn" href="/account/forgot">Quên mật khẩu?</a>
        </div>

        <button type="submit" className="login-btn">Đăng nhập</button>

        <div className="form-nav-btn login">
          <span>Bạn chưa có tài khoản? <a className="reg-btn" href="/account/register">Đăng ký</a></span>
        </div>

        <div className="form-devider">
          <p className="devider-title">Hoặc</p>
        </div>

        <a className="login-type-btn">
          <div><img className="icon" src="/images/account_site/email.svg" alt="email icon"/> Đăng nhập bằng email</div>
        </a>
        <a className="login-type-btn" href="/login/social.aspx/zalo?url=/">
          <div><img className="icon" src="/images/account_site/zalo.svg" alt="zalo icon"/> Tiếp tục với Zalo</div>
        </a>
        <a className="signin-openID google gg-btn" href="/login/social.aspx/google?url=/">
          <div><img className="icon" src="/images/account_site/google.svg" alt="google icon"/> Tiếp tục với Google</div>
        </a>
        <a className="signin-openID facebook fb-btn" href="/login/social.aspx/facebook?url=/">
          <div><img className="icon" src="/images/account_site/facebook.svg" alt="facebook icon"/> Tiếp tục với Facebook</div>
        </a>
      </form>
    </div>
  );
};

export default Login;
