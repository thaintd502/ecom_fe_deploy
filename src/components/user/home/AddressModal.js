import React, { useState } from "react";
import Modal from "react-modal";
import "./AddressModal.css";

Modal.setAppElement("#root");

const AddressModal = ({ isOpen, onClose, onSave }) => {
    const [address, setAddress] = useState("");
    const [commune, setCommune] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [country] = useState("Việt Nam");

    const handleSave = () => {
        if (!address || !commune || !district || !city) {
            alert("Vui lòng nhập đầy đủ thông tin địa chỉ!");
            return;
        }

        const newAddress = { address, commune, district, city, country };
        onSave(newAddress);
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
            <h2>Nhập địa chỉ giao hàng</h2>

            <label>Địa chỉ:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

            <label>Phường/Xã:</label>
            <input type="text" value={commune} onChange={(e) => setCommune(e.target.value)} />

            <label>Quận/Huyện:</label>
            <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} />

            <label>Thành phố:</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

            <label>Quốc gia:</label>
            <input type="text" value={country} disabled />

            <button onClick={handleSave} className="save-address-button">Lưu địa chỉ</button>
        </Modal>
    );
};

export default AddressModal;
