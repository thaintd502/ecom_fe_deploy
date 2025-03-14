import React from "react";
// import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Tìm kiếm sản phẩm..." onChange={(e) => onSearch(e.target.value)} />
    </div>
  );
};

export default SearchBar;
