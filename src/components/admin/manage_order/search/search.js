import React, { useState } from 'react';

import './global.css';
import './index.css';

import ic_search from '../../../../assets/vectors/ic_search.svg';
import ic_arrow from '../../../../assets/vectors/ic_arrow.svg';

const OrderSearch = ({ onSearch }) => {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [orderId, setOrderId] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (newStartDate <= endDate || !endDate) {
      setStartDate(newStartDate);
    } else {
      alert('Start date must be less than or equal to end date');
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (newEndDate >= startDate || !startDate) {
      setEndDate(newEndDate);
    } else {
      alert('End date must be greater than or equal to start date');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ startDate, endDate, orderId, customerPhone });
  };

  return (
    <div className="order-search-root">
      <div className="order-search-title">
        <a className="order-search-text">Tìm kiếm đơn hàng</a>
      </div>
      <div className="order-search-page-content">
        <form className="order-search-order-form" onSubmit={handleSearch}>
          <div className="order-search-order-form-fields">
            <div className="order-search-thi-gian-n">Thời gian đơn hàng tạo</div>
            <div className="order-search-date-picker">
              <div className="order-search-input">
                <input
                  className="order-search-date1"
                  type="date"
                  value={startDate}
                  max={today}
                  onChange={handleStartDateChange}
                />
              </div>
              <div className="order-search-input-seperatorpicker-separat">
                <img className="order-search-swapright-icon" alt="" src={ic_arrow} />
              </div>
              <div className="order-search-input1">
                <input
                  className="order-search-date2"
                  type="date"
                  value={endDate}
                  max={today}
                  onChange={handleEndDateChange}
                />
              </div>
            </div>
          </div>
          <div className="order-search-order-form-fields1">
            <a className="order-search-m-n-hng">Mã đơn hàng</a>
            <div className="order-search-input3">
              <input
                className="order-search-placeholder"
                placeholder="Nhập mã đơn hàng"
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
          </div>
          <div className="order-search-order-form-fields2">
            <a className="order-search-khch-hng">Khách hàng</a>
            <div className="order-search-input5">
              <input
                className="order-search-placeholder1"
                placeholder="Số điện thoại của khách hàng"
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
          </div>
          <button className="order-search-button" type="submit">
            <div className="order-search-icon-wrapper2">
              <img className="order-search-wrapper-icon" alt="" src={ic_search} />
            </div>
            <div className="order-search-text3">Tìm kiếm</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderSearch;
