// LoginForm.js

import React from 'react';

import Footer from '../footer/index';
import Header from '../header/index';
import Promote from '../promote/index';

import './global.css'; 
import './index.css'; 
import logo from '../../../assets/images/ic_logo.png'
import ic_gmail from '../../../assets/vectors/ic_gmail_login.svg'
import ic_zalo from '../../../assets/vectors/ic_zalo.svg'
import ic_google from '../../../assets/vectors/ic_google.svg'
import ic_facebook from '../../../assets/vectors/ic_facebook_login.svg'

const LoginForm = () => {
  return (
    <div>
      <Header/>
      <Promote/>
      <div className="user-login-container">
        <div className="user-login-left">
          <img className="user-login-bg-child" loading="lazy" alt="" src={logo} />
        </div>
        <div className="user-login-right">
          <form className="user-login-quanby-solutions-inc">
            <a className="user-login-ng-nhp">Đăng nhập</a>
            <div className="user-login-input">
              <div className="user-login-input-addon-left">
                <div className="user-login-wrapper">
                  <div className="user-login-addon-left">https://</div>
                </div>
              </div>
              <div className="user-login-account-info">
                <img className="user-login-input-prefix-icon" alt="" src="./public/inputprefix@2x.png" />
                <input className="user-login-placeholder" placeholder="Nhập số điện thoại" type="text" />
                <img className="user-login-input-suffix-icon" alt="" src="./public/inputsuffix@2x.png" />
              </div>
              <div className="user-login-input-addon-right">
                <img className="user-login-icon-wrapper" alt="" src="./public/iconwrapper@2x.png" />
              </div>
            </div>
            <div className="user-login-input1">
              <div className="user-login-input-addon-left1">
                <div className="user-login-wrapper1">
                  <div className="user-login-addon-left1">https://</div>
                </div>
              </div>
              <div className="user-login-input-prefix-parent">
                <img className="user-login-input-prefix-icon1" alt="" src="./public/inputprefix@2x.png" />
                <input className="user-login-placeholder1" placeholder="Mật khẩu" type="text" />
                <img className="user-login-input-suffix-icon1" alt="" src="./public/inputsuffix@2x.png" />
              </div>
              <div className="user-login-input-addon-right1">
                <img className="user-login-icon-wrapper1" alt="" src="./public/iconwrapper-1@2x.png" />
              </div>
            </div>
            <div className="user-login-button-wrapper">
              <div className="user-login-button2">
                <div className="user-login-icon-wrapper4">
                  <img className="user-login-wrapper-icon2" alt="" src="./public/wrapper-2@2x.png" />
                </div>
                <div className="user-login-text2">Quên mật khẩu?</div>
              </div>
            </div>
            <button className="user-login-button1">
              <div className="user-login-icon-wrapper3">
                <img className="user-login-wrapper-icon1" alt="" src="./public/wrapper-1@2x.png" />
              </div>
              <div className="user-login-text1">Đăng nhập</div>
            </button>
            <div className="user-login-input-fields">
              <div className="user-login-bn-cha-c">Bạn chưa có tài khoản?</div>
              <div className="user-login-button2">
                <div className="user-login-icon-wrapper4">
                  <img className="user-login-wrapper-icon2" alt="" src="./public/wrapper-2@2x.png" />
                </div>
                <div className="user-login-text2">Đăng ký</div>
              </div>
            </div>
            <div className="user-login-input-fields1">
              <div className="user-login-hoc">Hoặc</div>
            </div>
            <div className="user-login-social-buttons">
              <div className="user-login-button3">
                <div className="user-login-icon-wrapper5">
                  <img className="user-login-mail-icon" alt="" src={ic_gmail} />
                </div>
                <div className="user-login-social-label">Đăng nhập bằng Email</div>
              </div>
              <button className="user-login-button4">
                <div className="user-login-icon-wrapper6">
                  <img className="user-login-ico-zalo-icon" alt="" src={ic_zalo} />
                </div>
                <div className="user-login-text3">Tiếp tục với Zalo</div>
              </button>
              <button className="user-login-button5">
                <div className="user-login-icon-wrapper7">
                  <img className="user-login-ico-google-icon" alt="" src={ic_google} />
                </div>
                <div className="user-login-text4">Tiếp tục với Google</div>
              </button>
              <button className="user-login-button6">
                <div className="user-login-icon-wrapper8">
                  <img className="user-login-facebook-icon" alt="" src={ic_facebook} />
                </div>
                <div className="user-login-text5">Tiếp tục với Facebook</div>
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default LoginForm;
