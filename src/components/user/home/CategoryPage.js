// src/pages/CategoryPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";
import SortBar from "./SortBar";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9090/api/public/products/categories?categoryId=${categoryId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data || []))
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryId]);

  return (
    <div className="category-page">
      {/* <h2>Sản phẩm theo danh mục</h2> */}
      {/* <SortBar className="category-page-sortbar" /> */}
      <ProductList products={products} />
    </div>
  );
};

export default CategoryPage;
