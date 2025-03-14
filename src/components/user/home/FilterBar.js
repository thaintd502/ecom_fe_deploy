import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = ({ categories, onFilter }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    onFilter(categoryId); // Gọi API khi chọn danh mục
  };

  return (
    <div className="filter-bar">
      <ul>
        <li
          className={activeCategory === null ? "active" : ""}
          onClick={() => handleCategoryClick(null)}
        >
          Tất cả
        </li>
        {categories.map((category) => (
          <li
            key={category.categoryId}
            className={activeCategory === category.categoryId ? "active" : ""}
            onClick={() => handleCategoryClick(category.categoryId)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterBar;
  