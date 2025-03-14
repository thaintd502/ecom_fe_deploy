import React from "react";
import ProductCard from "./ProductCard.js";
import "./ProductList.css";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p>Không tìm thấy sản phẩm nào!</p>
      )}
    </div>
  );
};

export default ProductList;
