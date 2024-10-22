import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Import DatePicker component
import { useNavigate } from 'react-router-dom';



import './global.css'; // Đảm bảo import các file CSS
import './index.css';

import ic_upload from '../../../../assets/vectors/ic_upload.svg';
import ic_image_profile from '../../../../assets/vectors/ic_image_profile.svg';

const ProfileForm = () => {
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0]; // Lấy ngày hôm nay, định dạng YYYY-MM-DD
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        gender: '',
        birthdate: today, // Set default birthdate to 01/01/2000
        imageUrl: '',
        address: '',
        country: '',
        city: '',
        district: '',
        commune: '',
        userName: '',
        password: ''
    });

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

            const response = await fetch(`http://34.92.164.246:9090/api/v1/signup-customer`, {
                method: 'POST', // Use PUT method for updating data
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
            gender: e.target.value // Update gender value in formData
        }));
    };

    const handleBirthdateChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            birthdate: e.target.value // Cập nhật giá trị ngày sinh từ form
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

        <form class="add-customer-page" onSubmit={handleSubmit}>
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
                            required // optional, if the image is required
                        />
                    </div>
                </div>
            </div>
            <div className="add-customer-vertical-form-iteminput-parent">
                <div className="add-customer-vertical-form-iteminput">
                    <div className="add-customer-label">
                        <div className="add-customer-placeholder-label">*</div>
                        <div className="add-customer-title">Họ tên</div>
                    </div>
                    <div className="add-customer-input">
                        <div className="add-customer-input-addonlabel">
                            <div className="add-customer-wrapper">
                                <div className="add-customer-text">http://</div>
                            </div>
                        </div>
                        <div className="add-customer-input1">
                            <img
                                className="add-customer-input-prefix-icon"
                                alt=""
                                src="./public/inputprefix@2x.png"
                            />

                            <input
                                className="add-customer-placeholder"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nhập họ tên đầy đủ"
                                type="text"
                                required
                            />

                            <img
                                className="add-customer-input-suffix-icon"
                                alt=""
                                src="./public/inputsuffix@2x.png"
                            />
                        </div>
                        <div className="add-customer-input-addonicon">
                            <img
                                className="add-customer-icon-wrapper"
                                alt=""
                                src="./public/iconwrapper@2x.png"
                            />
                        </div>
                    </div>
                </div>
                <div className="add-customer-vertical-form-iteminput1">
                    <div className="add-customer-label1">
                        <div className="add-customer-middle-label-placeholders">*</div>
                        <div className="add-customer-title1">Số điện thoại</div>
                    </div>
                    <div className="add-customer-input2">
                        <div className="add-customer-input-addonlabel1">
                            <div className="add-customer-wrapper1">
                                <div className="add-customer-text1">http://</div>
                            </div>
                        </div>
                        <div className="add-customer-input3">
                            <img
                                className="add-customer-input-prefix-icon1"
                                alt=""
                                src="./public/inputprefix@2x.png"
                            />

                            {/* <input
                                className="add-customer-placeholder1"
                                placeholder="Nhập số điện thoại"
                                type="text"
                            /> */}

                            <input
                                className="add-customer-placeholder1"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                                type="text"
                                required
                            />

                            <img
                                className="add-customer-input-suffix-icon1"
                                alt=""
                                src="./public/inputsuffix@2x.png"
                            />
                        </div>
                        <div className="add-customer-input-addonicon1">
                            <img
                                className="add-customer-icon-wrapper1"
                                alt=""
                                src="./public/iconwrapper-1@2x.png"
                            />
                        </div>
                    </div>
                </div>
                <div className="add-customer-vertical-form-iteminput2">
                    <div className="add-customer-label2">
                        <div className="add-customer-title2">Email</div>
                    </div>
                    <div className="add-customer-input4">
                        <div className="add-customer-input-addonlabel2">
                            <div className="add-customer-wrapper2">
                                <div className="add-customer-text2">http://</div>
                            </div>
                        </div>
                        <div className="add-customer-input5">
                            <img
                                className="add-customer-input-prefix-icon2"
                                alt=""
                                src="./public/inputprefix@2x.png"
                            />

                            {/* <input
                                className="add-customer-placeholder2"
                                placeholder="Nhập email"
                                type="text"
                            /> */}

                            <input
                                className="add-customer-placeholder2"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập email"
                                type="text"
                                required
                            />

                            <img
                                className="add-customer-input-suffix-icon2"
                                alt=""
                                src="./public/inputsuffix@2x.png"
                            />
                        </div>
                        <div className="add-customer-input-addonicon2">
                            <img
                                className="add-customer-icon-wrapper2"
                                alt=""
                                src="./public/iconwrapper-2@2x.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="add-customer-vertical-form-iteminput-group">
                <div className="add-customer-vertical-form-iteminput3">
                    <div className="add-customer-label3">
                        <div className="add-customer-title3">Giới tính</div>
                    </div>
                    {/* <div className="add-customer-select"> */}
                        <select
                            className="add-customer-select"
                            value={formData.gender}
                            onChange={handleGenderChange}
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Không tiết lộ">Không tiết lộ</option>
                        </select>
                    {/* </div> */}
                </div>


                <div className="add-customer-vertical-form-iteminput4">
                    <div className="add-customer-label4">
                        <div className="add-customer-title5">Ngày sinh</div>
                    </div>
                    <div className="add-customer-date-picker">
                        <div className="add-customer-input6">
                        <input
                            name="birthdate"
                            className="add-customer-placeholder-left"
                            placeholder="Chọn ngày sinh"
                            type="date"
                            min="1930-01-01"
                            max={today}
                            onChange={handleBirthdateChange}
                            value={formData.birthdate}
                            required // Bắt buộc nhập
                        />

                            <img className="add-customer-union-icon" alt="" src="./public/union.svg" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="add-customer-a-ch">Địa chỉ</div>
            <div className="add-customer-vertical-form-iteminput-container">
                <div className="add-customer-vertical-form-iteminput5">
                    <div className="add-customer-label5">
                        <div className="add-customer-div">*</div>
                        <div className="add-customer-title6">Tỉnh / Thành phố</div>
                    </div>
                    <select
                        name="city"
                        className="add-customer-select1"
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
                <div className="add-customer-vertical-form-iteminput6">
                    <div className="add-customer-label6">
                        <div className="add-customer-div1">*</div>
                        <div className="add-customer-title8">Quận / Huyện</div>
                    </div>
                    <select
                        name="district"
                        className="add-customer-select1"
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
            <div className="add-customer-vertical-form-iteminput7">
                <div className="add-customer-label7">
                    <div className="add-customer-div2">*</div>
                    <div className="add-customer-title10">Xã / Phường</div>
                </div>
                <select
                    name="commune"
                    className="add-customer-select1"
                    onChange={handleChange}
                    value={formData.commune}
                    required // Bắt buộc nhập
                >
                    <option value="">Chọn Xã / Phường</option>
                    {/* Thêm các option cho xã/phường */}
                    <option value="Phuong1">Phường 1</option>
                    <option value="Phuong2">Phường 2</option>
                    <option value="Phuong3">Phường Phạm Ngũ Lão</option>
                    {/* ... */}
                </select>
            </div>
            <div className="add-customer-vertical-form-iteminput-wrapper">
                <div className="add-customer-vertical-form-iteminput8">
                    <div className="add-customer-label8">
                        <div className="add-customer-div3">*</div>
                        <div className="add-customer-title12">Địa chỉ chi tiết</div>
                    </div>
                    <input
                        name="address"
                        className="add-customer-select4"
                        placeholder="Số nhà, tên ngõ, ngách, đường,..."
                        onChange={handleChange}
                        value={formData.address}
                        required // Bắt buộc nhập
                    />
                </div>
            </div>
            <div className="add-customer-frame-div">
                <div className="add-customer-vertical-form-iteminput9">
                    <div className="add-customer-label9">
                        <div className="add-customer-div4">*</div>
                        <div className="add-customer-title14">Tên tài khoản</div>
                    </div>
                    <div className="add-customer-input7">
                        <div className="add-customer-input-addonlabel3">
                            <div className="add-customer-wrapper3">
                                <div className="add-customer-text3">http://</div>
                            </div>
                        </div>
                        <div className="add-customer-input8">
                            <img className="add-customer-input-prefix-icon3" alt="" src="./public/inputprefix@2x.png" />
                            <input
                                name="userName"
                                className="add-customer-placeholder3"
                                placeholder="Nhập tên tài khoản"
                                type="text"
                                onChange={handleChange}
                                value={formData.userName}
                                required // Bắt buộc nhập
                            />
                            <img className="add-customer-input-suffix-icon3" alt="" src="./public/inputsuffix@2x.png" />
                        </div>
                        <div className="add-customer-input-addonicon3">
                            <img className="add-customer-icon-wrapper3" alt="" src="./public/iconwrapper-3@2x.png" />
                        </div>
                    </div>
                </div>
                <div className="add-customer-vertical-form-iteminput10">
                    <div className="add-customer-label10">
                        <div className="add-customer-title15">Mật khẩu</div>
                    </div>
                    <div className="add-customer-input9">
                        <div className="add-customer-input-addonlabel4">
                            <div className="add-customer-wrapper4">
                                <div className="add-customer-text4">http://</div>
                            </div>
                        </div>
                        <div className="add-customer-input10">
                            <img className="add-customer-input-prefix-icon4" alt="" src="./public/inputprefix@2x.png" />
                            <input
                                name="password"
                                className="add-customer-placeholder4"
                                placeholder="Nhập để cập nhật mật khẩu mới"
                                type="password"
                                onChange={handleChange}
                                value={formData.password}
                                required // Bắt buộc nhập
                            />
                            <img className="add-customer-input-suffix-icon4" alt="" src="./public/inputsuffix@2x.png" />
                        </div>
                        <div className="add-customer-input-addonicon4">
                            <img className="add-customer-icon-wrapper4" alt="" src="./public/iconwrapper-4@2x.png" />
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" className="add-customer-button">
                <div className="add-customer-icon-wrapper5">
                    <img className="add-customer-wrapper-icon" alt="" src="./public/wrapper@2x.png" />
                </div>
                <div className="add-customer-action-label">Lưu</div>
            </button>
        </form>
    );
};

export default ProfileForm;