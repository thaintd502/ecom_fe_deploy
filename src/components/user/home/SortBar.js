import React from "react";
import "./SortBar.css";

const SortBar = ({ onSort }) => {
  return (
    <div className="sort-bar">
      <label className="sort-bar-label">Sắp xếp theo: </label>
      <select onChange={(e) => onSort(e.target.value)}>
        <option value="default">Mặc định</option>
        <option value="price-asc">Giá thấp đến cao</option>
        <option value="price-desc">Giá cao đến thấp</option>
        <option value="name-asc">Tên A-Z</option>
        <option value="name-desc">Tên Z-A</option>
      </select>
    </div>
  );
};

export default SortBar;
