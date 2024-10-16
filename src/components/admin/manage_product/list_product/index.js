import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://34.92.164.246:9090/admin/get-all-products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        await axios.delete(`http://34.92.164.246:9090/admin/delete-product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update product list after deletion
        setProducts(products.filter(product => product.productId !== productId));
        setFilteredProducts(filteredProducts.filter(product => product.productId !== productId));
      } catch (error) {
        console.error('Có lỗi xảy ra khi xóa sản phẩm:', error);
      }
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.price.toString().includes(term)
    );

    setFilteredProducts(filtered);
  };

  const handleAddNewProduct = (e) => {
    e.preventDefault();
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
            {filteredProducts.map((product, index) => (
              <tr key={product.productId}>
                <td>{index + 1}</td>
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
    </form>
  );
};

export default ProductList;
