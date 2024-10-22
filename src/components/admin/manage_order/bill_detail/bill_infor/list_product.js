import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductList = () => {

  const { orderId } = useParams();

  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
  
        const orderResponse = await fetch(`http://34.92.164.246:9090/api/v1/orders/${orderId}/details`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the Authorization header
          }
        });
  
        if (orderResponse.ok) {
          const orderData = await orderResponse.json();
          setOrderDetails(orderData); // Update the state with the data
        } else {
          alert('Failed to fetch order details data.');
        }
      } catch (error) {
        console.error('Error fetching order details data:', error);
        alert('Failed to fetch order details data. Please try again later.');
      }
    };
    fetchOrderDetails();
  }, [orderId]);
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value).replace('₫', 'đ');
  };


  return (

    <form className="page">

      <h3 className='order-detail-list-product-title' >Danh sách sản phẩm</h3>

      <div className='table'>
        <table className='table-customer'>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((order, index) => (
              <tr key={order.orderDetailId}>
                <td>{index + 1}</td>
                <td>{order.productCode}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{formatCurrency(order.totalAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default ProductList;