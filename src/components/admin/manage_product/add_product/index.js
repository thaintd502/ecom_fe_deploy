import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './index.css';

const AddProduct = () => {

    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        productCode: '',
        productName: '',
        category: '',
        brand: '',
        costPrice: 0,
        originalPrice: 0,
        discountedPrice: 0,
        stockQuantity: 0,
        imageUrl: '',
        description: ''
    });

    const [brands, setBrands] = useState([]); 
    const [categories, setCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState(null); // New state for image preview


    useEffect(() => {
        // Fetch brands from API when component is mounted
        const fetchBrands = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await axios.get('https://ecom-amwn.onrender.com/api/admin/get-all-brands', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBrands(response.data);  // Store the fetched brands in state
            } catch (error) {
                console.error('Failed to fetch brands:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await axios.get('https://ecom-amwn.onrender.com/api/public/get-all-categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data);  // Store the fetched brands in state
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchBrands();
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProductData({ ...productData, [id]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProductData({ ...productData, imageUrl: file });
        setPreviewImage(URL.createObjectURL(file)); // Set the image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create FormData object to send the product details and the image
        const formData = new FormData();
        formData.append('productCode', productData.productCode); 
        formData.append('productName', productData.productName); 
        formData.append('category', productData.category); 
        formData.append('brand', productData.brand); 
        formData.append('importPrice', productData.importPrice); 
        formData.append('price', productData.price); 
        formData.append('promotePrice', productData.promotePrice); 
        formData.append('importQuantity', productData.importQuantity); 
        formData.append('description', productData.description); 

        
        formData.append('imageUrl', productData.imageUrl); 
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://ecom-amwn.onrender.com/api/admin/add-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Product added successfully:', response.data);
            navigate("/admin/list-product");
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    

    return (
        <div className="add-product-container">
    <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Thêm sản phẩm</h2>
        
        <div className="add-product-form-group">
            <label htmlFor="productCode">Mã sản phẩm</label>
            <input 
                type="text" 
                id="productCode" 
                placeholder="Nhập mã sản phẩm" 
                value={productData.productCode} 
                onChange={handleInputChange} 
                required
            />
        </div>

        <div className="add-product-form-group">
            <label htmlFor="productName">Tên sản phẩm</label>
            <input 
                type="text" 
                id="productName" 
                placeholder="Nhập tên sản phẩm" 
                value={productData.productName} 
                onChange={handleInputChange} 
                required 
            />
        </div>

        <div className="add-product-form-group">
            <label htmlFor="category">Danh mục</label>
            <select 
                id="category" 
                value={productData.category} 
                onChange={handleInputChange} 
                required
            >
                <option value="" disabled>Chọn danh mục</option>
                {categories.map((category) => (
                    <option key={category.brandId} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="add-product-form-group">
            <label htmlFor="brand">Thương hiệu</label>
            <select 
                id="brand" 
                value={productData.brand} 
                onChange={handleInputChange} 
                required
            >
                <option value="" disabled>Chọn thương hiệu</option>
                {brands.map((brand) => (
                    <option key={brand.brandId} value={brand.name}>
                        {brand.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="add-product-form-group">
            <label htmlFor="importPrice">Giá vốn</label>
            <input 
                type="number" 
                id="importPrice" 
                value={productData.importPrice} 
                onChange={handleInputChange} 
                required 
            />
        </div>

        <div className="add-product-form-group">
            <label htmlFor="price">Giá bán chưa khuyến mãi</label>
            <input 
                type="number" 
                id="price" 
                value={productData.price} 
                onChange={handleInputChange} 
                required 
            />
        </div>

        <div className="add-product-form-group">
            <label htmlFor="promotePrice">Giá bán sau khuyến mãi</label>
            <input 
                type="number" 
                id="promotePrice" 
                value={productData.promotePrice} 
                onChange={handleInputChange} 
                required 
            />
        </div>

        <div className="add-product-form-group">
            <label htmlFor="importQuantity">Số lượng nhập</label>
            <input 
                type="number" 
                id="importQuantity" 
                value={productData.importQuantity} 
                onChange={handleInputChange} 
                required 
            />
        </div>

        <div className="add-product-form-group">
            <label htmlFor="imageUrl">Ảnh sản phẩm (mỗi ảnh không quá 2MB)</label>
            <input 
                type="file" 
                id="imageUrl" 
                onChange={handleFileChange} 
                required 
            />
        </div>

        {previewImage && (
            <div className="add-product-image-preview">
                <img src={previewImage} alt="Product Preview" />
            </div>
        )}

        <div className="add-product-form-group">
            <label htmlFor="description">Thông tin sản phẩm</label>
            <textarea 
                id="description" 
                placeholder="Nhập mô tả sản phẩm" 
                value={productData.description} 
                onChange={handleInputChange} 
                required 
            />
        </div>

        <button type="submit" className="add-product-button">Lưu</button>
    </form>
</div>

    );
};

export default AddProduct;
