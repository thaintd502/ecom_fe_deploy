import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
        imageUrl: '',
        address: '',
        country: '',
        city: '',
        district: '',
        commune: '',
        userName: '',
        password: ''
    });

    useEffect(() => {
        // Fetch the customer data by ID and set the form fields
        const fetchCustomerData = async () => {
            try {
                const response = await fetch(`http://localhost:9090/admin/customer/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        ...data,
                        birthdate: data.birthdate.split('T')[0] // Ensure date is in YYYY-MM-DD format
                        // email: data.user_id.email
                    });
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
            const response = await fetch(`http://localhost:9090/admin/edit-customer/${id}`, {
                method: 'PUT', // Use PUT method for updating data
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Customer updated successfully!');
                navigate('/admin/list-customer');
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
                            src={ic_image_profile}
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
                            <img
                                className="edit-customer-input-prefix-icon"
                                alt=""
                                src="./public/inputprefix@2x.png"
                            />

                            <input
                                className="edit-customer-placeholder"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nhập họ tên đầy đủ"
                                type="text"
                                required
                            />

                            <img
                                className="edit-customer-input-suffix-icon"
                                alt=""
                                src="./public/inputsuffix@2x.png"
                            />
                        </div>
                        <div className="edit-customer-input-addonicon">
                            <img
                                className="edit-customer-icon-wrapper"
                                alt=""
                                src="./public/iconwrapper@2x.png"
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
                            <img
                                className="edit-customer-input-prefix-icon1"
                                alt=""
                                src="./public/inputprefix@2x.png"
                            />

                            <input
                                className="edit-customer-placeholder1"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                                type="text"
                                required
                            />

                            <img
                                className="edit-customer-input-suffix-icon1"
                                alt=""
                                src="./public/inputsuffix@2x.png"
                            />
                        </div>
                        <div className="edit-customer-input-addonicon1">
                            <img
                                className="edit-customer-icon-wrapper1"
                                alt=""
                                src="./public/iconwrapper-1@2x.png"
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
                            <img
                                className="edit-customer-input-prefix-icon2"
                                alt=""
                                src="./public/inputprefix@2x.png"
                            />

                            <input
                                className="edit-customer-placeholder2"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập email"
                                type="text"
                                required
                            />

                            <img
                                className="edit-customer-input-suffix-icon2"
                                alt=""
                                src="./public/inputsuffix@2x.png"
                            />
                        </div>
                        <div className="edit-customer-input-addonicon2">
                            <img
                                className="edit-customer-icon-wrapper2"
                                alt=""
                                src="./public/iconwrapper-2@2x.png"
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
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                </div>
                <div className="edit-customer-vertical-form-iteminput4">
                    <div className="edit-customer-label4">
                        <div className="edit-customer-title4">Ngày sinh</div>
                    </div>
                    <input
                        className="edit-customer-datepicker"
                        name="birthdate"
                        type="date"
                        value={formData.birthdate}
                        onChange={handleBirthdateChange}
                    />
                </div>
            </div>
            <div className="edit-customer-vertical-form-iteminput5">
                <div className="edit-customer-label5">
                    <div className="edit-customer-title5">Ảnh đại diện</div>
                </div>
                <div className="edit-customer-input6">
                    <div className="edit-customer-input-addonlabel3">
                        <div className="edit-customer-wrapper3">
                            <div className="edit-customer-text3">http://</div>
                        </div>
                    </div>
                    <div className="edit-customer-input7">
                        <img
                            className="edit-customer-input-prefix-icon3"
                            alt=""
                            src="./public/inputprefix@2x.png"
                        />

                        <input
                            className="edit-customer-placeholder3"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="Nhập URL ảnh đại diện"
                            type="text"
                        />

                        <img
                            className="edit-customer-input-suffix-icon3"
                            alt=""
                            src="./public/inputsuffix@2x.png"
                        />
                    </div>
                    <div className="edit-customer-input-addonicon3">
                        <img
                            className="edit-customer-icon-wrapper3"
                            alt=""
                            src="./public/iconwrapper-3@2x.png"
                        />
                    </div>
                </div>
            </div>
            <div className="edit-customer-vertical-form-iteminput-group1">
                <div className="edit-customer-vertical-form-iteminput6">
                    <div className="edit-customer-label6">
                        <div className="edit-customer-title6">Địa chỉ</div>
                    </div>
                    <input
                        className="edit-customer-placeholder4"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Nhập địa chỉ"
                        type="text"
                    />
                </div>
                <div className="edit-customer-vertical-form-iteminput7">
                    <div className="edit-customer-label7">
                        <div className="edit-customer-title7">Quốc gia</div>
                    </div>
                    <input
                        className="edit-customer-placeholder5"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Nhập quốc gia"
                        type="text"
                    />
                </div>
                <div className="edit-customer-vertical-form-iteminput8">
                    <div className="edit-customer-label8">
                        <div className="edit-customer-title8">Thành phố</div>
                    </div>
                    <input
                        className="edit-customer-placeholder6"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Nhập thành phố"
                        type="text"
                    />
                </div>
            </div>
            <div className="edit-customer-vertical-form-iteminput-group2">
                <div className="edit-customer-vertical-form-iteminput9">
                    <div className="edit-customer-label9">
                        <div className="edit-customer-title9">Quận</div>
                    </div>
                    <input
                        className="edit-customer-placeholder7"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="Nhập quận"
                        type="text"
                    />
                </div>
                <div className="edit-customer-vertical-form-iteminput10">
                    <div className="edit-customer-label10">
                        <div className="edit-customer-title10">Phường</div>
                    </div>
                    <input
                        className="edit-customer-placeholder8"
                        name="commune"
                        value={formData.commune}
                        onChange={handleChange}
                        placeholder="Nhập phường"
                        type="text"
                    />
                </div>
            </div>
            <div className="edit-customer-vertical-form-iteminput-group3">
                <div className="edit-customer-vertical-form-iteminput11">
                    <div className="edit-customer-label11">
                        <div className="edit-customer-title11">Tên tài khoản</div>
                    </div>
                    <input
                        className="edit-customer-placeholder9"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="Nhập tên tài khoản"
                        type="text"
                    />
                </div>
                <div className="edit-customer-vertical-form-iteminput12">
                    <div className="edit-customer-label12">
                        <div className="edit-customer-title12">Mật khẩu</div>
                    </div>
                    <input
                        className="edit-customer-placeholder10"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                        type="password"
                    />
                </div>
            </div>
            <div className="edit-customer-form-actions">
                <button type="submit" className="edit-customer-buttonmediumprimary">
                    Lưu thông tin
                </button>
                <button type="button" className="edit-customer-buttonmediumsecondary" onClick={() => navigate('/admin/list-customer')}>
                    Hủy bỏ
                </button>
            </div>
        </form>
    );
};

export default EditCustomerForm;
