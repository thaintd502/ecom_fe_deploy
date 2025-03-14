import React, { useState, useEffect } from "react";
import FilterBar from "../../../components/user/home/FilterBar.js";
import SortBar from "../../../components/user/home/SortBar.js";
import ProductList from "../../../components/user/home/ProductList.js";
import Header from "../../../components/user/home/Header.js";
import Footer from "../../../components/user/home/Footer.js";
import ImageSlider from "../../../components/user/home/Slider.js"; 
import "./index.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("default");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let apiUrl = selectedCategory
      ? `https://ecom-amwn.onrender.com/api/public/products/categories?categoryId=${selectedCategory}`
      : `https://ecom-amwn.onrender.com/api/public/products?page=${page}&size=10`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("Product API Response:", data);
        if (selectedCategory) {
          setProducts(Array.isArray(data) ? data : []);
          setTotalPages(1);
          setPage(0);
        } else {
          setProducts(data.items || []);
          setTotalPages(data.totalPages || 1);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, [selectedCategory, page]);

  useEffect(() => {
    fetch("https://ecom-amwn.onrender.com/api/public/get-all-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="app-container">
      {/* <Header /> */}
      {/* <FilterBar categories={categories} onFilter={(id) => {
        setSelectedCategory(id);
        setPage(0);
      }} /> */}
      <ImageSlider />
      <div className="home-page">
        <div className="content">
          <div className="product-section">
            <SortBar onSort={setSortOption} />
            <ProductList products={filteredProducts} />
            {!selectedCategory && (
              <div className="pagination">
                <button disabled={page === 0} onClick={() => setPage(page - 1)}>« </button>
                <span>Trang {page + 1} / {totalPages}</span>
                <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}> »</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
