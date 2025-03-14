import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../user/home/Footer';
import Header from '../../user/home/Header';
import Promote from '../promote/index';

import './global.css';
import './index.css';
import logo from '../../../assets/images/ic_logo.png';
import ic_google from '../../../assets/vectors/ic_google.svg';

const LoginForm = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('https://ecom-amwn.onrender.com/api/public/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: phone, password }),
      });
  
      if (!response.ok) {
        const text = await response.text();
        let errorMessage = "Sai tài khoản hoặc mật khẩu";
        if (text) {
          try {
            const data = JSON.parse(text);
            errorMessage = data.message || errorMessage;
          } catch (e) {
            console.error("Response không phải JSON:", text);
          }
        }
        throw new Error(errorMessage);
      }
  
      // Nếu response hợp lệ
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.userName);  // Lưu userName
  
      // 🔥 Phát sự kiện khi đăng nhập thành công
      window.dispatchEvent(new Event("user-login"));
  
      navigate('/home');
  
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div>
      <Header />
      <Promote />
      <div className="user-login-container">
        <div className="user-login-left">
          <img className="user-login-bg-child" loading="lazy" alt="" src={logo} />
        </div>
        <div className="user-login-right">
          <form className="user-login-quanby-solutions-inc" onSubmit={handleLogin}>
            <p className="user-login-ng-nhp">Đăng nhập</p>

            {error && <p className="user-login-error-message">{error}</p>}

            <div className="user-login-input">
              <input
                className="user-login-placeholder"
                placeholder="Nhập tài khoản"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="user-login-input1">
              <input
                className="user-login-placeholder"
                placeholder="Nhập mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="user-login-button1">
              <div className="user-login-text1">Đăng nhập</div>
            </button>

            <div className="user-login-forgot-password">
              <a href="/forgot-password" className="user-login-text2">Quên mật khẩu?</a>
            </div>

            <div className="user-login-input-fields">
              <span>Bạn chưa có tài khoản?</span>
              <a href="/register" className="user-login-text2">Đăng ký</a>
            </div>

            <div className="user-login-input-fields1">
              <div className="user-login-hoc">Hoặc</div>
            </div>

            <div className="user-login-social-buttons">
              <button className="user-login-button5">
                <div className="user-login-icon-wrapper7">
                  <img className="user-login-ico-google-icon" alt="" src={ic_google} />
                </div>
                <div className="user-login-text4">Tiếp tục với Google</div>
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginForm;
