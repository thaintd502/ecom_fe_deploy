import React from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';
import './index.css';

import ic_logo from '../../../assets/images/ic_logo_nobg.png';
import ic_user from '../../../assets/vectors/ic_login_header.svg';
import ic_bell from '../../../assets/vectors/ic_bell.svg';

const Header = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('roles');
    navigate('/admin/login');
  };

  return (
    <div className="header-admin-header">
      <div className="header-admin-image">
        <img
          className="header-admin-height-icon"
          loading="lazy"
          alt=""
          src={ic_logo}
        />
        <div className="header-admin-width">
          <div className="header-admin-width-value"></div>
          <div className="header-admin-width-value1"></div>
        </div>
      </div>
      <div className="header-admin-toolbar">
        <div className="header-admin-select">
          <div className="header-admin-selection-item">
            <div className="header-admin-title">Chọn khu vực</div>
          </div>
          <div className="header-admin-icon">
            <img className="header-admin-icon1" alt="" src="./public/icon.svg" />
          </div>
        </div>
        <div className="header-admin-icon-wrapper">
          <img
            className="header-admin-questioncircle-icon"
            alt=""
            src="./public/questioncircle.svg"
          />
        </div>
        <div className="header-admin-badgeon-icon">
          <div className="header-admin-icon2">
            <img
              className="header-admin-bell-icon"
              loading="lazy"
              alt=""
              src={ic_bell}
            />
          </div>
          {/* <div className="header-admin-badge-wrapper">
            <div className="header-admin-offset-">
              <div className="header-admin-badgecount">
                <div className="header-admin-badge">
                  <a className="header-admin-number">11</a>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="header-admin-layoutblockshorizontal2">
          <div className="header-admin-icon-wrapper1">
            <img
              className="header-admin-user-icon"
              loading="lazy"
              alt=""
              src={ic_user}
            />
          </div>
          <div className="header-admin-texttext-wrapper">
            <div className="header-admin-texttext">
              <a className="header-admin-user-content">{userName}</a>
            </div>
          </div>
        </div>
        <div className="header-admin-icon-wrapper2">
          <img className="header-admin-language-icon" alt="" src="./public/language.svg" />
        </div>
        <button className="header-admin-logout-button" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Header;
