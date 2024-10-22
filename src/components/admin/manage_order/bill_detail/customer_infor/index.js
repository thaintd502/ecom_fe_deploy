import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './index.css';
import './global.css';

const CustomerInfo = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    city: '',
    district: '',
    commune: '',
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage

        const orderResponse = await fetch(`http://34.92.164.246:9090/api/v1/orders/${orderId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the Authorization header
          }
        });

        if (orderResponse.ok) {
          const orderData = await orderResponse.json();

          setOrder(prevState => ({
            ...prevState,
            name: orderData.name,
            phone: orderData.phone,
            email: orderData.email,
            address: orderData.address,
            commune: orderData.commune,
            district: orderData.district,
            city: orderData.city,

          }));

       
      } else {
        alert('Failed to fetch customer data.');
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
      alert('Failed to fetch customer data. Please try again later.');
    }
  };
  fetchCustomerData();
}, [orderId]);


if (!order) {
  return <div>Loading...</div>;
}


return (
  <div className='order-detail-customer-info'>
    <h3>Thông tin người đặt hàng</h3>
    <div className="order-detail-customer-infor-vertical-form-iteminput-parent">
      <div className="order-detail-customer-infor-vertical-form-iteminput">
        <div className="order-detail-customer-infor-label">
          <div className="order-detail-customer-infor-placeholder-label">*</div>
          <div className="order-detail-customer-infor-title">Họ tên</div>
        </div>
        <div className="order-detail-customer-infor-input">
          <div className="order-detail-customer-infor-input-addonlabel">
            <div className="order-detail-customer-infor-wrapper">
              <div className="order-detail-customer-infor-text">http://</div>
            </div>
          </div>
          <div className="order-detail-customer-infor-input1">
            <input
              className="order-detail-customer-infor-placeholder"
              name="name"
              value={order.name}
              placeholder="Nhập họ tên đầy đủ"
              type="text"
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="order-detail-customer-infor-vertical-form-iteminput1">
        <div className="order-detail-customer-infor-label1">
          <div className="order-detail-customer-infor-middle-label-placeholders">*</div>
          <div className="order-detail-customer-infor-title1">Số điện thoại</div>
        </div>
        <div className="order-detail-customer-infor-input2">
          <div className="order-detail-customer-infor-input-addonlabel1">
            <div className="order-detail-customer-infor-wrapper1">
              <div className="order-detail-customer-infor-text1">http://</div>
            </div>
          </div>
          <div className="order-detail-customer-infor-input3">
            <input
              className="order-detail-customer-infor-placeholder1"
              name="phone"
              value={order.phone}
              placeholder="Nhập số điện thoại"
              type="text"
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="order-detail-customer-infor-vertical-form-iteminput2">
        <div className="order-detail-customer-infor-label2">
          <div className="order-detail-customer-infor-title2">Email</div>
        </div>
        <div className="order-detail-customer-infor-input4">
          <div className="order-detail-customer-infor-input-addonlabel2">
            <div className="order-detail-customer-infor-wrapper2">
              <div className="order-detail-customer-infor-text2">http://</div>
            </div>
          </div>
          <div className="order-detail-customer-infor-input5">
            <input
              className="order-detail-customer-infor-placeholder2"
              name="email"
              value={order.email}
              placeholder="Nhập email"
              type="text"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>

    <div className="order-detail-customer-infor-a-ch">Địa chỉ</div>
    <div className="order-detail-customer-infor-vertical-form-iteminput-container">
      <div className="order-detail-customer-infor-vertical-form-iteminput5">
        <div className="order-detail-customer-infor-label5">
          <div className="order-detail-customer-infor-div">*</div>
          <div className="order-detail-customer-infor-title6">Tỉnh / Thành phố</div>
        </div>
        <select name="city" className="order-detail-customer-infor-select1" value={order.city} readOnly>
          <option value="">Chọn Tỉnh / Thành phố</option>
          <option value="HaNoi">Hà Nội</option>
          <option value="HCM">TP. Hồ Chí Minh</option>
        </select>
      </div>
      <div className="order-detail-customer-infor-vertical-form-iteminput6">
        <div className="order-detail-customer-infor-label6">
          <div className="order-detail-customer-infor-div1">*</div>
          <div className="order-detail-customer-infor-title8">Quận / Huyện</div>
        </div>
        <select name="district" className="order-detail-customer-infor-select1" value={order.district} readOnly>
          <option value="">Chọn Quận / Huyện</option>
          <option value="Quan1">Quận 1</option>
          <option value="Quan2">Quận 2</option>
          <option value="Quan3">Quận 3</option>
        </select>
      </div>
    </div>
    <div className="order-detail-customer-infor-vertical-form-iteminput7">
      <div className="order-detail-customer-infor-label7">
        <div className="order-detail-customer-infor-div2">*</div>
        <div className="order-detail-customer-infor-title10">Xã / Phường</div>
      </div>
      <select name="commune" className="order-detail-customer-infor-select1" value={order.commune} readOnly>
        <option value="">Chọn Xã / Phường</option>
        <option value="Phuong1">Phường 1</option>
        <option value="Phuong2">Phường 2</option>
        <option value="Phường Phạm Ngũ Lão">Phường Phạm Ngũ Lão</option>
      </select>
    </div>
    <div className="order-detail-customer-infor-vertical-form-iteminput-wrapper">
      <div className="order-detail-customer-infor-vertical-form-iteminput8">
        <div className="order-detail-customer-infor-label8">
          <div className="order-detail-customer-infor-div3">*</div>
          <div className="order-detail-customer-infor-title12">Địa chỉ chi tiết</div>
        </div>
        <input
          name="address"
          className="order-detail-customer-infor-select4"
          placeholder="Số nhà, tên ngõ, ngách, đường,..."
          value={order.address}
          readOnly
        />
      </div>
    </div>
  </div>
);
};

export default CustomerInfo;
