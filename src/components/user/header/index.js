import React, { useState } from 'react';

import './index.css';
import './global.css';

import logo from '../../../assets/images/ic_logo.png';
import search_icon from '../../../assets/vectors/ic_search.svg';
import ic_login from '../../../assets/vectors/ic_login_header.svg';
import ic_cart from '../../../assets/vectors/ic_cart_header.svg';
import ic_instruct from '../../../assets/vectors/ic_instruct_header.svg';
import ic_phone from '../../../assets/vectors/ic_phone_header.svg';

import ModalCart from '../cart/index'; // Import component ModalCart

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="header">
      <img
        className="header-child"
        loading="lazy"
        alt=""
        src={logo}
      />
      <div className="header-button">
        <div className="header-icon-wrapper">
          <img className="header-wrapper-icon" alt="" src="./public/wrapper@2x.png" />
        </div>
        {/* <div className="header-text">
          <p className="header-xem-gi-tn">Xem giá, tồn kho tại:</p>
          <p className="header-h-ni">
            <b className="header-h-ni1">Hà Nội</b>
          </p>
        </div> */}
      </div>
      <div className="header-input-parent">
        <div className="header-input">
          <div className="header-input-addon-left">
            <div className="header-wrapper">
              <div className="header-addon-left"></div>
            </div>
          </div>
          <div className="header-input1">
            <img
              className="header-input-prefix-icon"
              alt=""
              src={search_icon}
            />
            <div className="header-input2">Bạn cần tìm kiếm sản phẩm gì?</div>
            <img
              className="header-input-suffix-icon"
              alt=""
              src="./public/inputsuffix@2x.png"
            />
          </div>
          <div className="header-input-addon-right">
            <img
              className="header-icon-wrapper1"
              alt=""
              src="./public/iconwrapper@2x.png"
            />
          </div>
        </div>
        <button className="header-button1">
          <div className="header-icon-wrapper2">
            <img className="header-wrapper-icon1" alt="" src="./public/wrapper-1@2x.png" />
          </div>
          <a className="header-text1">Tìm kiếm</a>
        </button>
      </div>
      <div className="header-frame-parent">
        <button className="header-button-wrapper">
          <div className="header-button2">
            <div className="header-icon-wrapper3">
              <img className="header-wrapper-icon2" alt="" src={ic_login} />
            </div>
            <a className="header-text2" href='/user/login'>Đăng nhập</a>
          </div>
        </button>
        <button className="header-button3" onClick={openModal}>
          <div className="header-icon-wrapper4">
            <img className="header-wrapper-icon3" alt="" src={ic_cart} />
          </div>
          <a className="header-text3">Giỏ hàng</a>
        </button>
        <button className="header-button4">
          <div className="header-icon-wrapper5">
            <img className="header-wrapper-icon4" alt="" src={ic_instruct} />
          </div>
          <a className="header-text4">Hướng dẫn</a>
        </button>
        <button className="header-button5">
          <div className="header-icon-wrapper6">
            <img className="header-wrapper-icon5" alt="" src={ic_phone} />
          </div>
          <a className="header-text5">Hotline</a>
        </button>
      </div>
      <ModalCart isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default Header;
