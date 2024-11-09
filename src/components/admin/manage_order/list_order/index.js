import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import OrderSearch from '../search/search';
import './global.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://34.92.164.246:9090/api/admin/get-all-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      axios.delete(`http://34.92.164.246:9090/api/admin/delete-order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.status === 200) {
            setOrders(orders.filter(order => order.orderId !== orderId));
            setFilteredOrders(filteredOrders.filter(order => order.orderId !== orderId));
          }
        })
        .catch(error => {
          console.error('Có lỗi xảy ra khi xóa đơn hàng:', error);
        });
    }
  };

  const handleAddNewOrder = () => {
    navigate('/admin/add-order');
  };

  const handleSearch = (searchCriteria) => {
    const { startDate, endDate, orderId, customerPhone } = searchCriteria;
    const filtered = orders.filter(order =>
      (!startDate || new Date(order.orderDate) >= new Date(startDate)) &&
      (!endDate || new Date(order.orderDate) <= new Date(endDate)) &&
      (!orderId || order.orderId.toString().includes(orderId)) &&
      (!customerPhone || order.customerPhone.includes(customerPhone))
    );
    setFilteredOrders(filtered);
  };

  const handleStatusChange = (orderId, newStatus) => {
    axios.put(`http://34.92.164.246:9090/api/admin/update-order-status/${orderId}`, { status: newStatus }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        // Update the local state to reflect the new status
        const updatedOrders = orders.map(order =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
      })
      .catch(error => {
        console.error('Failed to update order status:', error);
      });
  };



  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value).replace('₫', 'đ');
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  };

  const handleRowClick = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const statusOptions = [
    { value: "Chờ xác nhận", className: "pending" },
    { value: "Đã xác nhận", className: "confirmed" },
    { value: "Đang đóng hàng", className: "packaging" },
    { value: "Chờ chuyển hàng", className: "waiting-shipment" },
    { value: "Đang vận chuyển", className: "shipping" },
    { value: "Đang giao", className: "delivering" },
    { value: "Đã nhận", className: "received" },
    { value: "Hoàn hàng", className: "returning" },
    { value: "Đã hủy", className: "canceled" },
  ];

  return (
    <div>
      <OrderSearch onSearch={handleSearch} />
      <div className="table-toolbar">
        <div className="title2">
          <div className="pagination-content2">Danh sách đơn hàng</div>
        </div>
        <div className="right">
          <div className="filter-group">
            <div className="icon-wrapper">
              <img className="wrapper-icon" alt="" src="./public/wrapper@2x.png" />
            </div>
            <button className="text6">Thiết lập phân quyền</button>
          </div>
          <div className="filter-group">
            <button className="text6" onClick={handleAddNewOrder}>+ Thêm mới</button>
          </div>
        </div>
      </div>
      <div className='table'>
        <table className='table-order'>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Tên khách hàng</th>
              <th>Số điện thoại</th>
              <th>Thời gian</th>
              <th>Tổng tiền</th>
              <th>Phí vận chuyển</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order.orderId}>
                <td>
                  <a href={`/admin/bill-details/${order.orderId}`}>00000{order.orderId}</a>
                </td>
                <td>{order.customerName}</td>
                <td>{order.customerPhone}</td>
                <td>{formatDate(order.orderDate)}</td>
                <td>{formatCurrency(order.totalAmount)}</td>
                <td>{formatCurrency(order.shippingFee)}</td>
                <td>
                  <div className={`select-container ${statusOptions.find(option => option.value === order.status)?.className}`}>
                    <select
                      className="select-no-arrow"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
