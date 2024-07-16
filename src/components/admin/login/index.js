import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './global.css';
import './index.css';

import ic_logo from '../../../assets/images/ic_logo_nobg.png';
import ic_lock from '../../../assets/vectors/ic_lock_login.svg';
import ic_user from '../../../assets/vectors/ic_user_login.svg';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:9090/api/v1/signin', { userName: phone, password });
      const { token, userName, listRoles } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
      localStorage.setItem('roles', JSON.stringify(listRoles));

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      if (listRoles.includes('ROLE_ADMIN')) {
        navigate('/admin/home');
      } else {
        alert('Access denied: You do not have the necessary role to access this page.');
      }
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="admin-login">
      <img className="admin-login-child" loading="lazy" alt="" src={ic_logo} />
      <h2 className="admin-login-ng-nhp-h">Đăng nhập hệ thống</h2>
      <div className="admin-login-inputs">
        <div className="admin-login-inputlargenormalfalsetrue">
          <div className="admin-login-placeholder">
            <img className="admin-login-input-prefix-icon" loading="lazy" alt="" src={ic_user} />
            <input
              className="admin-login-input"
              type="text"
              placeholder="Nhập tài khoản"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
        </div>
        <div className="admin-login-inputlargenormalfalsetrue1">
          <div className="admin-login-placeholder2">
            <img className="admin-login-input-prefix-icon1" loading="lazy" alt="" src={ic_lock} />
            <input
              className="admin-login-input"
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
      </div>
      <div className="admin-login-checkbox">
        <div className="admin-login-checkbox-input-wrapper">
          <input className="admin-login-checkbox-input" type="checkbox" />
        </div>
        <div className="admin-login-label">Ghi nhớ</div>
      </div>
      <button className="admin-login-button" onClick={handleLogin}>
        <div className="admin-login-icon-wrapper">
          <img className="admin-login-wrapper-icon" alt="" src="./public/wrapper@2x.png" />
        </div>
        <div className="admin-login-text">Đăng nhập</div>
      </button>
    </div>
  );
};

export default Login;
