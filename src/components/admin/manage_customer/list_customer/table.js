import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import unidecode from 'unidecode';

import PageNavigate from '../../manage_account/page_navigate';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://34.92.164.246:9090/api/admin/get-all-customers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Lấy danh sách khách hàng
        const customersData = response.data;

        // Lặp qua từng khách hàng để lấy thông tin địa chỉ
        const customersWithAddress = await Promise.all(customersData.map(async customer => {
          const addressResponse = await axios.get(`http://34.92.164.246:9090/api/public/customer-address/${customer.customerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Thêm thông tin địa chỉ vào khách hàng
          return {
            ...customer,
            address: addressResponse.data.address,
            commune: addressResponse.data.commune,
            district: addressResponse.data.district,
            city: addressResponse.data.city,
            country: addressResponse.data.country,
          };
        }));

        setCustomers(customersWithAddress);
        setFilteredCustomers(customersWithAddress);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };

    fetchCustomers();
  }, []);


  const handleDelete = async (customerId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này không?')) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
      
        await axios.delete(`http://34.92.164.246:9090/api/admin/delete-customer/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Cập nhật danh sách khách hàng sau khi xóa
        setCustomers(customers.filter(customer => customer.customerId !== customerId));
        setFilteredCustomers(filteredCustomers.filter(customer => customer.customerId !== customerId));
      } catch (error) {
        console.error('Có lỗi xảy ra khi xóa khách hàng:', error);
      }
    }
  };

  const handleSearchChange = (e) => {
    const term = unidecode(e.target.value.toLowerCase());
    setSearchTerm(term);
  
    const filtered = customers.filter(customer =>
      unidecode(customer.name.toLowerCase()).includes(term) ||
      unidecode(customer.phone.toLowerCase()).includes(term) ||
      unidecode(customer.user.email.toLowerCase()).includes(term) ||
      unidecode(customer.gender.toLowerCase()).includes(term) ||
      unidecode(customer.address.toLowerCase()).includes(term) ||
      unidecode(customer.commune.toLowerCase()).includes(term) ||
      unidecode(customer.district.toLowerCase()).includes(term) ||
      unidecode(customer.city.toLowerCase()).includes(term) ||
      unidecode(customer.user.userName.toLowerCase()).includes(term)
    );
  
    setFilteredCustomers(filtered);
  };

  const handleAddNewUser = (e) => {
    e.preventDefault();
    navigate('/admin/add-customer');
  };

  return (

      <form className="page">
        <div className="table-toolbar">
          <div className="title2">
            <div className="pagination-content2">Danh sách khách hàng</div>
          </div>
          <div className="right">
            <div className="filter-group">
              <div className="icon-wrapper">
                <img className="wrapper-icon" alt="" src="./public/wrapper@2x.png" />
              </div>
              <button className="text6">Thiết lập phân quyền</button>
            </div>
            <div className="search-box">
              <input
                className="wrapper"
                placeholder="Tìm kiếm"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="filter-group">
              <button className="text6" onClick={handleAddNewUser}>+ Thêm mới</button>
            </div>
          </div>
        </div>

        <div className='table'>
          <table className='table-customer'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Giới tính</th>
                <th>Địa chỉ</th>
                <th>Tên tài khoản</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={customer.customerId}>
                  <td>{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.user.email}</td>
                  <td>{customer.gender}</td>
                  <td>{`${customer.address} - ${customer.commune} - ${customer.district} - ${customer.city} - ${customer.country}`}</td>
                  <td>{customer.user.userName}</td>
                  <td>
                    <a href={`/admin/edit-customer/${customer.customerId}`}>Sửa</a>
                    <a href="/admin/list-customer" onClick={() => handleDelete(customer.customerId)}>Xóa</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
  );
};

export default CustomerList;