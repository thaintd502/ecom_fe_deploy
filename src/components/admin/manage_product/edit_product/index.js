import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import './index.css';

const EditProduct = () => {
    const { productId } = useParams();  // Get productId from URL
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        productCode: '',
        productName: '',
        category: '',
        discount: 0,
        brand: '',
        importPrice: 0,
        price: 0,
        promotePrice: 0,
        stockQuantity: 0,
        imageUrl: '',
        description: ''
    });

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://ecom-amwn.onrender.com/api/public/product/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const product = response.data;
                console.log("Product data from API:", product); // Kiểm tra dữ liệu trả về
    
                // Cập nhật productData với dữ liệu đúng từ API
                setProductData({
                    productCode: product.productCode,
                    productName: product.name,
                    category: product.categories[0]?.name || '',  // Lấy category đầu tiên
                    brand: product.brand.name,  // Lấy tên thương hiệu
                    importPrice: product.importPrice,
                    discount: product.discount,
                    price: product.price,
                    promotePrice: product.promotePrice,
                    stockQuantity: product.stockQuantity,
                    imageUrl: product.imageUrl,
                    description: product.description
                });
                
                // Cập nhật ảnh preview
                setPreviewImage(product.imageUrl);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };

        const fetchBrandsAndCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const [brandsResponse, categoriesResponse] = await Promise.all([
                    axios.get('https://ecom-amwn.onrender.com/api/public/get-all-brands', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get('https://ecom-amwn.onrender.com/api/public/get-all-categories', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);
                setBrands(brandsResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Failed to fetch brands or categories:', error);
            }
        };

        fetchProduct();
        fetchBrandsAndCategories();
    }, [productId]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProductData({ ...productData, [id]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProductData({ ...productData, imageUrl: file });
        setPreviewImage(URL.createObjectURL(file));  // Set the image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productCode', productData.productCode);
        formData.append('productName', productData.productName);
        formData.append('category', productData.category);
        formData.append('brand', productData.brand);
        formData.append('importPrice', productData.importPrice);
        formData.append('price', productData.price);
        formData.append('promotePrice', productData.promotePrice);
        // formData.append('importQuantity', productData.importQuantity);
        formData.append('description', productData.description);

        // Only append the image if a new one is selected
        if (typeof productData.imageUrl === 'object') {
            formData.append('imageUrl', productData.imageUrl);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`https://ecom-amwn.onrender.com/api/admin/edit-product/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Product updated successfully:', response.data);
            navigate("/admin/list-product");
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="edit-product-container">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Chỉnh sửa sản phẩm</h2>

                <div className="edit-product-form-group">
                    <label htmlFor="productCode">Mã sản phẩm</label>
                    <input
                        type="text"
                        id="productCode"
                        value={productData.productCode}
                        onChange={handleInputChange}
                        required
                        // readOnly // Mã sản phẩm không thay đổi
                    />
                </div>

                <div className="edit-product-form-group">
                    <label htmlFor="productName">Tên sản phẩm</label>
                    <input
                        type="text"
                        id="productName"
                        value={productData.productName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="edit-product-form-group">
                    <label htmlFor="category">Danh mục</label>
                    <select
                        id="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>Chọn danh mục</option>
                        {categories.map((category) => (
                            <option key={category.categoryId} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="edit-product-form-group">
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

                <div className="edit-product-form-group">
                    <label htmlFor="importPrice">Giá vốn</label>
                    <input
                        type="number"
                        id="importPrice"
                        value={productData.importPrice}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="edit-product-form-group">
                    <label htmlFor="price">Giá bán chưa khuyến mãi</label>
                    <input
                        type="number"
                        id="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="edit-product-form-group">
                    <label htmlFor="promotePrice">Giá bán sau khuyến mãi</label>
                    <input
                        type="number"
                        id="promotePrice"
                        value={productData.promotePrice}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="edit-product-form-group">
                    <label htmlFor="discount">Khuyến mãi (%)</label>
                    <input
                        type="number"
                        id="discount"
                        value={productData.discount}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* <div className="edit-product-form-group">
                    <label htmlFor="importQuantity">Số lượng nhập</label>
                    <input
                        type="number"
                        id="importQuantity"
                        value={productData.importQuantity}
                        onChange={handleInputChange}
                        required
                    />
                </div> */}

                <div className="edit-product-form-group">
                    <label htmlFor="stockQuantity">Số lượng còn lại trong kho</label>
                    <input
                        type="number"
                        id="stockQuantity"
                        value={productData.stockQuantity}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="edit-product-form-group">
                    <label htmlFor="imageUrl">Ảnh sản phẩm (mỗi ảnh không quá 2MB)</label>
                    <input
                        type="file"
                        id="imageUrl"
                        onChange={handleFileChange}
                    />
                </div>

                {previewImage && (
                    <div className="edit-product-image-preview">
                        <img src={previewImage} alt="Product Preview" />
                    </div>
                )}

                <div className="edit-product-form-group">
                    <label htmlFor="description">Thông tin sản phẩm</label>
                    <textarea
                        id="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button  className="edit-product-button" type="submit" >Cập nhật</button>
            </form>
        </div>
    );
};

export default EditProduct;
