import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './global.css';
import './table.css';
import './test.css';
import PageNavigate from '../page_navigate';
import ic_search from '../../../../assets/vectors/ic_search.svg';

const PageHeader = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        // Gọi API để lấy danh sách người dùng
        const response = await axios.get('http://34.92.164.246:9090/api/admin/get-all-users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Lưu danh sách người dùng vào state
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);
  const handleDelete = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      axios.delete(`http://34.92.164.246:9090/api/admin/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.status === 200) {
          // Xóa người dùng khỏi state
          setUsers(users.filter(user => user.id !== userId));
        }
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi xóa người dùng:', error);
      });
    }
  };
  

  const handleAddNewUser = () => {
    navigate('/admin/add-account');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.userName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.listRoles[0]?.roleName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );
  
  return (
   

      <form className="page">
        <div className="table-toolbar">
          <div className="title2">
            <div className="pagination-content2">Danh sách tài khoản</div>
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
              {/* <div className="input-addonicon">
                <img className="icon-wrapper1" alt="" src={ic_search} />
              </div> */}
            </div>
            <div className="filter-group">
              <button className="text6" onClick={handleAddNewUser}>+ Thêm mới</button>
            </div>
          </div>
        </div>

        <div className='table'>
          <table className='table-user'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Email</th>
                <th>Tài khoản</th>
                <th>Nhóm</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.userName}</td>
                  <td>{user.listRoles[0].roleName}</td>
                  <td>
                    <a href={`/admin/edit/${user.userId}`}>Sửa</a>
                    <a href="/admin/home" onClick={() => handleDelete(user.userId)}>Xóa</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
  );
};

export default PageHeader;
