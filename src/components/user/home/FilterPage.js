// src/pages/FilterPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FilterPage.css";

const FilterPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ecom-amwn.onrender.com/api/public/get-all-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="filter-bar">
      <ul className="filter-bar-list">
        {/* <li 
          className="filter-bar-item" 
          onClick={() => handleCategoryClick(null)}
        >
          Tất cả
        </li> */}
        {categories.map((category) => (
          <li
            key={category.categoryId}
            className="filter-bar-item"
            onClick={() => handleCategoryClick(category.categoryId)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterPage;
