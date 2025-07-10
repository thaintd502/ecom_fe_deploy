import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "./ProductList";
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:9090/api/public/products/search-by-keyword?keyword=${keyword}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        setProducts([]);
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [keyword]);

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className="search-results-page">
      <h2>Kết quả tìm kiếm cho "{keyword}"</h2>
      <ProductList products={products} />
    </div>
  );
};

export default SearchResults;
