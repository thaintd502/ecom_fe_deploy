import React, { useState, useEffect } from "react";
import "./AddressForm.css"; // Import file CSS

const AddressForm = () => {
  const [address, setAddress] = useState({
    address: "",
    commune: "",
    district: "",
    city: "",
    country: "Việt Nam",
  });

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Lỗi lấy danh sách tỉnh/thành:", err));
  }, []);

  const handleCityChange = (e) => {
    const selectedCity = cities.find(c => c.code.toString() === e.target.value);
    setAddress({
      ...address,
      city: selectedCity ? selectedCity.name : "",
      district: "",
      commune: "",
    });

    setDistricts([]);
    setCommunes([]);

    if (selectedCity) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts || []))
        .catch((err) => console.error("Lỗi lấy danh sách quận/huyện:", err));
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = districts.find(d => d.code.toString() === e.target.value);
    setAddress({
      ...address,
      district: selectedDistrict ? selectedDistrict.name : "",
      commune: "",
    });

    setCommunes([]);

    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => setCommunes(data.wards || []))
        .catch((err) => console.error("Lỗi lấy danh sách phường/xã:", err));
    }
  };

  const handleCommuneChange = (e) => {
    const selectedCommune = communes.find(w => w.code.toString() === e.target.value);
    setAddress({
      ...address,
      commune: selectedCommune ? selectedCommune.name : "",
    });
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address.city || !address.district || !address.commune || !address.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/public/save-customer-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
      });

      if (response.ok) {
        alert("Địa chỉ đã được lưu thành công!");
      } else {
        alert("Lỗi khi lưu địa chỉ!");
      }
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
      alert("Lỗi kết nối đến server!");
    }
  };

  return (
    <div className="address-form">
      <h2>Địa Chỉ Nhận Hàng</h2>
      <form onSubmit={handleSubmit}>
        <label>Tỉnh/Thành phố:</label>
        <select name="city" value={address.city} onChange={handleCityChange} required>
          <option value="">Chọn Tỉnh/Thành phố</option>
          {cities.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>

        <label>Quận/Huyện:</label>
        <select name="district" value={address.district} onChange={handleDistrictChange} required disabled={!address.city}>
          <option value="">Chọn Quận/Huyện</option>
          {districts.map((d) => (
            <option key={d.code} value={d.code}>{d.name}</option>
          ))}
        </select>

        <label>Phường/Xã:</label>
        <select name="commune" value={address.commune} onChange={handleCommuneChange} required disabled={!address.district}>
          <option value="">Chọn Phường/Xã</option>
          {communes.map((w) => (
            <option key={w.code} value={w.code}>{w.name}</option>
          ))}
        </select>

        <label>Địa chỉ cụ thể:</label>
        <input type="text" name="address" value={address.address} onChange={handleChange} required />

        <label>Quốc gia:</label>
        <input type="text" value={address.country} disabled />

        <button type="submit">💾 Lưu Địa Chỉ</button>
      </form>
    </div>
  );
};

export default AddressForm;
