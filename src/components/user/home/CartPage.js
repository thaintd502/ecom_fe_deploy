import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:9090/api/public/view-cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Cart data:", data);
          setCartItems(data);

          const total = data.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
          setTotalPrice(total);
        } else {
          console.error("Failed to fetch cart data");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [navigate]);

  // Xử lý thay đổi số lượng sản phẩm và gọi API update
  const handleQuantityChange = async (cartItemId, product, delta) => {
    const currentItem = cartItems.find(item => item.cartItemId === cartItemId);
    const newQuantity = Math.max(1, currentItem.quantity + delta);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:9090/api/public/carts/update-product-quantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartItemId,
          product: { productId: product.productId },
          quantity: newQuantity,
        }),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.cartItemId === updatedItem.cartItemId
              ? { ...item, quantity: updatedItem.quantity }
              : item
          )
        );
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };



  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:9090/api/public/carts/delete-cart-item/${cartItemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        // Cập nhật lại giỏ hàng sau khi xóa thành công
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.cartItemId !== cartItemId)
        );
      } else {
        console.error("Failed to delete cart item");
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };



  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);


  const handleOrder = () => {
    navigate("/order");
  };

  return (
    <div className="cart-page-container">
      <h2 className="cart-page-title">Giỏ hàng</h2>

      <div className="cart-page-content">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Giỏ hàng của bạn trống.</p>
        ) : (
          <div className="cart-items-wrapper">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="cart-item">
                {/* <input type="checkbox" className="cart-checkbox" /> */}
                <Link to={`/product/${item.product.productId}`}>
                  <img
                    className="cart-img"
                    src={item.product.imageUrl}
                    alt={item.product.name}
                  />
                </Link>
                <Link to={`/product/${item.product.productId}`} className="cart-item-name">
                  <span>{item.product.name}</span>
                </Link>
                <span className="cart-item-price">
                  {item.product.price.toLocaleString()} VND
                </span>

                <div className="quantity-control">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.cartItemId, item.product, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.cartItemId, item.product, 1)}
                    disabled={item.quantity >= 3}
                  >
                    +
                  </button>
                </div>


                <span className="cart-item-total">
                  {(item.product.price * item.quantity).toLocaleString()} VND
                </span>

                <button
                  className="button-delete-cart"
                  onClick={() => handleRemoveItem(item.cartItemId)}
                >
                  Xóa
                </button>

              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cart-page-summary">
        <h3 className="total-price">
          Tổng tiền: {totalPrice.toLocaleString()} VND
        </h3>
        <button onClick={handleOrder} className="order-button">
          Mua hàng
        </button>
      </div>
    </div>
  );
};

export default CartPage;
