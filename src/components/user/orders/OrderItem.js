import React from "react";
import "./OrderItem.css";
import { useNavigate } from "react-router-dom";

const OrderItem = React.memo(({ order }) => {
    const navigate = useNavigate();

    if (!order) return null; // Tránh lỗi nếu order không tồn tại

    return (
        <div className="order-item">
            {/* Header đơn hàng */}
            <div className="order-header">
                <span>Mã đơn: #{order.orderId || "N/A"}</span>
                <span className={`order-status ${order.status?.toLowerCase() || "unknown"}`}>
                    {order.status || "Chưa xác định"}
                </span>
            </div>

            {/* Danh sách sản phẩm */}
            {order.orderItems?.length > 0 ? (
                order.orderItems.map((item) => (
                    <div key={item.orderItemId} className="order-product">
                        <img src={item.product?.imageUrl || "/default-product.png"} alt={item.product?.name || "Sản phẩm"} />
                        <div className="product-info">
                            <p className="product-name-orders">{item.product?.name || "Sản phẩm không có tên"}</p>
                            <span>{item.quantity} x {item.productPrice?.toLocaleString() || "0"}đ</span>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-items">Không có sản phẩm trong đơn hàng</p>
            )}

            {/* Tổng tiền + Nút chi tiết */}
            <div className="order-footer">
                <span className="total-price-orders">
                    Tổng tiền: {order.totalAmount?.toLocaleString() || "0"}đ
                </span>
                <button className="btn-detail" onClick={() => navigate(`/order/${order.orderId}`)}>
                    Xem chi tiết
                </button>
            </div>
        </div>
    );
});

export default OrderItem;
