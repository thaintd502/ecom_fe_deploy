import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:9090/api/public/product/${id}`);
        if (!res.ok) throw new Error("Không thể lấy dữ liệu sản phẩm");
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.imageUrl || "");
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    const fetchRating = async () => {
      try {
        const res = await fetch(`http://localhost:9090/api/public/average-rating/${id}`);
        if (res.ok) {
          const data = await res.json();
          setAverageRating(data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy đánh giá:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:9090/api/public/comments/${id}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error);
      }
    };

    fetchProduct();
    fetchRating();
    fetchComments();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9090/api/public/add-product-to-cart/${id}?quantity=1`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
      } else {
        const errorText = await response.text();
        alert("Lỗi khi thêm vào giỏ hàng: " + errorText);
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-images">
          <img className="main-image" src={selectedImage} alt={product.name} />
          <div className="thumbnail-images">
            {Array.isArray(product.imageUrls) &&
              product.imageUrls.map((img, index) => (
                <img key={index} src={img} alt="" onClick={() => setSelectedImage(img)} />
              ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">{product.price?.toLocaleString()} VND</p>
          <div className="product-rating">
            {averageRating.toFixed(1)} ⭐ | {comments.length} Đánh giá | {product.sold} Đã bán
          </div>
          <p className="product-category">Danh mục: {product.categories[0].name}</p>

          <div className="product-actions">
            <button className="add-to-cart-detail" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      <div className="product-description">
        <h2>Mô tả sản phẩm</h2>
        <p>{product.description}</p>
      </div>

      <div className="product-comments">
        <h2>Đánh giá & Bình luận</h2>
        <div className="average-rating">⭐ {averageRating.toFixed(1)} / 5</div>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.userName}</strong>
              <p>{comment.content}</p>
              <div className="rating">⭐ {comment.rating}/5</div>
            </div>
          ))
        ) : (
          <p>Chưa có bình luận nào.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
