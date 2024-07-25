
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './global.css';
import './index.css';

import ic_homepage from '../../../assets/vectors/slider/ic_homepage.svg';
import ic_danhmuc from '../../../assets/vectors/slider/ic_danhmuc.svg';
import ic_product from '../../../assets/vectors/slider/ic_product.svg';
import ic_brand from '../../../assets/vectors/slider/ic_brand.svg';
import ic_account from '../../../assets/vectors/slider/ic_manage_account.svg';
import ic_user from '../../../assets/vectors/slider/ic_customer.svg';
import ic_post from '../../../assets/vectors/slider/ic_post.svg';
import ic_order from '../../../assets/vectors/slider/ic_order.svg';
import ic_grocery from '../../../assets/vectors/slider/ic_grocery.svg';
import ic_lighting from '../../../assets/vectors/slider/ic_lighting.png';
import ic_footer from '../../../assets/vectors/slider/ic_footer.svg';
import ic_promote from '../../../assets/vectors/slider/ic_promote.svg';
import ic_voucher from '../../../assets/vectors/slider/ic_voucher.svg';
import ic_bottom from '../../../assets/vectors/slider/ic_bottom.svg';


const Sider = () => {

  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState(false);

  const handleAccountManagementClick = () => {
    // Navigate to /admin/home
    navigate('/admin/home');
    // Set active state immediately
    setActiveMenuItem(true);
  };

  const handleCustomerManagementClick = () => {
    // Điều hướng đến trang quản lý khách hàng
    navigate('/admin/list-customer');
    // Đánh dấu menu active
    setActiveMenuItem(false); // Nếu muốn đánh dấu active khi click vào "Quản lý khách hàng"
  };

  const handleOrderManagementClick = () => {
    navigate('/admin/list-order');
    setActiveMenuItem(false);
  };


  return (
    <div className="slider-siderdefault">
      <section className="slider-menulogo">
        <div className="slider-logo">
          <img className="slider-frame-icon" alt="" src="./public/frame.svg" />
          <div className="slider-ant-design-pro">Ant Design Pro</div>
        </div>
        <div className="slider-menu">
          <div className="slider-inline-menu-itemtop-levelleg1">
            <div className="slider-inner-wrapper1">
              <div className="slider-title-wrapper1">
                <div className="slider-icon-wrapper-container">
                  <img
                    className="slider-icon-wrapper1"
                    loading="lazy"
                    alt=""
                    src={ic_homepage}
                  />
                </div>
                <div className="slider-title">Trang chủ</div>
              </div>
            </div>
          </div>
          <div className="slider-inline-menu-itemtop-levelleg1">
            <div className="slider-inner-wrapper1">
              <div className="slider-title-wrapper1">
                <div className="slider-icon-wrapper-container">
                  <img
                    className="slider-icon-wrapper1"
                    loading="lazy"
                    alt=""
                    src={ic_danhmuc}
                  />
                </div>
                <div className="slider-div">Quản lý danh mục</div>
              </div>
            </div>
          </div>
          <div className="slider-inline-menu-itemtop-levelleg2">
            <div className="slider-inner-wrapper2">
              <div className="slider-title-wrapper2">
                <div className="slider-icon-wrapper-frame">
                  <img
                    className="slider-icon-wrapper2"
                    alt=""
                    src={ic_product}
                  />
                </div>
                <div className="slider-div1">Quản lý sản phẩm</div>
              </div>
            </div>
          </div>
          <div className="slider-inline-menu-itemtop-levelleg2">
            <div className="slider-inner-wrapper2">
              <div className="slider-title-wrapper2">
                <div className="slider-icon-wrapper-frame">
                  <img
                    className="slider-icon-wrapper2"
                    alt=""
                    src={ic_brand}
                  />
                </div>
                <div className="slider-div1">Quản lý thương hiệu</div>
              </div>
            </div>
          </div>
          {/* <div className="slider-inline-menu-itemtop-levelleg2" onClick={handleAccountManagementClick}>
            <div className="slider-inner-wrapper2">
              <div className="slider-title-wrapper2">
                <div className="slider-icon-wrapper-frame">
                  <img
                    className="slider-icon-wrapper2"
                    alt=""
                    src={ic_account}
                  />
                </div>
                <div className="slider-div1">Quản lý tài khoản</div>
              </div>
            </div>
          </div> */}


          <div
            className={`slider-inline-menu-itemtop-levelleg2 ${activeMenuItem ? 'active' : ''}`}
            onClick={handleAccountManagementClick}
          >
            <div className="slider-inner-wrapper2">
              <div className="slider-title-wrapper2">
                <div className="slider-icon-wrapper-frame">
                  <img className="slider-icon-wrapper2" alt="" src={ic_account} />
                </div>
                <div className="slider-div1">Quản lý tài khoản</div>
              </div>
            </div>
          </div>

          <div
            className="slider-inline-menu-itemtop-levelleg5"
            onClick={handleCustomerManagementClick}
          >
            <div className="slider-inner-wrapper5">
              <div className="slider-title-wrapper5">
                <div className="slider-icon-wrapper-wrapper2">
                  <img
                    className="slider-icon-wrapper5"
                    loading="lazy"
                    alt=""
                    src={ic_user}
                  />
                </div>
                <div className="slider-div4">Quản lý khách hàng</div>
              </div>
            </div>
          </div>
        
          <div className="slider-inline-menu-itemtop-levelleg7"
            onClick={handleOrderManagementClick}>
            <div className="slider-inner-wrapper7">
              <div className="slider-title-wrapper7">
                <div className="slider-icon-wrapper-wrapper4">
                  <img
                    className="slider-icon-wrapper7"
                    loading="lazy"
                    alt=""
                    src={ic_order}
                  />
                </div>
                <div className="slider-title1">Quản lý đơn hàng</div>
              </div>
            </div>
          </div>

          <div className="slider-inline-menu-itemtop-levelleg6">
            <div className="slider-parent">
              <div className="slider-inner-wrapper6">
                <div className="slider-title-wrapper6">
                  <div className="slider-icon-wrapper-wrapper3">
                    <img
                      className="slider-icon-wrapper6"
                      loading="lazy"
                      alt=""
                      src={ic_post}
                    />
                  </div>
                  <div className="slider-div5">Quản lý bài đăng</div>
                </div>
                <div className="slider-menu-iconant-menu-submenu-arr-wrapper">
                  <img
                    className="slider-menu-iconant-menu-submenu-arr"
                    loading="lazy"
                    alt=""
                    src="./public/menuiconantmenusubmenuarrowup@2x.png"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="slider-inline-menu-itemtop-levelleg8">
            <div className="slider-inner-wrapper8">
              <div className="slider-title-wrapper8">
                <div className="slider-icon-wrapper-wrapper5">
                  <img
                    className="slider-icon-wrapper8"
                    loading="lazy"
                    alt=""
                    src={ic_grocery}
                  />
                </div>
                <div className="slider-title2">Quản lý đại lý</div>
              </div>
            </div>
          </div>
          <div className="slider-inline-menu-itemtop-levelleg9">
            <div className="slider-inner-wrapper9">
              <div className="slider-title-wrapper9">
                <div className="slider-icon-wrapper-wrapper6">
                  <img
                    className="slider-icon-wrapper9"
                    loading="lazy"
                    alt=""
                    src={ic_footer}
                  />
                </div>
                <div className="slider-title3">Quản lý footer</div>
              </div>
            </div>
          </div>
          <div className="slider-inline-menu-itemtop-levelleg10">
            <div className="slider-inner-wrapper10">
              <div className="slider-title-wrapper10">
                <div className="slider-icon-wrapper-wrapper7">
                  <img
                    className="slider-icon-wrapper10"
                    loading="lazy"
                    alt=""
                    src={ic_lighting}
                  />
                </div>
                <div className="slider-title4">Quản lý Flash Sale</div>
              </div>
            </div>
          </div>
          <div className="slider-inline-menu-itemtop-levelleg11">
            <div className="slider-inner-wrapper11">
              <div className="slider-title-wrapper11">
                <div className="slider-icon-wrapper-wrapper8">
                  <img
                    className="slider-icon-wrapper11"
                    loading="lazy"
                    alt=""
                    src={ic_promote}
                  />
                </div>
                <div className="slider-title5">Quản lý CT khuyến mãi</div>
              </div>
            </div>
          </div>
          <div className="slider-inline-menu-itemtop-levelleg12">
            <div className="slider-inner-wrapper12">
              <div className="slider-title-wrapper12">
                <div className="slider-icon-wrapper-wrapper9">
                  <img
                    className="slider-icon-wrapper12"
                    loading="lazy"
                    alt=""
                    src={ic_voucher}
                  />
                </div>
                <div className="slider-title6">Quản lý voucher</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="slider-sider-trigger">
        <img
          className="slider-inner-wrapper-icon"
          loading="lazy"
          alt=""
          src={ic_bottom}
        />
      </div>
    </div>
  );
};

export default Sider;
