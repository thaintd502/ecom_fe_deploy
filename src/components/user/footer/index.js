import React from 'react';
// import './global.css';
// import './index.css';
// import './public/logosfacebook.svg'; // Import hình ảnh
// import './public/icon-of-zalo-1.svg';

import zalo_svg from '../../../assets/vectors/ic_zalo.svg'
import facebook_svg from '../../../assets/vectors/ic_facebook_footer.svg'


function Footer() {
  return (
    <div className="footer">
      <section className="support">
        <div className="purchase-support">
          <b className="tng-i-h">Tổng đài hỗ trợ</b>
          <div className="contact-numbers">
            <div className="mua-hng-000">📞 Mua hàng: (000) 0000 0000</div>
            <div className="bo-hnh-000-container">
              <span>📞 </span>
              <span className="bo-hnh-000">Bảo hành: (000) 0000 0000</span>
            </div>
          </div>
        </div>
        <div className="customer-support">
          <a className="h-tr-khch">Hỗ trợ khách hàng</a>
          <div className="support-links">
            <div className="khiu-ni-bi">Khiếu nại bồi thường</div>
            <div className="hng-dn-thanh">Hướng dẫn thanh toán</div>
            <div className="hng-dn-mua">Hướng dẫn mua hàng</div>
            <div className="ho-n-gtgt">Hoá đơn GTGT điện tử</div>
            <div className="chnh-sch-v">Chính sách và Quy định chung</div>
            <div className="chnh-sch-bn">
              Chính sách bán hàng & Chất lượng hàng hoá
            </div>
            <div className="chnh-sch-vn">Chính sách vận chuyển - Giao nhận</div>
            <div className="chnh-sch-i">Chính sách Đổi - Trả hàng hoá</div>
            <div className="chnh-sch-bo">Chính sách Bảo hành</div>
          </div>
        </div>
        <div className="account-management">
          <a className="qun-l-ti">Quản lý tài khoản</a>
          <div className="account-actions">
            <div className="thay-i-thng">Thay đổi thông tin</div>
            <div className="ly-li-mt">Lấy lại mật khẩu</div>
            <div className="lch-s-mua">Lịch sử mua hàng</div>
            <div className="qun-l-gi">Quản lý giỏ hàng</div>
          </div>
        </div>
        <div className="social">
          <a className="kt-ni-vi">Kết nối với chúng tôi</a>
          <div className="social-links">
            <div className="platforms">
              <img
                className="logosfacebook-icon"
                loading="lazy"
                alt=""
                src={facebook_svg}
              />

              <a className="facebook">Facebook</a>
            </div>
            <div className="platforms1">
              <img
                className="icon-of-zalo-1"
                loading="lazy"
                alt=""
                src={zalo_svg}
              />

              <a className="zalo">Zalo</a>
            </div>
          </div>
        </div>
      </section>
      <div className="chodienmay2023">ChoDienMay@2023</div>
    </div>
  );
}

export default Footer;
