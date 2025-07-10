import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import icon

import './index.css';


const ProductList = () => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [searchTerm, setSearchTerm] = useState(''); // Tìm kiếm
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage); // Gọi API khi trang thay đổi
  }, [currentPage]);

  const fetchProducts = async (page) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`http://localhost:9090/api/public/products?page=${page}&size=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data.items || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        await axios.delete(`http://localhost:9090/api/admin/delete-product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Reload danh sách sản phẩm sau khi xóa
        fetchProducts(currentPage);
      } catch (error) {
        console.error('Có lỗi xảy ra khi xóa sản phẩm:', error);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNewProduct = () => {
    navigate('/admin/add-product');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value).replace('₫', 'đ');
  };

  return (
    <form className="page">
      <div className="table-toolbar">
        <div className="title2">
          <div className="pagination-content2">Danh sách sản phẩm</div>
        </div>
        <div className="right">
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
            <button className="text6" onClick={handleAddNewProduct}>+ Thêm mới</button>
          </div>
        </div>
      </div>

      <div className='table'>
        <table className='table-product'>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá bán</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.productId}>
                <td>{index + 1 + currentPage * 10}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>
                  <a href={`/admin/edit-product/${product.productId}`}>Sửa</a>
                  <a href="/admin/list-product" onClick={() => handleDelete(product.productId)}>Xóa</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="pagination">
        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage((prev) => Math.max(prev - 1, 0));
          }}
          disabled={currentPage === 0}
        >
          <FaArrowLeft size={10} /> {/* Mũi tên trái */}
        </button>

        <span> Trang {currentPage + 1} / {totalPages} </span>

        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
          }}
          disabled={currentPage >= totalPages - 1}
        >
          <FaArrowRight size={10} /> {/* Mũi tên phải */}
        </button>
      </div>


    </form>
  );
};

export default ProductList;
