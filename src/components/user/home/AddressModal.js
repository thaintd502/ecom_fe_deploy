import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./AddressModal.css";

Modal.setAppElement("#root");

const AddressModal = ({ isOpen, onClose, onSave }) => {
    const [address, setAddress] = useState("");
    const [commune, setCommune] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [country] = useState("Việt Nam");

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Load danh sách tỉnh/thành phố
    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/?depth=1")
            .then((res) => res.json())
            .then((data) => setProvinces(data))
            .catch((err) => console.error("Lỗi lấy danh sách tỉnh/thành:", err));
    }, []);

    // Khi chọn tỉnh/thành phố -> load danh sách quận/huyện
    const handleCityChange = (e) => {
        const selectedCity = provinces.find(p => p.code.toString() === e.target.value);
        setCity(selectedCity ? selectedCity.name : ""); // ✅ Lưu tên thay vì ID
        setDistrict("");
        setCommune("");
        setDistricts([]);
        setWards([]);

        if (selectedCity) {
            fetch(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`)
                .then((res) => res.json())
                .then((data) => setDistricts(data.districts || []))
                .catch((err) => console.error("Lỗi lấy danh sách quận/huyện:", err));
        }
    };

    // Khi chọn quận/huyện -> load danh sách phường/xã
    const handleDistrictChange = (e) => {
        const selectedDistrict = districts.find(d => d.code.toString() === e.target.value);
        setDistrict(selectedDistrict ? selectedDistrict.name : ""); // ✅ Lưu tên thay vì ID
        setCommune("");
        setWards([]);

        if (selectedDistrict) {
            fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
                .then((res) => res.json())
                .then((data) => setWards(data.wards || []))
                .catch((err) => console.error("Lỗi lấy danh sách phường/xã:", err));
        }
    };

    const handleCommuneChange = (e) => {
        const selectedCommune = wards.find(w => w.code.toString() === e.target.value);
        setCommune(selectedCommune ? selectedCommune.name : ""); // ✅ Lưu tên thay vì ID
    };

    const handleSave = () => {
        if (!address || !commune || !district || !city) {
            alert("Vui lòng nhập đầy đủ thông tin địa chỉ!");
            return;
        }

        const newAddress = { address, commune, district, city, country };
        onSave(newAddress);
        onClose(); // Đóng modal sau khi lưu
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
            <h2>📍 Nhập địa chỉ giao hàng</h2>

            <label>Địa chỉ cụ thể:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

            <label>Thành phố/Tỉnh:</label>
            <select value={city} onChange={handleCityChange} required>
                <option value="">Chọn Thành phố/Tỉnh</option>
                {provinces.map((p) => (
                    <option key={p.code} value={p.code}>{p.name}</option>
                ))}
            </select>

            <label>Quận/Huyện:</label>
            <select value={district} onChange={handleDistrictChange} required disabled={!city}>
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((d) => (
                    <option key={d.code} value={d.code}>{d.name}</option>
                ))}
            </select>

            <label>Phường/Xã:</label>
            <select value={commune} onChange={handleCommuneChange} required disabled={!district}>
                <option value="">Chọn Phường/Xã</option>
                {wards.map((w) => (
                    <option key={w.code} value={w.code}>{w.name}</option>
                ))}
            </select>

            <label>Quốc gia:</label>
            <input type="text" value={country} disabled />

            <button onClick={handleSave} className="save-address-button">💾 Lưu địa chỉ</button>
        </Modal>
    );
};

export default AddressModal;
