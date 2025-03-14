import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const originalPrice = (product.price * 100) / (100 - product.discount); // Tính giá gốc khi có giảm giá

  return (
    <div className="product-card">
      <Link to={`/product/${product.productId}`} className="product-link">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
      </Link>

      <div className="product-info">
        <Link to={`/product/${product.productId}`} className="product-name">
          {product.name}
        </Link>

        <p className="product-price">
          {product.price.toLocaleString()} VND
          {product.discount > 0 && (
            <span className="product-discount">
              {originalPrice.toLocaleString()} VND
            </span>
          )}
        </p>
      </div>

      <button className="add-to-cart" onClick={() => onAddToCart(product)}>
        Thêm vào giỏ
      </button>
    </div>
  );
};

export default ProductCard;
