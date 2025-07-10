import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './index.css';
import './global.css';
// import PageNavigate from '../page_navigate';

const AddUserForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    userName: '',
    password: '',
    role: 'ROLE_USER' // Mặc định là ROLE_USER
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Thêm log để kiểm tra
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const newUser = {
        email: user.email,
        userName: user.userName,
        password: user.password,
        listRoles: [user.role] // Chỉ gửi role dưới dạng mảng như mong muốn của Spring Boot
      };

      console.log('Sending user data:', newUser);

      const response = await axios.post('http://localhost:9090/api/public/signup', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Server response:', response);
      // Xử lý khi thêm thành công
      navigate('/admin/home'); // Chuyển hướng đến trang danh sách người dùng sau khi thêm thành công
    } catch (error) {
      console.error('Failed to add user:', error);
      // Xử lý khi thêm thất bại
    }
  };

  return (
      
      <form className="root-account" onSubmit={handleSubmit}>
        <div className="vertical-form-iteminput">
          <div className="label">
            <div className="empty-labels">*</div>
            <a className="title">Email</a>
          </div>
          <div className="input">
            <div className="input-addonlabel">
              <div className="wrapper">
                <div className="text">http://</div>
              </div>
            </div>
            <div className="input1">
              <img className="input-prefix-icon" alt="" src="" />
              <input
                className="input2"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Nhập email"
                type="text"
                required
              />
              <img className="input-suffix-icon" alt="" src="" />
            </div>
            <div className="input-addonicon">
              <img className="icon-wrapper" alt="" src="" />
            </div>
          </div>
        </div>
        <div className="vertical-form-iteminput1">
          <div className="label1">
            <div className="div">*</div>
            <div className="title1">Tên tài khoản</div>
          </div>
          <div className="input3">
            <div className="input-addonlabel1">
              <div className="wrapper1">
                <div className="text1">http://</div>
              </div>
            </div>
            <div className="input4">
              <img className="input-prefix-icon1" alt="" src="" />
              <input
                className="input5"
                name="userName"
                value={user.userName}
                onChange={handleChange}
                placeholder="Nhập tài khoản"
                type="text"
                required
              />
              <img className="input-suffix-icon1" alt="" src="" />
            </div>
            <div className="input-addonicon1">
              <img className="icon-wrapper1" alt="" src="" />
            </div>
          </div>
        </div>
        <div className="vertical-form-iteminput2">
          <div className="label2">
            <div className="div1">*</div>
            <div className="title2">Mật khẩu</div>
          </div>
          <div className="input6">
            <div className="input-addonlabel2">
              <div className="wrapper2">
                <div className="text2">http://</div>
              </div>
            </div>
            <div className="input7">
              <img className="input-prefix-icon2" alt="" src="" />
              <input
                className="placeholder"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                type="text"
                required
              />
              <img className="input-suffix-icon2" alt="" src="" />
            </div>
            <div className="input-addonicon2">
              <img className="icon-wrapper2" alt="" src="" />
            </div>
          </div>
        </div>
        <div className="vertical-form-iteminput3">
          <div className="label3">
            <div className="div2">*</div>
            <div className="title3">Nhóm quyền</div>
          </div>
          <select
            className="select"
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            <option value="ROLE_USER">ROLE_USER</option>
            {/* Thêm các option khác nếu có */}
          </select>
        </div>
        <button className="button" type="submit">
          <div className="icon-wrapper3">
            <img className="wrapper-icon" alt="" src="" />
          </div>
          <div className="text3">Lưu</div>
        </button>
      </form>

  );
};

export default AddUserForm;
