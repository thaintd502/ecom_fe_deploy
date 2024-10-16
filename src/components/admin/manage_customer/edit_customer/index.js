import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import './global.css'; // Đảm bảo import các file CSS
import './index.css';

import ic_upload from '../../../../assets/vectors/ic_upload.svg';
import ic_image_profile from '../../../../assets/vectors/ic_image_profile.svg';

const EditCustomerForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the customer ID from URL parameters

    const today = new Date().toISOString().split('T')[0];
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        gender: '',
        birthdate: today,
        imageUrl: '', // Store the image as base64 text
        address: '',
        country: '',
        city: '',
        district: '',
        commune: '',
        userName: '',
        password: ''
    });

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage

                const customerResponse = await fetch(`http://34.92.164.246:9090/admin/customer/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the Authorization header
                    }
                });

                if (customerResponse.ok) {
                    const customerData = await customerResponse.json();

                    setFormData(prevState => ({
                        ...prevState,
                        name: customerData.name,
                        phone: customerData.phone,
                        email: customerData.user.email,
                        userName: customerData.user.userName,
                        birthdate: moment(customerData.birthdate).format('YYYY-MM-DD'),
                        imageUrl: customerData.imageUrl, // Set the image URL from fetched data
                        gender: customerData.gender
                    }));

                    // Set image preview URL
                    setImagePreviewUrl(customerData.imageUrl);

                    // Fetch customer address
                    const addressResponse = await fetch(`http://34.92.164.246:9090/admin/customer-address/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (addressResponse.ok) {
                        const addressData = await addressResponse.json();
                        setFormData(prevState => ({
                            ...prevState,
                            address: addressData.address,
                            commune: addressData.commune,
                            district: addressData.district,
                            city: addressData.city,
                            country: addressData.country,

                        }));
                    } else {
                        alert('Failed to fetch customer address.');
                    }
                } else {
                    alert('Failed to fetch customer data.');
                }
            } catch (error) {
                console.error('Error fetching customer data:', error);
                alert('Failed to fetch customer data. Please try again later.');
            }
        };

        fetchCustomerData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage

            // Create a FormData object to send the image and other form data
            const formDataObj = new FormData();
            formDataObj.append('name', formData.name);
            formDataObj.append('phone', formData.phone);
            formDataObj.append('email', formData.email);
            formDataObj.append('userName', formData.userName);
            formDataObj.append('password', formData.password);
            formDataObj.append('gender', formData.gender);
            formDataObj.append('birthdate', formData.birthdate);
            formDataObj.append('address', formData.address);
            formDataObj.append('country', formData.country);
            formDataObj.append('city', formData.city);
            formDataObj.append('district', formData.district);
            formDataObj.append('commune', formData.commune);
            if (formData.imageUrl) {
                formDataObj.append('imageUrl', formData.imageUrl);
            }

            const response = await fetch(`http://34.92.164.246:9090/admin/edit-customer/${id}`, {
                method: 'PUT', // Use PUT method for updating data
                headers: {
                    'Authorization': `Bearer ${token}` // Include the Authorization header
                },
                body: formDataObj // Send form data including imageUrl
            });

            if (response.ok) {
                alert('Customer updated successfully!');
                navigate("/admin/list-customer");
                // Redirect or navigate to another page after successful update
            } else {
                alert('Failed to update customer.');
            }
        } catch (error) {
            console.error('Error updating customer:', error);
            alert('Failed to update customer. Please try again later.');
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleGenderChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            gender: e.target.value
        }));
    };

    const handleBirthdateChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            birthdate: e.target.value
        }));
    };

    const [imagePreviewUrl, setImagePreviewUrl] = useState(ic_image_profile);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, imageUrl: file });

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };


    return (
        <form className="edit-customer-page" onSubmit={handleSubmit}>
            <div className="edit-customer-nh-i-din-parent">
                <a className="edit-customer-nh-i-din">Ảnh đại diện</a>
                <div className="edit-customer-image-uploader">
                    <div className="edit-customer-image">
                        <img
                            className="edit-customer-aspect-ratio-keeper-addition"
                            loading="lazy"
                            alt=""
                            src={imagePreviewUrl} // Use the preview URL for the image src
                        />
                    </div>
                    <div className="edit-customer-upload">
                        <div className="edit-customer-buttonmediumstandardseconda">
                            <img
                                className="edit-customer-upload-icon"
                                loading="lazy"
                                alt=""
                                src={ic_upload}
                            />
                            <div className="edit-customer-upload-label">Chọn ảnh đại diện</div>
                        </div>
                        <input
                            name='imageUrl'
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            // required // optional, if the image is required
                        />
                    </div>
                </div>
            </div>
            <div className="edit-customer-vertical-form-iteminput-parent">
                <div className="edit-customer-vertical-form-iteminput">
                    <div className="edit-customer-label">
                        <div className="edit-customer-placeholder-label">*</div>
                        <div className="edit-customer-title">Họ tên</div>
                    </div>
                    <div className="edit-customer-input">
                        <div className="edit-customer-input-addonlabel">
                            <div className="edit-customer-wrapper">
                                <div className="edit-customer-text">http://</div>
                            </div>
                        </div>
                        <div className="edit-customer-input1">

                            <input
                                className="edit-customer-placeholder"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nhập họ tên đầy đủ"
                                type="text"
                                required
                            />

                        </div>
                        
                    </div>
                </div>
                <div className="edit-customer-vertical-form-iteminput1">
                    <div className="edit-customer-label1">
                        <div className="edit-customer-middle-label-placeholders">*</div>
                        <div className="edit-customer-title1">Số điện thoại</div>
                    </div>
                    <div className="edit-customer-input2">
                        <div className="edit-customer-input-addonlabel1">
                            <div className="edit-customer-wrapper1">
                                <div className="edit-customer-text1">http://</div>
                            </div>
                        </div>
                        <div className="edit-customer-input3">

                            <input
                                className="edit-customer-placeholder1"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                                type="text"
                                required
                            />
                        </div>
                        
                    </div>
                </div>
                <div className="edit-customer-vertical-form-iteminput2">
                    <div className="edit-customer-label2">
                        <div className="edit-customer-title2">Email</div>
                    </div>
                    <div className="edit-customer-input4">
                        <div className="edit-customer-input-addonlabel2">
                            <div className="edit-customer-wrapper2">
                                <div className="edit-customer-text2">http://</div>
                            </div>
                        </div>
                        <div className="edit-customer-input5">

                            <input
                                className="edit-customer-placeholder2"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập email"
                                type="text"
                                required
                            />

                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="edit-customer-vertical-form-iteminput-group">
                <div className="edit-customer-vertical-form-iteminput3">
                    <div className="edit-customer-label3">
                        <div className="edit-customer-title3">Giới tính</div>
                    </div>
                    <select
                        className="edit-customer-select"
                        value={formData.gender}
                        onChange={handleGenderChange}
                        required
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>

                <div className="edit-customer-vertical-form-iteminput4">
                    <div className="edit-customer-label4">
                        <div className="edit-customer-title5">Ngày sinh</div>
                    </div>
                    <div className="edit-customer-date-picker">
                        <div className="edit-customer-input6">
                            <input
                                name="birthdate"
                                className="edit-customer-placeholder-left"
                                placeholder="Chọn ngày sinh"
                                type="date"
                                min="1930-01-01"
                                max={today}
                                onChange={handleBirthdateChange}
                                value={formData.birthdate}
                                required // Bắt buộc nhập
                            />

                            <img className="edit-customer-union-icon" alt="" src="./public/union.svg" />
                        </div>
                    </div>
                </div>

            </div>

            <div className="edit-customer-a-ch">Địa chỉ</div>
            <div className="edit-customer-vertical-form-iteminput-container">
                <div className="edit-customer-vertical-form-iteminput5">
                    <div className="edit-customer-label5">
                        <div className="edit-customer-div">*</div>
                        <div className="edit-customer-title6">Tỉnh / Thành phố</div>
                    </div>
                    <select
                        name="city"
                        className="edit-customer-select1"
                        onChange={handleChange}
                        value={formData.city}
                        required // Bắt buộc nhập
                    >
                        <option value="">Chọn Tỉnh / Thành phố</option>
                        {/* Thêm các option cho tỉnh/thành phố */}
                        <option value="HaNoi">Hà Nội</option>
                        <option value="HCM">TP. Hồ Chí Minh</option>
                        {/* ... */}
                    </select>
                </div>
                <div className="edit-customer-vertical-form-iteminput6">
                    <div className="edit-customer-label6">
                        <div className="edit-customer-div1">*</div>
                        <div className="edit-customer-title8">Quận / Huyện</div>
                    </div>
                    <select
                        name="district"
                        className="edit-customer-select1"
                        onChange={handleChange}
                        value={formData.district}
                        required // Bắt buộc nhập
                    >
                        <option value="">Chọn Quận / Huyện</option>
                        {/* Thêm các option cho quận/huyện */}
                        <option value="Quan1">Quận 1</option>
                        <option value="Quan2">Quận 2</option>
                        <option value="Quan3">Quận 3</option>
                        {/* ... */}
                    </select>
                </div>
            </div>
            <div className="edit-customer-vertical-form-iteminput7">
                <div className="edit-customer-label7">
                    <div className="edit-customer-div2">*</div>
                    <div className="edit-customer-title10">Xã / Phường</div>
                </div>
                <select
                    name="commune"
                    className="edit-customer-select1"
                    onChange={handleChange}
                    value={formData.commune}
                    required // Bắt buộc nhập
                >
                    <option value="">Chọn Xã / Phường</option>
                    {/* Thêm các option cho xã/phường */}
                    <option value="Phuong1">Phường 1</option>
                    <option value="Phuong2">Phường 2</option>
                    <option value="Phường Phạm Ngũ Lão">Phường Phạm Ngũ Lão</option>
                    {/* ... */}
                </select>
            </div>
            <div className="edit-customer-vertical-form-iteminput-wrapper">
                <div className="edit-customer-vertical-form-iteminput8">
                    <div className="edit-customer-label8">
                        <div className="edit-customer-div3">*</div>
                        <div className="edit-customer-title12">Địa chỉ chi tiết</div>
                    </div>
                    <input
                        name="address"
                        className="edit-customer-select4"
                        placeholder="Số nhà, tên ngõ, ngách, đường,..."
                        onChange={handleChange}
                        value={formData.address}
                        required // Bắt buộc nhập
                    />
                </div>
            </div>
            <div className="edit-customer-frame-div">
                <div className="edit-customer-vertical-form-iteminput9">
                    <div className="edit-customer-label9">
                        <div className="edit-customer-div4">*</div>
                        <div className="edit-customer-title14">Tên tài khoản</div>
                    </div>
                    <div className="edit-customer-input7">
                        <div className="edit-customer-input-addonlabel3">
                            <div className="edit-customer-wrapper3">
                                <div className="edit-customer-text3">http://</div>
                            </div>
                        </div>
                        <div className="edit-customer-input8">
                            <input
                                name="userName"
                                className="edit-customer-placeholder3"
                                placeholder="Nhập tên tài khoản"
                                type="text"
                                onChange={handleChange}
                                value={formData.userName}
                                required // Bắt buộc nhập
                            />
                        </div>
                        
                    </div>
                </div>
                <div className="edit-customer-vertical-form-iteminput10">
                    <div className="edit-customer-label10">
                        <div className="edit-customer-title15">Mật khẩu</div>
                    </div>
                    <div className="edit-customer-input9">
                        <div className="edit-customer-input-addonlabel4">
                            <div className="edit-customer-wrapper4">
                                <div className="edit-customer-text4">http://</div>
                            </div>
                        </div>
                        <div className="edit-customer-input10">
                            <input
                                name="password"
                                className="edit-customer-placeholder4"
                                placeholder="Nhập để cập nhật mật khẩu mới"
                                type="password"
                                onChange={handleChange}
                                value={formData.password}
                                required // Bắt buộc nhập
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="edit-customer-form-actions">
                <button type="submit" className="edit-customer-button">
                    Lưu
                </button>
                <button type="button" className="edit-customer-button2" onClick={() => navigate('/admin/list-customer')}>
                    Hủy bỏ
                </button>
            </div>
        </form>
    );
};

export default EditCustomerForm;
