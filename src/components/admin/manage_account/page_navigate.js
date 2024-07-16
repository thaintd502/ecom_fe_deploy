import React from 'react';

import './index.css';

const PageNavigate = () => {

  
  return (
    <div className="page-header">
      <div className="breadcrumb">
        <div className="st-item">
          <div className="st-item-label">Trang chủ</div>
        </div>
        <div className="componentsseparator">
          <div className="separator">/</div>
        </div>
        <div className="last-item">
          <div className="last-item-label">Quản lý tài khoản</div>
        </div>
      </div>
      <div className="heading-left">
        <div class="title2">
          <div class="pagination-content">Quản lý tài khoản</div>
        </div>
      </div>
    </div>
  );
};

export default PageNavigate;
